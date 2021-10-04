const { Router } = require("express");
const { unlink } = require("fs-extra");
const router = Router();
const Image = require("../models/image"); //recibimos el mnuevo modelo
router.get("/", async (req, res) => {
  const images = await Image.find();
  console.log(images);
  res.render("index", { images: images });
});

router.get("/upload", (req, res) => {
  res.render("upload.ejs");
});
router.post("/upload", async (req, res) => {
  const newImage = new Image(); //utilizando una instancia del modelo
  newImage.title = req.body.title; //guardamos em titulo
  newImage.description = req.body.description;
  newImage.filename = req.file.filename;
  newImage.path = "/img/uploads/" + req.file.filename;
  newImage.originalname = req.file.originalname;
  newImage.mimetype = req.file.mimetype;
  newImage.size = req.file.size;
  await newImage.save();
  res.redirect("/");
});

router.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);

  res.render("profile", { image: image });
});

router.get("/image/:id/delete", async (req, res) => {
  const { id } = req.params;
  await Image.findOneAndDelete(id);
  unlink(path.resolve("./src/public"));
});
//este es un cambio

//este es un segundocambio xd
module.exports = router;
