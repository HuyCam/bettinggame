const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    money: {
        type: Number,
        default: 6000
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

userSchema.statics.findByCredentials = async function(email, password) {
 const user = await User.findOne({ email });

 if (!user) {
     throw new Error('Invalid login');
 }

 if (!(await bcrypt.compare(password, user.password))) {
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

userSchema.pre('save', async function(next) {
    const user = this;

    // if user create a new password or new user is created
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
})

userSchema.methods.toJSON = async function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;
    delete userObject.password;
    
    return userObject;
}

const User = mongoose.model('User', userSchema);

module.exports = User;