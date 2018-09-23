let BCRYPT_SALT_ROUNDS = 12;
let bcrypt = require('bcryptjs');
let mongoose = require('mongoose');
let accountModel = require('./model');
let Mailer = require('../../../../service/email-service');
let jwt = require('jsonwebtoken');
let secret = require('../../../../../config/jwt-secret');
let Log = require('log');
let logger = new Log();

function Authentication(accountType, payload) {
    this.accountType = accountType;
    this.payload = payload;
}

module.exports = Authentication;

Authentication.prototype.register = _register;
Authentication.prototype.emailVerify = _emailVerify;
Authentication.prototype.loginService = _login;

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
                    let link = 'https://localhost:3001/app/api/verify/email?id=' + request.body.emailId;
                    if(request.body.authorId) {
                        link = link + '&authorId=' + request.body.authorId;
                    }
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
                }.bind(this));
            }
            else {
                reject({ message: 'User is not existing' });
            }
        }.bind(this))
        .catch(function(error) {
            reject({ message: 'Error fetching account' + error });
        });
    });
}

function _login() {
    this.accountObject = new accountModel(mongoose);
    return new Promise((resolve, reject) => {
        let userAccount = this.accountObject.getAccountModel('User-Account');
        let authorAccount = this.accountObject.getAccountModel('Author-Account');
        let loginPromise = Promise.all([userAccount.findOne({emailId: this.payload.email}).exec(), authorAccount.findOne({emailId: this.payload.email}).exec()]);
        loginPromise.then((accountHolders) => {
            if(accountHolders[0]) {
                _checkPassword(this.payload.password, accountHolders[0], resolve, reject, 'user');
            }
            else if(accountHolders[1]) {
                _checkPassword(this.payload.password, accountHolders[1], resolve, reject, 'author');
            }
            else {
                reject({message : 'Invalid Credentials'});
            }
            function _checkPassword(password, accountHolder, resolve, reject, role) {
                bcrypt.compare(password, accountHolder.hashedPassword)
                .then((result) => {
                    if(result) {
                        let payloadData = {
                            sub : accountHolder['emailId'],
                            role : role
                        };
                        let jwtToken = jwt.sign(payloadData, secret.secret, {
                            expiresIn: 86400
                          });
                        resolve(jwtToken);
                    }
                    else {
                        reject({message : 'Invalid Credentials'});
                    }
                })
                .catch((error) => {
                    logger.info('Service Unavailable' + error);
                    reject({message: 'Service Unavailable'});
                })
            }
        })
        .catch((error) => {
            logger.info('Service Unavailable' + error);
            reject({message: 'Service Unavailable'});
        });
    });
}