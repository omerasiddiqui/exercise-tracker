const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const usersDB = admin.database().ref('/users');
const exerciseDB = admin.database().ref('/exercises');


// add user function
exports.addUser = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }

        usersDB.push({
            "username": req.body.username,
            "createdAt": admin.database.ServerValue.TIMESTAMP
        });

        let items = [];

        return usersDB.on('value', (snapshot) => {
            snapshot.forEach((item) => {
                console.log(item);
                items.push({
                    id: item.key,
                    username: item.val().username,
                    createdAt: item.val().createdAt
                });
            });
            res.status(200).json(items);
        }, (error) => {
            res.status(error.code).json({
                message: `Something went wrong. ${error.message}`
            })
        })
    })
})

// get user function
exports.getUsers = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(404).json({
                message: 'Not allowed'
            })
        }
        let items = [];

        return usersDB.on('value', (snapshot) => {
            snapshot.forEach((item) => {
                items.push({
                    id: item.key,
                    username: item.val()
                });
            });
            res.status(200).json(items);
        }, (error) => {
            res.status(error.code).json({
                message: `Something went wrong. ${error.message}`
            })
        })
    })
})


// delete **Template**
exports.delete = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'DELETE') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }
        const id = req.query.id
        admin.database().ref(`/items/${id}`).remove()
        getItemsFromDatabase(res)
    })
})


// add exercise function
exports.addExercise = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }

        exerciseDB.push({
            "username": req.body.username,
            "description": req.body.description,
            "duration": req.body.duration,
            "date": req.body.date,
            "createdAt": admin.database.ServerValue.TIMESTAMP
        });

        let items = [];

        return exerciseDB.on('value', (snapshot) => {
            snapshot.forEach((item) => {
                console.log(item);
                items.push({
                    id: item.key,
                    username: item.val().username,
                    description: item.val().description,
                    duration: item.val().duration,
                    date: item.val().date,
                    createdAt: item.val().createdAt
                });
            });
            res.status(200).json(items);
        }, (error) => {
            res.status(error.code).json({
                message: `Something went wrong. ${error.message}`
            })
        })
    })
})

// get exercise function
exports.getExercises = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(404).json({
                message: 'Not allowed'
            })
        }
        let items = [];

        return exerciseDB.on('value', (snapshot) => {
            snapshot.forEach((item) => {
                items.push({
                    id: item.key,
                    username: item.val().username,
                    description: item.val().description,
                    duration: item.val().duration,
                    date: item.val().date,
                    createdAt: item.val().createdAt
                });
            });
            res.status(200).json(items);
        }, (error) => {
            res.status(error.code).json({
                message: `Something went wrong. ${error.message}`
            })
        })
    })
})