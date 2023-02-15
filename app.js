const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

//use to access local css and images
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  let firstName = req.body.fname;
  let lastName = req.body.lname;
  let email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName },
      },
    ],
  };

  //turn above data into string
  let jsonData = JSON.stringify(data);

 // const url = "https://us9.api.mailchimp.com/3.0/lists/da1ffc6174/members";
 //https://<dc>.api.mailchimp.com/3.0/

 const url ='https://us9.api.mailchimp.com/3.0/lists/da1ffc6174'

  const options = {
    method: "POST",
    auth: "Titus_khalo:17ab03aff2e0743f31bd68c05813ad64-us9",
  };
 const mailchimpRequest =  https.request(url, options, function (response) {
        if(response.statusCode===200)
        {
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")

        }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  mailchimpRequest.write(jsonData);
  mailchimpRequest.end();

});

app.post("/failure.html" , function(req,res)
{
    res.redirect("/")
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(5500, function () {
  console.log("port running on 3000");
});
