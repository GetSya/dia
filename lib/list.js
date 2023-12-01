const fs = require('fs')



/**
 * Add Commands/Response message to database
 * @param {String} msg
 * @param {Sstring} response
 * @param {String} userId
 * @param {Object} data
 * @returns true
 */
const addList = (nameshop, text, sender, _data) => {
    const obj = {
        nameshop: nameshop,
        text: text,
        sender: sender
    }
    _data.push(obj)
    fs.writeFileSync('./database/list.json', JSON.stringify(_data))

    return true
}


/**
 * Delete commands from database
 * @param {String} command
 * @param {Object} _data
 */
const deleteList = (command, _data) => {
    Object.keys(_data).forEach((i) => {
        if (_data[i].nameshop === command) {
            _data.splice(i, 1)
            fs.writeFileSync('./database/list.json', JSON.stringify(_data))
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

const checkList = (commands, _data) => {
    let status = false
    Object.keys(_data).forEach((i) => {
        if (_data[i].nameshop === commands) {
            status = true
        }
    })

    return status
}



module.exports = {
    addList,
    deleteList,
    checkList
}