let BCRYPT_SALT_ROUNDS = 12;
let bcrypt = require('bcryptjs');
let mongoose = require('mongoose');
let accountModel = require('./model');
let Mailer = require('../../../../service/email-service');
let Log = require('log');
let logger = new Log();

function Authentication(accountType, payload) {
    this.accountType = accountType;
    this.payload = payload;
}

module.exports = Authentication;

Authentication.prototype.register = _register;
Authentication.prototype.emailVerify = _emailVerify;

function _register(request) {
    let account;
    this.accountObject = new accountModel(mongoose);
    return new Promise(function(resolve, reject) {
        bcrypt.hash(request.body.password, BCRYPT_SALT_ROUNDS)
        .then(function (hashedPassword) {
            this.payload['hashedPassword'] = hashedPassword;
            let Account = this.accountObject.getAccountModel(this.accountType);
            account = new Account(this.payload);
            account.save(function (err) {
                if (err) {
                    reject({ message: 'Error saving account : ' + err });
                }
                else {  
                    logger.info('Account saved successfully');
                    var link = "https://localhost:3001/app/api/verify?id=" + request.body.emailId;
                    var body = 'Hello,<br> Please Click on the link to verify your email.<br><a href=\''+link+'\'>Click here to verify</a>';
                    var subject = 'Verification mail';
                    Mailer(request.body.emailId, subject, body).then(function() {
                        logger.info("Successfully email sent to the user");
                    })
                    .catch(function(err) {
                        logger.error(err);
                    });
                    resolve({ message: 'Account saved successfully' });
                }
            });

        }.bind(this))
        .catch(function (error) {
            logger.error("Error saving account: " + error);
            reject({ message: 'Error saving account'+ error });
        });
    }.bind(this));
}

function _emailVerify() {
    this.accountObject = new accountModel(mongoose);
    return new Promise((resolve, reject) => {
        let account = this.accountObject.getAccountModel(this.accountType);
        account.findOne(this.payload)
        .then(function(accountHolder) {
            if(accountHolder) {
                account.update(this.payload, { verified: true }, function(err) {
                    if(err) {
                        reject({ message: 'Error updating account : ' + err })
                    }
                    else {
                        resolve({ message: 'Successfully Verified' });
                    }
                });
            }
            else {
                reject({ message: 'User is not existing' });
            }
        })
        .catch(function(error) {
            reject({ message: 'Error fetching account' + error });
        });
    });
}