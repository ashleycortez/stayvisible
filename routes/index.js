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

//pdf model, maybe?
var Voter = require("../models/voterInfo.js");


// var cred = require ('../secrets.js');
// var phaxio = new Phaxio(cred.faxclientID, cred.faxclientSecret);

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

        console.log("HEY YOU")
        var pdfFile = './GovLab-CoverLetter.pdf';
        // fs.readFile(pdfFile, function(err,data){

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

      // })

     
  

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
          //these need to be all made

          console.log("this is happening to you");
          console.log(req.body.lastname);


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
                si: sign

              });


              router.post('/resubmit', function(req,res){

                        console.log("this is happening to you again");
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
                          rsi: sign
                          
                        });

                      });


              countyFaxNum = hcounty;

                  router.post('/renderform', function(req,res){ 
                  var sourcePDF = "registration.pdf";
                  var destinationPDF = "public/forms/newform.pdf"; 

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

                      res.render('renderPdf.html', {hcfn: countyFaxNum, destinationPDF: destinationPDF});
                    }
                  });



                  //console.log(countyFaxNum);
                  // res.render('renderPdf.html', {hcfn: countyFaxNum});


                });

            });

                router.get('/renderform', function(req,res){
                  

                });







                                    

                                          //map to data model
                                        //   var personObj = {
                                        //     lastname: req.body.lastname,
                                        //     firstname: req.body.firstname,
                                        //     middlename: req.body.middlename,
                                        //     tnumber: req.body.tnumber,
                                        //     email: req.body.email,
                                        //     zcode: req.body.zcode
                                        //   }

                                        //   var person = new Person(personObj);
                                          
                                        //   //save your person to the database!
                                        //   person.save(function(err,data){
                                        //     if(err){
                                        //       var error = {
                                        //         status: "ERROR",
                                        //         message: err
                                        //       }
                                        //       return res.json(err)
                                        //     }

                                        //     //You don't need to send this back
                                        //     // var jsonData = {
                                        //     //   status: "OK",
                                        //     //   person: data
                                        //     // }



                                        //     //send PDF back to browser
                                        //     //need to send back as a file stream
                                        //     return res.json(jsonData);

                                        //   })

                                        // });

// router.post('/api/edit/:id', function(req,res){

//   console.log(req.body);
//   var requestedId = req.params.id;

//   var personObj = {
//     citizen: req.body.citizen,
//     ofage: req.body.ofage,
//     lastname: req.body.lastname,
//     firstname: req.body.firstname,
//     middlename: req.body.middlename,
//     clastname: req.body.clastname,
//     cfirstname: req.body.cfirstname,
//     cmiddlename: req.body.cmiddlename,
//     haddress: req.body.haddress,
//     hapt: req.body.hapt,
//     hcity: req.body.hcity,
//     hstate: req.body.hstate,
//     hzcode: req.body.hzcode,
//     maddress: req.body.maddress,
//     mapt: req.body.mapt,
//     mcity: req.body.mcity,
//     mstate: req.body.mstate,
//     mzcode: req.body.mzcode,
//     chaddress: req.body.chaddress,
//     chapt: req.body.chapt,
//     chcity: req.body.chcity,
//     chstate: req.body.chstate,
//     chzcode: req.body.chzcode,
//     cmaddress: req.body.cmaddress,
//     cmapt: req.body.cmapt,
//     cmcity: req.body.cmcity,
//     cmstate: req.body.cmstate,
//     cmzcode: req.body.cmzcode,
//     dob: req.body.dob,
//     tnumber: req.body.tnumber,
//     party: req.body.party,
//     rore: req.body.rore,
//     sign: req.body.sign,
//     dateAdded : { type: Date, default: Date.now },
//     link: req.body.link,
//     imageUrl: req.body.imageUrl,
//     slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
//   }
//   console.log(personObj);

//   Person.findByIdAndUpdate(requestedId,personObj,function(err,data){
//     if(err){
//       var error = {
//         status: "ERROR",
//         message: err
//       }
//       return res.json(error)
//     }

//     var jsonData = {
//       status: "OK",
//       person: data
//     }

//     //return res.json(jsonData);

//     return res.redirect('/render-form');

//   })

// })

