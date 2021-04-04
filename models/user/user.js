const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema({
    role: { type: String, default: 'costumer' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verify: { type: String, default: false },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, { timestamps: true })

userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token
    } catch (error) {
        res.send(errr)
    }

}

module.exports = mongoose.model('User', userSchema)