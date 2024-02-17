const fs = require('fs')



/**
 * Add Commands/Response message to database
 * @param {String} msg
 * @param {Sstring} response
 * @param {String} userId
 * @param {Object} data
 * @returns true
 */
const addRegis = (usn, pass, userId, id, _data) => {
    const obj = {
        username: usn,
        password: pass,
        nomor: userId,
        unik: id
    }
    _data.push(obj)
    fs.writeFileSync('./assets/db/register.json', JSON.stringify(_data))

    return true
}
const addLogin = (usn, pass, userId, id, _data) => {
    const obj = {
        username: usn,
        password: pass,
        nomor: userId,
        unik: id
    }
    _data.push(obj)
    fs.writeFileSync('./assets/db/login.json', JSON.stringify(_data))

    return true
}


/**
 * Delete commands from database
 * @param {String} command
 * @param {Object} _data
 */
const deleteLogin = (command, _data) => {
    Object.keys(_data).forEach((i) => {
        if (_data[i].username === command) {
            _data.splice(i, 1)
            fs.writeFileSync('./assets/db/register.json', JSON.stringify(_data))
        }
    })
    return true
}


/**
 * Check command is available or not
 * @param {String} command
 * @param {Object} _data
 * @returns {Boolean}
 */

const checkRegister = (commands, _data) => {
    let status = false
    Object.keys(_data).forEach((i) => {
        if (_data[i].username === commands) {
            status = true
        }
    })

    return status
}
const checkLogin = (unikkod, _data) => {
    let status = false
    Object.keys(_data).forEach((i) => {
        if (_data[i].nomor === unikkod) {
            status = true
        }
    })

    return status
}


module.exports = {
    addLogin,
    addRegis,
    deleteLogin,
    checkRegister,
    checkLogin
}