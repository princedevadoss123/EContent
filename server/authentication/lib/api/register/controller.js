var mongoose = require('mongoose');
var accountModel = require('./model');

let bcrypt = require('bcryptjs');
let BCRYPT_SALT_ROUNDS = 12;
let Log = require('log');
let logger = new Log();

function registerController() { }

module.exports = registerController;

registerController.prototype.register = function (request, response) {
    this.accountObject = new accountModel(mongoose);
    let Account = accountObject.getAccountModel();
    bcrypt.hash(request.body.password, BCRYPT_SALT_ROUNDS)
        .then(function (hashedPassword) {
            let account = new Account({ userName: request.body.userName, hashedPassword: hashedPassword, emailId: request.body.emailId, phoneNumber: request.body.phoneNumber, authorId: request.body.authorId });
            account.save(function (err) {
                if (err) {
                    response.send({ message: 'Error saving account : ' + err });
                    throw err;
                }
                logger.info('Account saved successfully');
                response.send({ message: 'Account saved successfully' });
            });

        })
        .catch(function (error) {
            logger.error("Error saving account: " + error);
            response.send({ message: 'Error saving account'+ error });
            next();
        });

}