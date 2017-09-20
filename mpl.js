var express = require('express');
var app = express();
var helpers = require('./lib/helpers');

//SASS compiler
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
app.use(sassMiddleware({
    src:  __dirname + '/sass',
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    sourceMap: __dirname + '/public/sourcemaps',
    outputStyle: 'compressed',
    prefix:  '/css'
}));
app.use('/public', express.static(path.join(__dirname, 'public')));

//declare imports
var fortune = require('./lib/fortune.js');

//add the static middleware
app.use(express.static(__dirname + '/public'));

//setup handlebars view engine
var handlebars = require('express-handlebars')
    .create({ 
        defaultLayout: 'main',
        helpers      : helpers,
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//set port number
app.set('port', process.env.PORT || 3000);

//create routes
app.get('/', function (req, res) {
    res.render('home', {   
        layout: 'home',
    })
});


app.get('/autocomplete', function (req, res) {
    res.render('autocomplete', {
        pageTitle: 'Autocomplete',
        partialVar: 'Autocomplete',     
    });
});

app.get('/buttons', function (req, res) {
    res.render('buttons', {
        pageTitle: 'Buttons', 
        partialVar: 'Buttons',  
    });
});

app.get('/buttontoggles', function (req, res) {
    res.render('buttontoggles', {
        pageTitle: 'Button Toggles',
        partialVar: 'Button Toggles',
    });
});

app.get('/card', function (req, res) {
    res.render('card', {
        pageTitle: 'Card',
        partialVar: 'Card',
    });
});

app.get('/checkbox', function (req, res) {
    res.render('checkbox', {
        pageTitle: 'Checkbox',
        partialVar: 'Checkbox',
    });
});

app.get('/chips', function (req, res) {
    res.render('chips', {
        pageTitle: 'Chips',
        partialVar: 'Chips',
    });
});

app.get('/datatable', function (req, res) {
    res.render('datatable', {
        pageTitle: 'Data Table',
        partialVar: 'Data Table',
    });
});

app.get('/datepicker', function (req, res) {
    res.render('datepicker', {
        pageTitle: 'Date Picker',
        partialVar: 'Date Picker',
    });
});

app.get('/dialog', function (req, res) {
    res.render('dialog', {
        pageTitle: 'Dialog',
        partialVar: 'Dialog',
    });
});

app.get('/dropdownselect', function (req, res) {
    res.render('dropdownselect', {
        pageTitle: 'Dropdown Select',
        partialVar: 'Dropdown Select',
    });
});

app.get('/expansionpanel', function (req, res) {
    res.render('expansionpanel', {
        pageTitle: 'Expansion Panel',
        partialVar: 'Expansion Panel',
    });
});

app.get('/gridlist', function (req, res) {
    res.render('gridlist', {
        pageTitle: 'Grid List',
        partialVar: 'Grid List',
    });
});

app.get('/linearprogress', function (req, res) {
    res.render('linearprogress', {
        pageTitle: 'Linear Progress',
        partialVar: 'Linear Progress',
    });
});

app.get('/list', function (req, res) {
    res.render('list', {
        pageTitle: 'List',
        partialVar: 'List',
    });
});

app.get('/radio', function (req, res) {
    res.render('radio', {
        pageTitle: 'Radio',
        partialVar: 'Radio',
    });
});

app.get('/simplemenu', function (req, res) {
    res.render('simplemenu', {
        pageTitle: 'Simple Menu',
        partialVar: 'Simple Menu',
    });
});

app.get('/slider', function (req, res) {
    res.render('slider', {
        pageTitle: 'Slider',
        partialVar: 'Slider',
    });
});

app.get('/snackbar', function (req, res) {
    res.render('snackbar', {
        pageTitle: 'Snackbar',
        partialVar: 'Snackbar',
    });
});

app.get('/structure', function (req, res) {
    res.render('structure', {
        pageTitle: 'Page Layout & Structure',
        partialVar: 'Structure',
    });
});

app.get('/switch', function (req, res) {
    res.render('switch', {
        pageTitle: 'Switch',
        partialVar: 'Switch',
    });
});

app.get('/tabs', function (req, res) {
    res.render('tabs', {
        pageTitle: 'Tabs',
        partialVar: 'Tabs',
    });
});

app.get('/toolbars', function (req, res) {
    res.render('toolbars', {
        pageTitle: 'Toolbars',
        partialVar: 'Toolbars',
    });
});

app.get('/typography', function (req, res) {
    res.render('typography', {
        pageTitle: 'Typography',
        partialVar: 'Typography',
        layout: 'notabs',
    });
});

//404 Catch-all handler
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
})

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost' + app.get('port') + '; press ctrl-c to terminate.');
});