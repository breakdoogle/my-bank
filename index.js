import express from 'express';
import cors from 'cors';
import dal from './dal.js';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import session from 'express-session';

const firebaseConfig = {
  apiKey: "AIzaSyCDk1MUuKH5gxR4qWmuo4ZacGTGd4Z5D4M",
  authDomain: "banking-app-new.firebaseapp.com",
  projectId: "banking-app-new",
  storageBucket: "banking-app-new.appspot.com",
  messagingSenderId: "944082671767",
  appId: "1:944082671767:web:c5c70cfcc13d95456d31d2"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret'
}));

app.post('/account/create', function (req, res) {
    console.log(req.body);
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        const user = userCredential.user;
        res.json({message: 'Account Created'});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
});

app.get('/foo', function (req, res) {
    res.json(req.session.user);
});

app.get('/', function(req, res){
    res.redirect('/login');
  });

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/account/login', function (req, res) {
    console.log(req.body);
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        const user = userCredential.user;
        req.session.user = user;
        res.json({message: 'Login Successful'});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
});

app.get('/account/logout', function (req,res) {
    signOut(auth).then(() => {
        
      }).catch((error) => {
        
      });
})

app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

app.post('/account/update', function (req, res) {
    console.log(req.body);
    updateProfile(auth, req.body.email, req.body.amount)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(response);
            res.session.user = user;
            res.send(amount);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });    
});

app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);