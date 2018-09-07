require('mongoose-type-email');
let mongooseIntlPhoneNumber = require('mongoose-intl-phone-number');

function AccountModel(mongoose) {
    this.mongoose = mongoose;
}

module.exports = AccountModel;

AccountModel.prototype.getAccountModel = function () {

    const Schema = this.mongoose.Schema;

    let accountSchema = Schema({
        userName: { type: String, required: true },
        hashedPassword: { type: String, required: true },
        emailId: { type: this.mongoose.SchemaTypes.Email, required: true, index: { unique: true } },
        phoneNumber: { type: String, required: true },
        authorId: { type: String, required: false }
    },
        {
            timestamps: true
        });

    accountSchema.plugin(mongooseIntlPhoneNumber, {
        hook: 'validate',
        phoneNumberField: 'phoneNumber',
        nationalFormatField: 'nationalFormat',
        internationalFormat: 'internationalFormat',
        countryCodeField: 'countryCode',
    });


    try {
        return this.mongoose.model('Account');
    }
    catch (e) {
        return this.mongoose.model('Account', accountSchema);
    }

}

