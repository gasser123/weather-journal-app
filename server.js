// Setup empty JS Object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//Note that body-parser is already included now in express.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port=8000;
function listening(){
 console.log("server running");
 console.log("running on port "+port);

}
app.listen(port,listening());

//POST request
app.post('/js',function(req,res){  
let newEntry={
 date:req.body.date,
 temp:req.body.temp,
 content:req.body.content
}
projectData=newEntry;
console.log(projectData);
});

//GET request to update UI with most recent entry
app.get('/js',function(req,res){    
res.send(projectData);

});

