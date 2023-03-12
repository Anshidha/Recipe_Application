const express = require("express");
const RecipeInfo = require('./model/RecipeDB');
// const multer = require('multer');
// const fs = require('fs')
const path = require('path');



const app = new express();

app.use(express.urlencoded({extended: true}));
 app.use(express.json());
 app.use(express.static(path.join(__dirname,'/build')));


 app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers","X-Requested-Width,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

// Storage
    // const Storage = multer.diskStorage({
    //     destination:(req,file,cb) => {
    //         cb(null, 'uploads');
    //     },
    //     filename: (req,file,cb)=>{
    //         cb(null,req.file.originalname)
    //     }
    // });

    // const upload = multer({
    //     storage:Storage
    // })

    // app.post('/',upload.single("testImage"),(req,res)=>{
       
    //             const saveImage = new RecipeInfo({
    //                 r_image : {
    //                     data:fs.readFileSync('uploads/'+ req.file.filename),
    //                     contentType:'image/png'
    //                 },
    //                 r_title: req.body.r_title,
    //                   r_duration : req.body.r_duration,
    //                 r_servings : req.body.r_servings  
    //             })
    //             saveImage.save()
    //             .then((res)=>{
    //                 console.log('successfullt uploaded');
    //             })
    //                 .catch((err)=>{
    //                     console.log(err,"error has occured");
    //                 });
    //                 res.send('image is saved')
    //         }
    //     );
    

 // Create 
    app.post('/api/create',(req,res)=>{
        try{
            console.log(req.body); //server data
            let recipe = new RecipeInfo(req.body); // passing the data to db
            recipe.save();// saving to db
            res.send("Data Added");
        }
        catch(error){
            res.status(500).send(error);
        }
    }); 

    // Read
    app.get('/api/view',async (req,res) => {
        try{
            let result = await RecipeInfo.find();
            res.json(result);
        }
        catch(error){
            res.status(500).send(error);
        }
    })
     

    // Update
    app.post('/api/update',  async (req,res) => {
        try{
            let result =  await RecipeInfo.findByIdAndUpdate(req.body._id, req.body);
            res.send("Data Updated");
        }
        catch(error){
            res.status(500).send(error);
        }
    })
    

    // Delete
    app.post('/api/delete', async (req,res) => {
        try{
           await RecipeInfo.findByIdAndDelete(req.body._id);
            res.send("Data Deleted");
        }
        catch(error){
            res.status(500).send(error);
        }
    })

    app.get('/*',function (req,res){
        res.sendFile(path.join(__dirname,'/build/index.html'));
    })

    // Search
    // app.post('/api/search', async (req,res) => {
    //     try{
    //         let result = await RecipeInfo.find(req.body);
    //         // let result = await CourseInfo.find({"cName": {$regex: '.*' + req.body.cName + '.*'}}); // regular expression
    //         res.json(result);
    //     }catch(error){
    //         res.status(500).send(error);
    //     }
    // })

    //  app.get('/server',(req,res) => {
    //     res.send("Congratulations!! Server is UP.")
    //  });

    app.listen(7000, () => {
        console.log("server is running in port 7000");
     }) 
