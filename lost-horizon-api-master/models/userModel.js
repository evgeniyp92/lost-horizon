const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'No email specified'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Invalid email'],
	},
	password: {
		type: String,
		required: [true, 'No password specified'],
		minlength: [8, 'Password must be at least 8 characters'],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'No password confirmation specified'],
		validate: {
			validator(el) {
				return el === this.password;
			},
			message: 'Passwords do not match',
		},
	},
	firstName: {
		type: String,
		required: [true, 'No first name specified'],
		minlength: [2, 'First name is too short'],
		maxlength: [31, 'First name is too long'],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, 'No last name specified'],
		minlength: [2, 'Last name is too short'],
		maxlength: [63, 'Last name is too long'],
		trim: true,
		uppercase: true,
	},
	rank: {
		type: String,
		required: [true, 'No rank specified'],
		trim: true,
		uppercase: true,
		minlength: [2, 'Rank is too short'],
		maxlength: [5, 'Rank is too long'],
	},
	squadron: {
		type: String,
		required: [true, 'No squadron specified'],
		trim: true,
	},
	flight: {
		type: String,
		required: [true, 'No flight specified'],
		trim: true,
		uppercase: true,
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	role: {
		type: String,
		default: 'user',
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
});

// Hash and salt the password before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);

	this.passwordConfirm = undefined;
	next();
});

// If the password has been modified set the updated at field
userSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

// validate if the password provided matches the stored password
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	// If the used has changed his password, check if it happened after the token
	// issue
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		// Will return true if the password was changed after token issue
		return JWTTimestamp < changedTimestamp;
	}

	// If the user has never changed their password just return false
	return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
