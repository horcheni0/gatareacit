require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/user');

const totalRoutes = require('./routes/total');
const msgRoutes = require('./routes/msgAdmin');
const msg = require('./routes/msg');

const { generateData } = require('./controllers/totalController');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/events', eventRoutes);
app.use('/api/user', userRoutes);

app.use('/api/total', totalRoutes);
app.use('/api/chatify', msg);
app.use('/api/msg', msgRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    setInterval(() => {/*
      generateData()
        .then(data => {
          console.log('Data generated:', data);
        })
        .catch(error => {
          console.error('Error generating data:', error);
        });*/
      
    }, 6000);

    server.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT);
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });
