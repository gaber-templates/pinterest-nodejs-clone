const express = require("express"); //framewok express para node.js
const path = require("path"); //modulo para saber nuetra direccion
const app = express(); //funcion express
const morgan = require("morgan"); //musetra informacion de un peticion http
const multer = require("multer"); //modulo para la subida de imagenes
const { v4: uuidv4 } = require("uuid");
const database = require("./database");
const { format } = require("timeago.js"); ///formatear la fecha
const { constants } = require("buffer");
//Initializations
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Mindlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  //funcion que se ejecutara cuando se suba y guarde una imagen
  destination: path.join(__dirname, "public/img/uploads/"),
  filename: (req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname)); //concatenamos el id + la extension del archivo con extanme
  },
});

// multer({ dest: path.join(__dirname, "public/img/uploads") }).single(
//aqui multer ahora guarda con un id u su extension
app.use(
  multer({
    storage: storage,
  }).single("image")
);

//global variables(mindelwares) timeago
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});
//Routes app.use(require("./routes/index")); Sstatic files app.use(express.static(path.join(__dirname, "public"))); Start server app.listen(app.get("port"), () => { console.log(`Server on port ${app.get("port")} `); });
