const fs = require('fs');
const content = fs.readFileSync('control.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
    if (/case\s+['"](antilink|welcome|left|add|igdl|tiktok|ytmp3|ytmp4|play|antidelete)/i.test(l)) {
        console.log((i+1) + ': ' + l.trim());
    }
});
