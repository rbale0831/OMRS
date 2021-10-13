const express = require('express');
const mongoose = require('mongoose');
const infoPageRoutes = require('./routes/infoPageRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// register view engine
app.set('view engine', 'ejs');
const dbURL = 'mongodb+srv://rbale0831:rohit3108@cluster0.dzwxs.mongodb.net/partial';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true/*, useCreateIndex: true*/})
    .then((result) => app.listen(9000))
    .catch((error) => console.log(error));


// Normal Routes
app.get('/', (req, res) => {
    res.redirect('/home');
});

// info_page Routes
app.use('/home', infoPageRoutes); 
app.use('/hospital', hospitalRoutes);
app.use('/admin', adminRoutes);






