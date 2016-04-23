var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var AWS = require('aws-sdk');
var multipart = require('connect-multiparty');
var Phaxio = require('phaxio');
//var fillPdf = require("fill-pdf");
var pdfFiller = require('pdffiller');


// var pdfFillForm = require('pdf-fill-form');

// our db models
var Person = require("../models/person.js");

//bringing in phaxio
var phaxio = new Phaxio(process.env.faxclientID, process.env.faxclientSecret);



//don't need this cause I'm not using these models to update the database
//var Updateaddress = require("../models/updateaddress.js");
//var Updatename = require("../models/updatename.js");


// S3 File dependencies

// var awsBucketName = process.env.AWS_BUCKET_NAME;
// var s3Path = process.env.AWS_S3_PATH; // TODO - we shouldn't hard code the path, but get a temp URL dynamically using aws-sdk's getObject
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY
// });
// var s3 = new AWS.S3();

// file processing dependencies

var multipartMiddleware = multipart();

var countyFaxNum;


/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {

  console.log('home page requested!');

  // var jsonData = {
  //   'name': 'voter-info',
  //   'api-status':'OK'
  // }

  // respond with json data
  //res.json(jsonData)

  // respond by redirecting
  //res.redirect('/directory')

  // respond with html
  //testing - res.render('registerhome.html')
  res.render('aboutme.html');

});

router.get('/aboutme', function(req,res){

  res.render('aboutme.html');

});

// router.get('/new-registration', function(req,res){

//   res.render('new-registration.html');

// });

// router.get('/edit-form', function(req,res){

//   res.render('edit-form.html');

// });

router.get('/registrationcomplete', function(req,res){

  res.render('registrationcomplete.html');

});

  

// });

// router.get('/updateaddress', function(req,res){

//   res.render('updateaddress.html');

// });

// router.get('/updatename', function(req,res){

//   res.render('updatename.html');

// });

router.post('/sendfax', function(req,res){

        console.log("HEY YOU", req.body.pdfnewOne)
        var pdfFile = "public/forms/" + req.body.pdfnewOne;
        fs.readFile(pdfFile, function(err,data){

             //console.log(req.body.faxywaxy);
        
        var faxInfo = {
            to: req.body.faxywaxy,
            filenames: pdfFile
        };

        phaxio.sendFax(faxInfo, function(err, data){
          if (err) {
            // there was an error! it didn't go through
            console.log(err);
          } else {
            //it worked!!
            console.log(data);
          }
        });

      })

     
  

    res.render('registrationcomplete.html');

});



    router.post('/submit_form', function(req,res){

          var citizenYes = req.body.citizenYes;
          var citizenNo = req.body.citizenNo;
          var ofageYes = req.body.ofageYes;
          var ofageNo = req.body.ofageNo;
          var lastname = req.body.lastname;
          var firstname = req.body.firstname;
          var middlename = req.body.middlename;
          var haddress = req.body.haddress;
          var hapt = req.body.hapt;
          var hcity = req.body.hcity;
          var hstate = req.body.hstate;
          var hzcode = req.body.hzcode;
          var hcounty = req.body.hcounty;
          var maddress = req.body.maddress;
          var mapt = req.body.mapt;
          var mcity = req.body.mcity;
          var mstate = req.body.mstate;
          var mzcode = req.body.mzcode;
          var dob = req.body.dob;
          var tnumber = req.body.tnumber;
          var idnumber = req.body.idnumber;
          var party = req.body.party;
          var email = req.body.email;
          var sign = req.body.sign;
          var tday = req.body.tday;
          //these need to be all made

          // if (req.body.ofageYes == 'y'){
          //   citizenYes == "X"
          // } else if (req.body.ofageNo == 'n'){
          //   alert('You are not able to register just yet, but check back soon! Your vote will count!')
          // }

          console.log("ccccchhhh-ch-checkin it out");
          console.log(req.body.lastname);

          var voterObj = {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            email: req.body.email,
            tnumber: req.body.tnumber
          }

          var person = new Person(voterObj);

            person.save(function(err,data){
              if(err){
                var error = {
                  status: "ERROR",
                  message: err
                }
                return res.json(err)
              }
            })


              res.render("showInfo.html", {

                czy: citizenYes,
                czn: citizenNo,
                oay: ofageYes,
                oan: ofageNo,
                ln: lastname,
                fn: firstname,
                mn: middlename,
                ha: haddress,
                hap: hapt,
                hc: hcity,
                hs: hstate,
                hz: hzcode,
                hco: hcounty,
                ma: maddress,
                map: mapt,
                mc: mcity,
                ms: mstate,
                mz: mzcode,
                db: dob,
                tn: tnumber,
                id: idnumber,
                pp: party,
                em: email,
                sig: sign,
                td: tday


              });


              router.post('/resubmit', function(req,res){

                        console.log("Wha-wh-wh-what's it all about");
                        console.log(lastname);

                        res.render("aboutme.html", {
                          
                          rln: lastname,
                          rfn: firstname,
                          rmn: middlename,
                          rczy: citizenYes,
                          rczn: citizenNo,
                          roay: ofageYes,
                          roan: ofageNo,
                          rha: haddress,
                          rhap: hapt,
                          rhc: hcity,
                          rhs: hstate,
                          rhz: hzcode,
                          rhco: hcounty,
                          rma: maddress,
                          rmap: mapt,
                          rmc: mcity,
                          rms: mstate,
                          rmz: mzcode,
                          rdb: dob,
                          rtn: tnumber,
                          rid: idnumber,
                          rpp: party,
                          rem: email,
                          rsig: sig,
                          rtd: tday

                          
                        });

                      });


              countyFaxNum = hcounty;

                  router.post('/renderform', function(req,res){ 
                  var random = Math.floor(Math.random()*100000);
                  var sourcePDF = "template-new.pdf";
                  var temporaryPDF = "newform" + random + ".pdf"
                  var destinationPDF = "./public/forms/" + temporaryPDF;

                  console.log(temporaryPDF); 



                  var pdfData = {
                    "topmostSubform[0].Page4[0].TextField1[2]": lastname,
                    "topmostSubform[0].Page4[0].TextField1[1]": firstname,
                    "topmostSubform[0].Page4[0].TextField1[0]": middlename,
                    "topmostSubform[0].Page4[0].TextField2[0]": haddress,
                    "topmostSubform[0].Page4[0].TextField3[0]": hapt,
                    "topmostSubform[0].Page4[0].TextField4[0]": hcity,
                    "topmostSubform[0].Page4[0].TextField5[0]": hstate,
                    "topmostSubform[0].Page4[0].TextField6[0]": hzcode,
                    "topmostSubform[0].Page4[0].DateTimeField1[0]": dob,
                    "topmostSubform[0].Page4[0].NumericField1[0]": tnumber,
                    "topmostSubform[0].Page4[0].TextField11[0]": idnumber,
                    "E1": citizenYes,
                    "E2": citizenNo,
                    "F1": ofageYes,
                    "F2": ofageNo
                  };

                  pdfFiller.fillForm(sourcePDF, destinationPDF, pdfData, function(err){
                    if (!err){
                      // res.sendfile(destinationPDF); 
                      //save the pdf so that it can be served, render the page passing the name of the pdf to the new page
                      //and the new library will handle the new pdf from there

                      res.render('renderPdf.html', {hco: countyFaxNum, destinationPDF: temporaryPDF});
                    }
                  });



                  //console.log(countyFaxNum);
                  // res.render('renderPdf.html', {hcfn: countyFaxNum});


                });

            });

                router.get('/renderform', function(req,res){
                  

                });



module.exports = router;








