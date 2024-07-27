const express = require("express");
const mongoose = require("mongoose");
const infoPageRoutes = require("./routes/infoPageRoutes");
const userRoutes = require("./routes/userRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const app = express();

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static("/public"));

// register view engine
app.set("view engine", "ejs");
const dbURL =
  "mongodb+srv://rbale0831:rohit3108@cluster0.dzwxs.mongodb.net/partial";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(9000);
    console.log("Listening on Port 9000 ");
  })
  .catch((error) => console.log(error));

const static_path = path.join(__dirname, "./views");

app.use(express.static(static_path));

// Normal Routes
app.get("/", (req, res) => {
  res.redirect("/home");
});

global.appRoot = path.resolve(__dirname);
// info_page Routes
app.use("/home", infoPageRoutes);
app.use("/user", userAuth, userRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/admin", adminRoutes);

app.get('/index1' , (req, res)=>{
    res.render('index1')

})

// multer   uploading files checking 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
  
const upload = multer({ storage: storage })
const multipleUpload = upload.fields([{ name: 'file1' }, { name: 'file2', maxCount: 3 }])

app.post("/uploadfile" , multipleUpload , (req, res , next )=>{
    if(req.files){
        console.log("files uploaded")
        console.log(req.files)
        res.location('/home')
    }
    else {
        
          res.redirect('/home');
      
    }
})
app.put("/uploadfile" , multipleUpload , (req, res , next )=>{
    if(req.files){
        console.log("files uploaded")
        console.log(req.files)
        
    }
    else {
        
          res.redirect('/home');
      
    }
})
// app.get('/exp_Profile_File_Upload', upload.single)


app.get("*", (req, res) => {
  res.status(404).render("404page", { title: "404 Page" });
});
