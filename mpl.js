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


function exposeTemplates(req, res, next) {
    // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
    // templates which will be shared with the client-side of the app.
    hbs.getTemplates('views/layouts/', {
        cache      : app.enabled('view cache'),
        precompiled: true
    }).then(function (templates) {
        // RegExp to remove the ".handlebars" extension from the template names.
        var extRegex = new RegExp(hbs.extname + '$');

        // Creates an array of templates which are exposed via
        // `res.locals.templates`.
        templates = Object.keys(templates).map(function (name) {
            return {
                name    : name.replace(extRegex, ''),
                template: templates[name]
            };
        });

        // Exposes the templates during view rendering.
        if (templates.length) {
            res.locals.templates = templates;
        }

        setImmediate(next);
    })
    .catch(next);
}


//set port number
app.set('port', process.env.PORT || 3000);

//create routes
app.get('/', function (req, res) {
    res.render('home')
});


app.get('/autocomplete', function (req, res) {
    res.render('autocomplete', {
        pageTitle: 'Autocomplete',
    });
});

app.get('/buttons', function (req, res) {
    res.render('buttons', {
        pageTitle: 'Buttons',
    });
});

app.get('/buttontoggles', function (req, res) {
    res.render('buttontoggles', {
        pageTitle: 'Button Toggles',
    });
});

app.get('/checkbox', function (req, res) {
    res.render('checkbox', {
        pageTitle: 'Checkbox',
    });
});

app.get('/chips', function (req, res) {
    res.render('chips', {
        pageTitle: 'Chips',
    });
});

app.get('/datatable', function (req, res) {
    res.render('datatable', {
        pageTitle: 'Data Table',
    });
});

app.get('/datepicker', function (req, res) {
    res.render('datepicker', {
        pageTitle: 'Date Picker',
    });
});

app.get('/dialog', function (req, res) {
    res.render('dialog', {
        pageTitle: 'Dialog',
    });
});

app.get('/expansionpanel', function (req, res) {
    res.render('expansionpanel', {
        pageTitle: 'Expansion Panel',
    });
});

app.get('/gridlist', function (req, res) {
    res.render('gridlist', {
        pageTitle: 'Grid List',
    });
});

app.get('/linearprogress', function (req, res) {
    res.render('linearprogress', {
        pageTitle: 'Linear Progress',
    });
});

app.get('/snackbar', function (req, res) {
    res.render('snackbar', {
        pageTitle: 'Snackbar',
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