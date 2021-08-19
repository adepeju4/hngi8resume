const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const resumeRouter = require("./routes");
dotenv.config();

const hostname = "localhost";
const port = process.env.port || 3000;

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cors());
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
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
}

module.exports = startServer;