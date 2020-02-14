
//API to query for wine I like
const express = require('express');
const app = express();
const db = require('./models');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("HOME")
})
// INDEX - all of Connie's wine - GET /wine
app.get('/wines', (req, res) => {
    db.wine.findAll().then(function(wines) {
        res.json(wines);
    }).catch(err => {
        console.log(err)
        res.send("ERROR");
    })
// res.send("ALL USERS");
});


// CREATE - give Connie a wine - POST /wine 
app.post('/wines', (req, res) => {
   db.wine.findOrCreate({
       where: {
           name: req.body.name
       },
       defaults: {
           type: req.body.type,
           winery: req.body.winery,
           rating: req.body.rating,
           suggest: req.body.suggest
       }
   }).then(function([wine, created]){
       console.log(`Successfully ${created ? 'created' : 'found'} ${wine.winery} ${wine.type}`);
       res.redirect(`/wines/${wine.id}`);
   }).catch(err => {
       console.log(err);
       res.send("ERROR");
   })
   
    // res.send("GIVE CONNIE WINE");
});

// SHOW - lookup wine Connie owns by name - GET /wine/:id
app.get('/wines/:id', (req, res) => {
    db.wine.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(wine) {
        console.log("Found a good wine!", wine.name);
        res.send(`I found a good wine! It's ${wine.name}.`);
    }).catch(err => console.log(err));
    // res.send("SHOW ME THE ONE WINE");
});

// UPDATE - update a rating on a wine - GET /wine/:id
app.put('/wines/:id', (req, res) => {
    db.wine.update(
        {
            name: req.body.name,
            type: req.body.type,
            winery: req.body.winery,
            rating: req.body.rating,
            suggest: req.body.suggest
        },
        {where: req.params.id}).then(function(wine) {
            console.log("Cool! You updated the ", wine.name);
            res.send(`Rad! You updated the ${wine.name}. (^-')b`);
        }).catch(err => console.log(err));
        
    // res.send("UPDATING USER AT ID " + req.params.id);
});

// DESTROY - wine has been drunk - DELETE /wine/:id (reroute to /wine)
app.delete('/wines/:id', (req, res) => {
    res.send("DRANK WINE AT ID " + req.params.id);
});

app.listen(3000, ()=>console.log(`🍷You are drinking in the sweet sweet sounds of port 3000🍷`));