const fs = require('fs')



/**
 * Add Commands/Response message to database
 * @param {String} msg
 * @param {Sstring} response
 * @param {String} userId
 * @param {Object} data
 * @returns true
 */
const addPrem = (nama, nomer, _data) => {
    const obj = {
        nama: nama,
        nomer: nomer
    }
    _data.push(obj)
    fs.writeFileSync('./assets/db/prem2.json', JSON.stringify(_data))

    return true
}


/**
 * Delete commands from database
 * @param {String} command
 * @param {Object} _data
 */
const deletePrem = (command, _data) => {
    Object.keys(_data).forEach((i) => {
        if (_data[i].nama === command) {
            _data.splice(i, 1)
            fs.writeFileSync('./assets/db/prem2.json', JSON.stringify(_data))
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

const checkPrem = (commands, _data) => {
    let status = false
    Object.keys(_data).forEach((i) => {
        if (_data[i].nomer === commands) {
            status = true
        }
    })

    return status
}



module.exports = {
    addPrem,
    deletePrem,
    checkPrem
}