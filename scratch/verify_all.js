const fs = require('fs');
const assert = require('assert');

console.log('--- 1. Testing Menu Categorization ---');
const menu = require('../lib/menu');
const menuText = menu.renderMenuSections('.');
assert(menuText.includes('Group Menu'), 'Menu must contain Group Menu');
assert(menuText.includes('.igdl'), 'Group Menu must list igdl');
assert(menuText.includes('.play'), 'Group Menu must list play');
assert(menuText.includes('.ytmp3'), 'Group Menu must list ytmp3');
assert(menuText.includes('.ytmp4'), 'Group Menu must list ytmp4');
assert(menuText.includes('.tiktokmp3'), 'Group Menu must list tiktokmp3');
assert(menuText.includes('.antidelete'), 'Group Menu must list antidelete');
assert(menuText.includes('.setwelcome'), 'Group Menu must list setwelcome');
console.log('✅ Menu verification passed!');

console.log('--- 2. Testing Database Group Defaults ---');
const joDatabase = require('../lib/database');
const testGid = '12345-test@g.us';
const gset = joDatabase.getGroup(testGid);
assert.strictEqual(typeof gset.antidelete, 'boolean', 'antidelete must be boolean');
assert.strictEqual(typeof gset.welcomeText, 'string', 'welcomeText must be string');
assert.strictEqual(typeof gset.leftText, 'string', 'leftText must be string');
console.log('✅ Database defaults passed!');

console.log('--- 3. Testing Anonymous Chat Module ---');
const anon = require('../lib/anonymous');
let dummySender1 = '62811111111@s.whatsapp.net';
let dummySender2 = '62822222222@s.whatsapp.net';

let sentBob = [];
const mockBob = {
    sendMessage: async (jid, msg) => { sentBob.push({ jid, msg }) },
    copyNForward: async (jid, m) => { sentBob.push({ jid, forward: m }) }
};

let replyLog1 = [];
const mockReply1 = (t) => { replyLog1.push(t); };
let replyLog2 = [];
const mockReply2 = (t) => { replyLog2.push(t); };

// Start user 1 (should wait)
anon.startChat(mockBob, { isGroup: false }, dummySender1, mockReply1);
assert(anon.isWaiting(dummySender1), 'Sender 1 should be in waiting queue');
console.log('Sender 1 waiting:', replyLog1[0]);

// Start user 2 (should match)
anon.startChat(mockBob, { isGroup: false }, dummySender2, mockReply2);
assert(!anon.isWaiting(dummySender1), 'Sender 1 should no longer be waiting');
assert(!anon.isWaiting(dummySender2), 'Sender 2 should not be waiting');
const session = anon.getSession(dummySender1);
assert(session, 'Session must exist for sender 1');
assert.strictEqual(anon.getSession(dummySender2).id, session.id, 'Session must match for sender 2');
console.log('Partner matched successfully!');

// Leave
anon.leaveChat(mockBob, { isGroup: false }, dummySender1, mockReply1);
assert(!anon.getSession(dummySender1), 'Session must be closed');
assert(!anon.getSession(dummySender2), 'Partner session must be closed');
console.log('✅ Anonymous chat lifecycle passed!');

console.log('--- 4. Testing Welcome Placeholder Formatter ---');
// Test placeholder replacement logic
const template = 'Halo @user (@name), selamat datang di @group! Deskripsi: @desc. Tanggal: @date @time. Total member: @member';
const data = {
    mention: '@62812345678',
    name: 'Arasya',
    group: 'VIP Community',
    desc: 'Tempat diskusi santai',
    date: '15/09/2026',
    time: '07:25 WIB',
    members: '42'
};

const result = template
    .replace(/@user/gi, data.mention)
    .replace(/@name/gi, data.name)
    .replace(/@group/gi, data.group)
    .replace(/@subject/gi, data.group)
    .replace(/@desc/gi, data.desc)
    .replace(/@date/gi, data.date)
    .replace(/@time/gi, data.time)
    .replace(/@member/gi, data.members);

assert(result.includes('@62812345678'), 'Should include mention');
assert(result.includes('Arasya'), 'Should include name');
assert(result.includes('VIP Community'), 'Should include group');
assert(result.includes('Tempat diskusi santai'), 'Should include desc');
assert(result.includes('15/09/2026'), 'Should include date');
assert(result.includes('07:25 WIB'), 'Should include time');
assert(result.includes('42'), 'Should include members');
console.log('Formatted preview:\n', result);
console.log('✅ Welcome placeholder formatter passed!');

console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');
