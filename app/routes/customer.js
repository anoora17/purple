var express  = require('express');
var router   = express.Router();
var Customer = require('../models/')["Customer"]; // to get the value from customer module I know it looks odd but this only with mysql
var db       = require('../models')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
 var bCrypt = require('bcryptjs');

  router.get('/login', (req, res, next) => {
    res.render('login')
  });

  router.get('/register', (req, res, next) =>{
    res.render('register')
  });

  router.get('/order', ensureAuthentication, (req, res, next) => {
      res.render('dashboard')
    });


    function ensureAuthentication (req, res, next){
      if(req.isAuthenticated()){
        console.log('PASSED')
        return next()
      } else
      res.redirect('/cutomer/login')
    }

  router.post('/register',  (req, res) => {


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

       var pass = req.body.password
       var generateHash = function(pass) {
      return bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);
      };
      console.log (pass)

      var newCutomer =  {
        firstname: req.body.firstname,
         lastname: req.body.lastname,
            email: req.body.email,
          password: generateHash(pass),
             addr1: req.body.addr1,
             addr2: req.body.addr2,
             city:req.body.city,
             state:req.body.state,
          zipcode: req.body.zipcode
        };


    db.Customer.create(newCutomer, function (err, dbcutomer) {
          if(err) throw {
            err
          };
          console.log(dbcustomer+ ' customer is created' )
        });

        req.flash('success_msg', 'You are successfuly registered and now you can signin');
        res.redirect('/customer/login');
    }
  });


 passport.use(  new LocalStrategy(

 {
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },


  function(req, email, password, done) {
      console.log(email+"//"+password+" is trying to login as local.");

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

db.Customer.findOne({email: email}).then(function (customer) {

      if (!customer) {
        return done(null, false, { message: 'Email does not exist' });
      }

      if (!isValidPassword(customer.password, password)) {

        return done(null, false, { message: 'Incorrect password.' });

      }

      var customerinfo = customer.get();

      return done(null,customerinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, { message:flash('Something went wrong with your Signin')  });


    });

  }  ));

passport.serializeUser(function(customer, done) {
          done(null, customer.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      db.Customer.findById(id).then(function(customer) {
        if(customer){
          done(null, customer.get());
        }
        else{
          done(customer.errors,null);
        }
      });

  });
router.post('/login',
  passport.authenticate('local',
    { successRedirect:'/customer/order',
  	failureRedirect: '/customer/register',
  	failureFlash: true
     }),

  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/index');
  });

router.get('/logout',(req, res) => {
  req.logout();
  req.flash('success_msg', " you are successfuly logged out")
  res.redirect('/customer/login')
})

module.exports = router;
