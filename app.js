//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//tells the app to use ejs as view engine
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let today = new Date();

  let option = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  let day = today.toLocaleDateString("en-US",option);

  res.render("list", { listTitle: day, newListItems: items});
});


app.post("/", function(req,res){
    item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work", newListItems: workItems});
});

app.get("/about",function(req,res){
    res.render("about");
});

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
