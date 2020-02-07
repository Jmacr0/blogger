const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

// Passport config
require("./config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express session middleware
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash 
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.static("public"));

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// var hbs = exphbs.create({
//     // Specify helpers which are only registered on this instance.
//     helpers: {
//         foo: function () { return 'FOO!'; },
// 		bar: function () { return 'BAR!'; },
// 		compare: function (lvalue, operator, rvalue, options) {
// 			var operators, result;
// 			if (arguments.length < 3) {
// 				throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
// 			}
// 			if (options === undefined) {
// 				options = rvalue;
// 				rvalue = operator;
// 				operator = "===";
// 			}
// 			operators = {
// 				'==': function (l, r) { return l == r; },
// 				'===': function (l, r) { return l === r; },
// 				'!=': function (l, r) { return l != r; },
// 				'!==': function (l, r) { return l !== r; },
// 				'<': function (l, r) { return l < r; },
// 				'>': function (l, r) { return l > r; },
// 				'<=': function (l, r) { return l <= r; },
// 				'>=': function (l, r) { return l >= r; },
// 				'typeof': function (l, r) { return typeof l == r; }
// 			};
// 			if (!operators[operator]) {
// 				throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
// 			}
// 			result = operators[operator](lvalue, rvalue);
// 			if (result) {
// 				return options.fn(this);
// 			} else {
// 				return options.inverse(this);
// 			}
// 		}
//     }
// });

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./controllers");

app.use(routes);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
