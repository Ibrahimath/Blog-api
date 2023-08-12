const bcrypt = require('bcrypt')
const saltRounds = 10



const hashPassword = async (password) => {
return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        resolve({ hash})
    });
})
} 

module.exports = {hashPassword}
