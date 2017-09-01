    var express     = require('express');
    var passport    = require('passport');
    var session     = require('express-session');
    var bodyParser  = require('body-parser');
    var env         = require('dotenv').load();
    var exphbs      = require('express-handlebars');
    var path        = require('path');
    var cookieParser=require('cookie-parser');
    var expressValidator= require('express-validator');
    var flash      = require('connect-flash');
    var LocalStrategy = require('passport-local').Strategy;

    var PORT = process.env.PORT || 5555;

    //APP INIT
    var app  = express();


    //Models
    var db = require("./app/models");
   // routes
    var routes = require('./app/routes/main.js');
    var customer = require('./app/routes/customer') // to get the routs for customer module



     // Sets up the Express app to handle data parsing
             app.use(bodyParser.json());
             app.use(bodyParser.urlencoded({ extended: true , defaultLayout:' main'}));
             app.use(bodyParser.text());
             app.use(bodyParser.json({ type: "application/vnd.api+json" }));





       // Static directory
      app.use(express.static('./public'));
               //For Handlebars
      app.set('views', 'views')
      app.engine('hbs', exphbs({extname: '.hbs', deffaultLayout: 'main'}));
      app.set('view engine', '.hbs');


    app.use(session({secret: 'cupcake',  resave: true,
    saveUninitialized:true}));
    // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions



   //EXPRESS Validator
   app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace =  param.split('.')
        , root        = namespace.shift()
        , formParam   = root;
      while(namespace.length){
        formParam += '['+namespace.shift() + ']';
      }

    return {
        param: formParam,
        msg  : msg,
        value: value
      }
    }
   }));

// connect Falsh
    app.use(flash());

    // Global variable for flash

    app.use(function(req, res, next){
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg   = req.flash('error_msg');
        res.locals.error       = req.flash('error')
        next()
    });

    app.use('/', routes);
    app.use('/customer', customer)



    //Sync Database
   db.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')

    }).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
    });



	app.listen(PORT, function(err){
    console.log(PORT)
		if(!err)
		console.log("Site is live"); else console.log(err)

	});
