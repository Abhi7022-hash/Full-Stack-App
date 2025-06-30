const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/mydb");

const MsgSchema = new mongoose.Schema({ message: String });
const Msg = mongoose.model('Msg', MsgSchema);

app.get('/api/message', async (req, res) => {
  const msg = await Msg.findOne();
  res.send({ message: msg ? msg.message : "No message yet!" });
});

app.post('/api/message', async (req, res) => {
  await Msg.deleteMany({});
  const msg = new Msg({ message: req.body.message });
  await msg.save();
  res.send({ message: req.body.message });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
