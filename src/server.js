const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const resumeRouter = require("./routes");
dotenv.config();


const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(session({
    secret: "thisisasecret",
    saveUninitialized: false,
    resave: false
}));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));


app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
})

//routes
app.use('/', resumeRouter);



const startServer = () => {
    app.listen(port, () => {
        console.log(`Server running at ${port}`);
    });
}

module.exports = startServer;