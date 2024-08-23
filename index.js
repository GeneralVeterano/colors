const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/colores', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const colorSchema = new mongoose.Schema({
  nombre: String,
  hex: String,
});

const Color = mongoose.model('Color', colorSchema);

app.get('/colores', async (req, res) => {
  const colores = await Color.find();
  res.json(colores);
});

app.post('/colores', async (req, res) => {
  const { nombre, hex } = req.body;
  const nuevoColor = new Color({ nombre, hex });
  await nuevoColor.save();
  res.json(nuevoColor);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
