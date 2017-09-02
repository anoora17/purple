
var express  = require('express');
var router   = express.Router();
var Customer = require('../models/')["Customer"]; // to get the value from customer module I know it looks odd but this only with mysql
var db       = require('../models')

  router.get('/login', (req, res, next) => {
    res.render('login')
  });

  	 router.get('/logout', (req, res, next) => {
    res.render('index')
  });

  router.get('/register', (req, res, next) =>{
    res.render('register')
  });

  router.get('/order', (req, res, next) => {
    res.render('dashboard')
  });

  router.post('/register',  (req, res) =>{


    //validation before we send the data to cutomer table
    req.check('firstname', 'First Name is Required').notEmpty();
    req.check('lastname', 'Last Name is Required').notEmpty();
    req.check('email', 'Email is not Valid').isEmail();
    req.check('password', ' passwords must be at least 6 chars long and contain one number').isLength({ min: 6 })
    .matches(/\d/).notEmpty();
    req.check('confirm', 'Password Do not match').equals(req.body.password);
    req.check('addr1', 'Address  is Required').notEmpty();
     req.check('addr2', 'Street  is Required').notEmpty();
    req.check('city', 'City is Required').notEmpty();
    req.check('state', 'State is Required').notEmpty();
    req.check('zipcode', ' A valid Postalcode is Required').isInt().isLength({ min: 5 }).notEmpty();

    var errors = req.validationErrors();

    if(errors){
      res.render('register',{
        errors:errors
      })
    } else {
      var newCutomer = {
        firstname: req.body.firstname,
         lastname: req.body.lastname,
            email: req.body.email,
         password: req.body.password,
              addr1: req.body.add,
              addr2: req.body.add2,
               city:req.body.city,
               state:req.body.state,
          zipcode: req.body.zipcode
        };
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


module.exports = router;
