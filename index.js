const express = require('express');
var bodyParser = require('body-parser');
var userRoutes = require("./router/user.router");

const app = express();
const port = 3000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'pug');
app.set('views','./views');
app.use((express.static("public")));


app.get("/", (req,res)=> {
    res.render("index", {
        name : "Minh Thong"
    });
});


app.use("/users",userRoutes);

app.listen(port, () => console.log(`${port} listening ...`));
