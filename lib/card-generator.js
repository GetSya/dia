const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const axios = require('axios');

const MEDIA_DIR = path.join(__dirname, '..', 'media');
const WELCOME_BG = path.join(MEDIA_DIR, 'welcome_template.jpg');
const DEFAULT_WELCOME_CARD = path.join(MEDIA_DIR, 'welcome_card.jpg');
const DEFAULT_GOODBYE_CARD = path.join(MEDIA_DIR, 'goodbye_card.jpg');

// Default SVG avatar if user has no profile photo
function getDefaultAvatarSvg(size) {
    return Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1e293b" />
                <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
            <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00f2fe" />
                <stop offset="100%" stop-color="#4facfe" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#grad)" />
        <circle cx="50" cy="38" r="18" fill="url(#glow)" opacity="0.85" />
        <path d="M 20 85 C 20 62, 35 58, 50 58 C 65 58, 80 62, 80 85 Z" fill="url(#glow)" opacity="0.85" />
    </svg>
    `);
}

// Fetch avatar buffer from URL, file path, or buffer
async function resolveAvatarBuffer(avatarInput, size) {
    if (Buffer.isBuffer(avatarInput)) {
        return avatarInput;
    }
    if (typeof avatarInput === 'string') {
        if (avatarInput.startsWith('http://') || avatarInput.startsWith('https://')) {
            try {
                const res = await axios.get(avatarInput, {
                    responseType: 'arraybuffer',
                    timeout: 8000,
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                return Buffer.from(res.data);
            } catch (err) {
                console.log('[CardGenerator] Avatar fetch error:', err?.message || err);
            }
        } else if (fs.existsSync(avatarInput)) {
            try {
                return fs.readFileSync(avatarInput);
            } catch {}
        }
    }
    return getDefaultAvatarSvg(size);
}

// Escape XML for SVG
function escapeXml(unsafe) {
    if (!unsafe) return '';
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Generate a 16:9 Welcome or Goodbye Card
 * @param {Object} options
 * @param {'welcome' | 'goodbye'} [options.type='welcome']
 * @param {string|Buffer} [options.avatar] - URL, file path, or Buffer of profile photo
 * @param {string} [options.username='Member']
 * @param {string} [options.groupname='the Community']
 * @returns {Promise<Buffer>} JPEG image buffer
 */
async function generateCard(options = {}) {
    const {
        type = 'welcome',
        avatar,
        username = 'Member',
        groupname = 'the Community'
    } = options;

    const isWelcome = type === 'welcome';
    const width = 1376;
    const height = 768;
    const avatarSize = 390;

    try {
        // 1. Get user avatar and mask into circle with glossy inner border
        const rawAvatar = await resolveAvatarBuffer(avatar, avatarSize);
        const circleMask = Buffer.from(`
            <svg width="${avatarSize}" height="${avatarSize}">
                <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="#ffffff"/>
            </svg>
        `);

        const avatarCircle = await sharp(rawAvatar)
            .resize(avatarSize, avatarSize, { fit: 'cover' })
            .composite([{ input: circleMask, blend: 'dest-in' }])
            .png()
            .toBuffer();

        // 2. Determine background
        let baseSharp;
        if (fs.existsSync(WELCOME_BG)) {
            baseSharp = sharp(WELCOME_BG);
            if (!isWelcome) {
                // Adjust tone for goodbye card (subtle warm amber / dark lavender tint)
                baseSharp = baseSharp.modulate({
                    hue: -35,
                    saturation: 0.85,
                    brightness: 0.95
                });
            }
        } else {
            // Fallback generated dark background
            baseSharp = sharp({
                create: {
                    width,
                    height,
                    channels: 4,
                    background: { r: 10, g: 12, b: 18, alpha: 1 }
                }
            });
        }

        // 3. SVG text overlay
        const cleanUser = String(username || 'Member').replace(/^@+/, '').trim() || 'Member';
        const displayUser = cleanUser.length > 20 ? cleanUser.slice(0, 18) + '...' : cleanUser;
        const safeUser = escapeXml(displayUser);
        const safeGroup = escapeXml(groupname);
        const headline = isWelcome ? 'WELCOME' : 'GOODBYE';
        const greeting = isWelcome ? `Welcome, ${safeUser}!` : `Goodbye, ${safeUser}!`;
        const subtitle = isWelcome ? `You are now a member of ${safeGroup}` : `Thanks for being part of ${safeGroup}`;

        const glowColor = isWelcome ? '#00e5ff' : '#a855f7';
        const titleColor = '#ffffff';

        const svgOverlay = Buffer.from(`
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="${glowColor}" flood-opacity="0.75" />
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.9" />
                </filter>
                <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.9" />
                </filter>
            </defs>

            <style>
                .headline {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    font-weight: 900;
                    font-size: 64px;
                    letter-spacing: 8px;
                    text-anchor: middle;
                    fill: ${titleColor};
                }
                .greeting {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    font-weight: 700;
                    font-size: 34px;
                    text-anchor: middle;
                    fill: #ffffff;
                }
                .subtitle {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    font-weight: 400;
                    font-size: 21px;
                    letter-spacing: 1px;
                    text-anchor: middle;
                    fill: #cbd5e1;
                }
            </style>

            <!-- Headline Title above portrait -->
            <text x="${width / 2}" y="116" class="headline" filter="url(#neonGlow)">${headline}</text>

            <!-- Greeting & Subtitle below portrait -->
            <text x="${width / 2}" y="658" class="greeting" filter="url(#textShadow)">${greeting}</text>
            <text x="${width / 2}" y="700" class="subtitle" filter="url(#textShadow)">${subtitle}</text>
        </svg>
        `);

        // Center avatar
        const avatarLeft = Math.round((width - avatarSize) / 2);
        // Circle center in template is roughly y = 384
        const avatarTop = Math.round((height - avatarSize) / 2) - 3;

        const finalBuffer = await baseSharp
            .composite([
                { input: avatarCircle, top: avatarTop, left: avatarLeft },
                { input: svgOverlay, top: 0, left: 0 }
            ])
            .jpeg({ quality: 92 })
            .toBuffer();

        return finalBuffer;
    } catch (err) {
        console.error('[CardGenerator] Error generating card:', err);
        // Fallback to static card if available
        const fallbackPath = isWelcome ? DEFAULT_WELCOME_CARD : DEFAULT_GOODBYE_CARD;
        if (fs.existsSync(fallbackPath)) {
            return fs.readFileSync(fallbackPath);
        }
        throw err;
    }
}

module.exports = {
    generateCard,
    getDefaultAvatarSvg
};
