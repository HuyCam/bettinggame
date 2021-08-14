const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,

    },
    money: {
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type:String,
            required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.statics.findByCredentials = async function(email) {
 const user = await User.findOne({ email });

 if (!user) {
     throw new Error('Invalid login');
 }

 return user;
};

userSchema.methods.generateToken = async function() {
    const user = this;

    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens.push({token});

    await user.save();

    return token;
}

userSchema.methods.toJSON = async function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;
    
    return userObject;
}

const User = mongoose.model('User', userSchema);

module.exports = User;