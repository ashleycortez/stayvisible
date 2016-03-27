var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// our db models
var Person = require("../models/person.js");


// S3 File dependencies
var AWS = require('aws-sdk');
var awsBucketName = process.env.AWS_BUCKET_NAME;
var s3Path = process.env.AWS_S3_PATH; // TODO - we shouldn't hard code the path, but get a temp URL dynamically using aws-sdk's getObject
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
var s3 = new AWS.S3();

// file processing dependencies
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {

  console.log('home page requested!');

  var jsonData = {
  	'name': 'voter-info',
  	'api-status':'OK'
  }

  // respond with json data
  //res.json(jsonData)

  // respond by redirecting
  //res.redirect('/directory')

  // respond with html
  //testing - res.render('registerhome.html')
  res.render('registerhome.html')

});

router.get('/aboutme', function(req,res){

  res.render('aboutme.html')

})

router.get('/new-registration', function(req,res){

  res.render('new-registration.html')

})

router.get('/edit-form', function(req,res){

  res.render('edit-form.html')

})

router.get('/registrationcomplete', function(req,res){

  res.render('registrationcomplete.html')

})

router.get('/render-form', function(req,res){

  res.render('render-form.html')

})

router.get('/updateaddress', function(req,res){

  res.render('updateaddress.html')

})

router.get('/updatename', function(req,res){

  res.render('updatename.html')

})


router.get('/edit/:id', function(req,res){

  var requestedId = req.params.id;

  Person.findById(requestedId,function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }

    console.log(data); 

    var viewData = {
      pageTitle: "Edit " + data.name,
      person: data
    }

    res.render('edit-form.html',viewData);

  })

})

router.get('/edit/:id', function(req,res){

  var requestedId = req.params.id;

  Person.findById(requestedId,function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }

    var viewData = {
      status: "OK",
      person: data
    }

    return res.render('edit-form.html',viewData);
  })

})


router.post('/api/create', function(req,res){

  console.log(req.body);

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

  var person = new Person(personObj);

  person.save(function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }

    var jsonData = {
      status: "OK",
      person: data
    }

    return res.json(jsonData);

  })

})

router.post('/api/edit/:id', function(req,res){

  console.log(req.body);
  var requestedId = req.params.id;

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
  console.log(personObj);

  Person.findByIdAndUpdate(requestedId,personObj,function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(error)
    }

    var jsonData = {
      status: "OK",
      person: data
    }

    //return res.json(jsonData);

    return res.redirect('/render-form');

  })

})

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
    
    // Put the above Object in the Bucket
    s3bucket.putObject(params, function(err, data) {
      if (err) {
        console.log(err)
        return;
      } else {
        console.log("Successfully uploaded data to s3 bucket");

        // now that we have the image
        // we can add the s3 url our person object from above
        personObj['imageUrl'] = s3Path + cleanedFileName;

        // now, we can create our person instance
        var person = new Person(personObj);

        person.save(function(err,data){
          if(err){
            var error = {
              status: "ERROR",
              message: err
            }
            return res.json(err)
          }

          var jsonData = {
            status: "OK",
            person: data
          }

          return res.json(jsonData);        
        })

      }

    }); // end of putObject function

  });// end of read file

})

function cleanFileName (filename) {
    
    // cleans and generates new filename for example userID=abc123 and filename="My Pet Dog.jpg"
    // will return "abc123_my_pet_dog.jpg"
    var fileParts = filename.split(".");
    
    //get the file extension
    var fileExtension = fileParts[fileParts.length-1]; //get last part of file
    
    //add time string to make filename a little more random
    d = new Date();
    timeStr = d.getTime();
    
    //name without extension
    newFileName = fileParts[0];
    
    return newFilename = timeStr + "_" + fileParts[0].toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_') + "." + fileExtension;
    
}

router.get('/api/get', function(req,res){

  Person.find(function(err,data){

      if(err){
        var error = {
          status: "ERROR",
          message: err
        }
        return res.json(err)
      }

      var jsonData = {
        status: "OK",
        people: data
      }

      return res.json(jsonData);

  })

})

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



module.exports = router;







