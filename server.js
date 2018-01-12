const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port= process.env.PORT || 3000;
const app = express();


hbs.registerPartials(__dirname + '/views/partials')

//le decimos a express que use hbs como view engine
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', e => {
        if (e) {
            console.log('Algo anduvo mal')
        }
    })
    next();
});

/*app.use((req, res, next) =>{
    res.render('mantenimiento.hbs')
})*/

app.use(express.static(__dirname + '/public'));
//helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Pagina Principal',
        wellComeMessage: 'Bienvenido a la pagina',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        pageTitle:'Projects',
    })
})

app.listen(port, () => { console.log(`server escuchando en el puerto ${port}`) });