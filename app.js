const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet')
const cors = require('cors')
const config = require('./conf/db');
var morgan   = require('morgan');
const routes = require('./routes');
var path = require('path');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const cmsusers = require('./controllers/cms/cmsusers_controller.js');
const app = express();
app.use(helmet())
const router = express.Router()
routes(router)

app.use(passport.initialize());
require('./passport')(passport);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
//app.use('/api/users', users);
app.use('/api', router)
/*app.get('/', function(req, res) {
    res.send('Welcome to nescafe app');
}); */

app.get('/',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index.html'));
    });

//app.get('/verify-email/:id', cmsusers.verifyemail);

app.get('/index1',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index1.html'));
    });
        
app.get('/index2',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index2.html'));
    });
app.get('/index3',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index3.html'));
    });    
app.get('/index4',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index4.html'));
    });
app.get('/index5',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index5.html'));
    });
app.get('/index6',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index6.html'));
    });
app.get('/index7',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index7.html'));
    });
app.get('/index8',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index8.html'));
    });
app.get('/index9',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index9.html'));
    });
app.get('/index10',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index10.html'));
    });

//const PORT = process.env.PORT || 8800;
//const PORT = 6666;

app.listen(config.PORT, () => {
    console.log(`Server is running on PORT ${config.PORT}`);
});
