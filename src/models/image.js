const { Schema, model } = require("mongoose");
//creando el modelo de la base de datos
const imageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  path: { type: String },
  originalname: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  created_at: { type: Date, default: Date.now() },
});

module.exports = model("Image", imageSchema); //exportamos el modelo
