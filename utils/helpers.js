const bcrypt = require('bcrypt')
const saltRounds = 10



const hashPassword = async (password) => {
return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        resolve({ hash})
    });
})
} 

const comparePassword = async (password,hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, result) {
           resolve({ result })
        });
    })
} 

module.exports = {hashPassword, comparePassword}
