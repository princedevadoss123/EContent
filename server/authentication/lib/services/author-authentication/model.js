require('mongoose-type-email');
let mongooseIntlPhoneNumber = require('mongoose-intl-phone-number');

function AuthorAccountModel(mongoose) {
    this.mongoose = mongoose;
}

module.exports = AuthorAccountModel;

AuthorAccountModel.prototype.getAccountModel = function () {

    const Schema = this.mongoose.Schema;

    let accountSchema = Schema({
        userName: { type: String, required: true },
        hashedPassword: { type: String, required: true },
        emailId: { type: this.mongoose.SchemaTypes.Email, required: true, index: { unique: true } },
        phoneNumber: { type: String, required: true, index: { unique: true } },
        authorId: { type: String, required: true  },
        verified: { type: Boolean, required: true }
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
        return this.mongoose.model('Author-Account');
    }
    catch (e) {
        return this.mongoose.model('Author-Account', accountSchema);
    }

}

