const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", function (req, res) {
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;
    console.log(res.statusCode);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname,

                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/576a3a33d2";
    const options = {
        method: "post",
        auth: "Ishaan1:67ff87313701e990aae8edfbd01e7f7b-us14",


    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
          } else {
            res.sendFile(__dirname + "/failure.html");
          }
      
        
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
        request.write(jsonData);
    request.end();
})
app.post("/failure.html",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, function () {
    console.log("The server is serving at port 3000");
})

// api key
// 67ff87313701e990aae8edfbd01e7f7b-us14
//list id
// 576a3a33d2.