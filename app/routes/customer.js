var express = require('express');
var router = express.Router();
// var Customer     = require('../models/customer'); // to get the value from customer module
var db     = require('../models')
	router.get('/login', (req, res, next) => {
		res.render('login')
	});

	router.get('/register', (req, res, next) =>{
		res.render('register')
	});

	router.get('/order', (req, res, next) => {
		res.render('dashboard')
	});

	router.post('/register',  (req, res) =>{

		var firstname = req.body.firstname;
		var lastname  = req.body.lastname;
		var email     = req.body.email;
		var password  = req.body.password;
		var confirm  = req.body.confirm;
		var add      = req.body.add;
		var zipcode   = req.body.zipcode;
		console.log(firstname + ""+   email )
		//validation
		 req.check('firstname', 'First Name is Required').notEmpty();
		req.check('lastname', 'Last Name is Required').notEmpty();
		req.check('email', 'Email is not Valid').isEmail();
		req.check('password', ' passwords must be at least 6 chars long and contain one number').isLength({ min: 6 })
    .matches(/\d/).notEmpty();
		req.check('confirm', 'Password Do not match').equals(req.body.password);
		req.check('add', 'Address State is Required').notEmpty();
		req.check('zipcode', ' A valid Postalcode is Required').isInt().isLength({ min: 5 }).notEmpty();

		var errors = req.validationErrors();

		if(errors){
			res.render('register',{
				errors:errors
			})
		} else {
			var newCutomer = new Customer({
				firstname: firstname,
				 lastname: lastname,
				    email: email,
				 password: password,
					    add: add,
					zipcode: zipcode
				});
				db.Customer.create(newCutomer, function (err, dbcutomer) {
					if(err) throw {
						err
					};
					console.log(dbcustomer)
				});
				req.flash('success_msg', 'You are successfuly registered and now you can signin');
				res.redirect('/customer/login');
		}
	});

router.post('/login', (req, res) => {
	res.rednder('dashboard') // dashboard is the order form
})
module.exports = router;