router.post('/api/create/image', multipartMiddleware, function(req,res){

  console.log('the incoming data >> ' + JSON.stringify(req.body));
  console.log('the incoming image file >> ' + JSON.stringify(req.files.image));

  var personObj = {
    citizen: req.body.citizen,
    ofage: req.body.ofage,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    clastname: req.body.clastname,
    cfirstname: req.body.cfirstname,
    cmiddlename: req.body.cmiddlename,
    haddress: req.body.haddress,
    hapt: req.body.hapt,
    hcity: req.body.hcity,
    hstate: req.body.hstate,
    hzcode: req.body.hzcode,
    maddress: req.body.maddress,
    mapt: req.body.mapt,
    mcity: req.body.mcity,
    mstate: req.body.mstate,
    mzcode: req.body.mzcode,
    chaddress: req.body.chaddress,
    chapt: req.body.chapt,
    chcity: req.body.chcity,
    chstate: req.body.chstate,
    chzcode: req.body.chzcode,
    cmaddress: req.body.cmaddress,
    cmapt: req.body.cmapt,
    cmcity: req.body.cmcity,
    cmstate: req.body.cmstate,
    cmzcode: req.body.cmzcode,
    dob: req.body.dob,
    tnumber: req.body.tnumber,
    party: req.body.party,
    rore: req.body.rore,
    sign: req.body.sign,
    dateAdded : { type: Date, default: Date.now },
    link: req.body.link,
    imageUrl: req.body.imageUrl,
    slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
  }

  if (req.body.hasGlasses == 'yes') personObj['hasGlasses'] = true;
  else personObj['hasGlasses'] = false;


  // NOW, we need to deal with the image
  // the contents of the image will come in req.files (not req.body)
  var filename = req.files.image.name; // actual filename of file
  var path = req.files.image.path; // will be put into a temp directory
  var mimeType = req.files.image.type; // image/jpeg or actual mime type
  
  // create a cleaned file name to store in S3
  // see cleanFileName function below
  var cleanedFileName = cleanFileName(filename);

  // We first need to open and read the uploaded image into a buffer
              




                  fs.readFile(path, function(err, file_buffer){
                  //how to get the form data formatted right for the PDF
                  //PDF library creates the file --> file_buffer

                    // reference to the Amazon S3 Bucket
                    var s3bucket = new AWS.S3({params: {Bucket: awsBucketName}});
                    
                    // Set the bucket object properties
                    // Key == filename
                    // Body == contents of file
                    // ACL == Should it be public? Private?
                    // ContentType == MimeType of file ie. image/jpeg.
                    var params = {
                      Key: cleanedFileName,
                      Body: file_buffer,
                      ACL: 'public-read',
                      ContentType: mimeType
                    };

                  });
                  

  //returning the file buffer as your POST response
  //object file_buffer & mimetype/contenttype
  //figure out how to use express to send back a file stream


 //app.post('/url/to/hit', function(req, res, next) {
  //pdf form filler thingy -->
  //Reading an existing PDF
  // var stream = fs.readStream('/location/of/pdf');

  //take the form and properly map it to a new PDF object
  // var pdfFields = {
  //   {FieldName:"name",
  //   Value: request.body.name}
    //etc.
  // }
  // //Creating one for you with magic
  // var myPDF = pdfThingy.create(pdfFields, blah, function(fileBuffer){
  //   return fileBuffer;
  // });

//goes up at the top
// var pdfFillForm = require('pdf-fill-form');
// var fs = require('fs');

// Use here the field names you got from read
// var pdfData = { 
//   "FileNameAlt": response.body.name,
//   //etc
// }

// pdfFillForm.writeAsync(fileName='string', data='{}', instructions={}, 
//     function(err, pdf) {
//         fs.writeFile("filled_test.pdf", pdf, function(err){});
//     }
// );

// pdfFillForm.writeAsync('test.pdf', pdfData, { "save": "pdf" }, function(err, pdf){
//   //pass back the pdf and set the headers
//    //whatever you want it to be
//     var filename = "WhateverFilenameYouWant.pdf"; 
//   // Be careful of special characters
//     filename = encodeURIComponent(filename);
//   // Ideally this should strip them

//   //Header of the response
//     res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
//     res.setHeader('Content-type', 'application/pdf');

//     myPDF.pipe(res);
// })

// return res;
 
 
//});


      // Put the above Object in the Bucket
//     s3bucket.putObject(params, function(err, data) {
//       if (err) {
//         console.log(err)
//         return;
//       } else {
//         console.log("Successfully uploaded data to s3 bucket");

//         // now that we have the image
//         // we can add the s3 url our person object from above
//         personObj['imageUrl'] = s3Path + cleanedFileName;

//         // now, we can create our person instance
//         var person = new Person(personObj);

//         person.save(function(err,data){
//           if(err){
//             var error = {
//               status: "ERROR",
//               message: err
//             }
//             return res.json(err)
//           }

//           var jsonData = {
//             status: "OK",
//             person: data
//           }

//           return res.json(jsonData);        
//         })

//       }

//     }); // end of putObject function

//   });// end of read file

// })

// function cleanFileName (filename) {
    
//     // cleans and generates new filename for example userID=abc123 and filename="My Pet Dog.jpg"
//     // will return "abc123_my_pet_dog.jpg"
//     var fileParts = filename.split(".");
    
//     //get the file extension
//     var fileExtension = fileParts[fileParts.length-1]; //get last part of file
    
//     //add time string to make filename a little more random
//     d = new Date();
//     timeStr = d.getTime();
    
//     //name without extension
//     newFileName = fileParts[0];
    
//     return newFilename = timeStr + "_" + fileParts[0].toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_') + "." + fileExtension;
    
// }

// router.get('/api/get', function(req,res){

//   Person.find(function(err,data){

//       if(err){
//         var error = {
//           status: "ERROR",
//           message: err
//         }
//         return res.json(err)
//       }

//       var jsonData = {
//         status: "OK",
//         people: data
//       }

//       return res.json(jsonData);

//   })

// })

// router.get('/api/get/year/:itpYear',function(req,res){

//   var requestedITPYear = req.params.itpYear;

//   console.log(requestedITPYear);

//   Person.find({itpYear:requestedITPYear},function(err,data){
//       if(err){
//         var error = {
//           status: "ERROR",
//           message: err
//         }
//         return res.json(err)
//       }

//       var jsonData = {
//         status: "OK",
//         people: data
//       }

//       return res.json(jsonData);    
//   })

// })

// // year, name
// // /api/get/query?year=2016&name=Sam&hasGlasses=true

// router.get('/api/get/query',function(req,res){

//   console.log(req.query);

//   var searchQuery = {};

//   if(req.query.itpYear){
//     searchQuery['itpYear'] =  req.query.itpYear
//   }

//   if(req.query.name){
//     searchQuery['name'] =  req.query.name
//   }

//   if(req.query.hasGlasses){
//     searchQuery['hasGlasses'] =  req.query.hasGlasses
//   }  

//   Person.find(searchQuery,function(err,data){
//     res.json(data);
//   })

//   // Person.find(searchQuery).sort('-name').exec(function(err,data){
//   //   res.json(data);
//   // })  


// })

});   // THIS IS IMPORTANT


module.exports = router;








