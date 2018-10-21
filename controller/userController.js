const { promisify } = require('util');
const passport = require('passport');
const User = require('../models/User');

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/signup');
};

exports.postLogin = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/login');
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('errors', info);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash('success', { msg: 'Success! You are logged in.' });
            res.redirect(req.session.returnTo || '/');
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err);
        req.user = null;
        res.redirect('/');
    });
};

exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/signup');
};

exports.postSignup = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.assert('name', 'Name cannot be empty.');
    req.assert('phoneNumber', 'Phone number cannot be empty.');
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/signup');
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
            req.flash('errors', { msg: 'Account with that email address already exists.' });
            return res.redirect('/signup');
        }

        user.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
};

exports.getAccount = (req, res) => {
    res.render('account/profile');
};

exports.postUpdateProfile = (req, res, next) => {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/account');
    }

    User.findById(req.user.id, (err, user) => {
        if (err) { return next(err); }
        user.email = req.body.email || '';
        user.profile.name = req.body.name || '';
        user.profile.gender = req.body.gender || '';
        user.profile.location = req.body.location || '';
        user.profile.website = req.body.website || '';
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                    return res.redirect('/account');
                }
                return next(err);
            }
            req.flash('success', { msg: 'Profile information has been updated.' });
            res.redirect('/account');
        });
    });
};