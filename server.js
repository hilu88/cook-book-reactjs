const express = require("express");
const app = express();
const http = require('http');
const bodyParser = require("body-parser");
const multer = require('multer');
const mongoose = require("mongoose");
const upload = multer({dest: 'uploads/'});

const port = process.env.PORT || 8000;
const server = http.createServer(app);

mongoose.connect("mongodb+srv://admin:admin@receips-lcnjw.mongodb.net/test?retryWrites=true")
    .then(() => console.log('connection to DB successful'))
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Recipe = require('./api/models/recipe');
const Version = require('./api/models/version');

app.get('/recipes', (req, res) => {
    Recipe.find()
        .then(recipes => {
            res.status(200).json(recipes);
        })
        .catch(err => console.log(err));
});

app.post('/new-recipe', upload.single('recipeImaged') , (req, res) => {
    console.log(req.body);
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        cookTime: req.body.cookTime,
        numberOfServings: req.body.numberOfServings,
        date: new Date()
    });
    recipe
        .save()
        .then(results => {
            res.status(201).json(results)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

app.get('/recipes/:id', (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(err => console.log(err));
});

app.get('/recipe/versions/:id', function (req, res) {
    const recipeId = req.params.id;
    Version.find({recipeId: recipeId})
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(error => {
            console.log(error);
        })
});

app.put('/recipe/edit/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    Recipe.update({ _id: id }, { $set: update })
        .exec()
        .then(result => {
            const version = new Version({
                _id: new mongoose.Types.ObjectId(),
                recipeId: id,
                prevVersions: req.body,
                dateUpdate: new Date()
            });
            version
                .save()
                .then(results => {
                    res.status(201).json(results);
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    })
                });
            res.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
        });
});

app.delete('/recipes/:id', (req, res) => {
    const id = req.params.id;
    Recipe.findOneAndRemove({_id: id})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => console.log(err));
});

server.listen(port, err => {
    if(err) throw err;
    console.log(`Server running on port ${port}`)
});