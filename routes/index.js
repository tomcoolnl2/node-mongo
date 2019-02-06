
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('home', { title: 'Express' })
})

/* GET Userlist page. */
router.get('/userlist', (req, res) => {
    const { db } = req
    const collection = db.get('usercollection')
    collection.find({}, {}, (e, docs) => {
        res.render('userlist', {
            'userlist' : docs
        })
    })
})

/* GET New User page. */
router.get('/newuser', (req, res) => {
    res.render('newuser', { title: 'Add New User' })
})

/* POST to Add User Service */
router.post('/adduser', (req, res) => {

    // Set our internal DB variable
    const { db, body } = req

    // Get our form values. These rely on the 'name' attributes
    const { username, useremail: email } = body

    // Set our collection
    var collection = db.get('usercollection')

    // Submit to the DB
    collection.insert({ username, email }, (err, doc) => {
        if (err) {
            // If it failed, return error
            res.send('There was a problem adding the information to the database.');
        }
        else {
            // And forward to success page
            res.redirect('userlist')
        }
    })
})

module.exports = router
