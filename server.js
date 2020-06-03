const path = require('path');
const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const db = require('./models');

const hbs = exphbs.create({
	helpers: {
		toHtml: function (value) {
			return `<p>${value}</p>`
		}
	},
	defaultLayout: 'main',
	partialsDir: path.join(__dirname, 'views', 'partials'),
	extname: '.handlebars'
});
// Passport config
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express session middleware
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

app.use(express.static('public'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		// eslint-disable-next-line no-console
		console.log(`App listening on PORT ${PORT}`);
	});
});
