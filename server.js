/*require('dotenv').config()
const http = require('http');
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const eventRoutes = require('./routes/events')
const userRoutes = require('./routes/user')
const frameRoutes = require('./routes/frames')
const totalRoutes = require('./routes/total')
const cameraRoutes = require('./routes/camera')
const msgRoutes = require('./routes/msgAdmin')
const Message = require("./models/messageModel");
const friendRoutes = require("./routes/friend");
//generate fake data
const { generateFrame } = require('./controllers/frameController');
const {generateData} = require('./controllers/totalController')

//const ws = require('ws')
const cors = require('cors')
// express app
const app = express()
const server = http.createServer(app);
const socketIo = require("socket.io");

app.use(cors())
// middleware
app.use(express.json())

// set the maximum payload size to 50mb
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
// routes
app.use('/api/events', eventRoutes)
app.use('/api/camera', cameraRoutes)
app.use('/api/user', userRoutes)
app.use('/api/frames', frameRoutes)
app.use('/api/total', totalRoutes)
app.use('/api/msg', msgRoutes)
app.use('/api/friend', friendRoutes)
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Call generateFrame function to generate a frame
    /*setInterval(() => {
     generateFrame()
      //generateData()
        .then(frame => {
          console.log('Frame generated:', frame);
        })
        .catch(error => {
          console.error('Error generating frame:', error);
        });
    }, 6000);/// 60000 milliseconds = 1 minute
    
    // Start the server
    server.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT);
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });
  */
  require('dotenv').config();
  const http = require('http');
  const express = require('express');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const eventRoutes = require('./routes/events');
  const userRoutes = require('./routes/user');
  const frameRoutes = require('./routes/frames');
  const totalRoutes = require('./routes/total');
  const cameraRoutes = require('./routes/camera');
  const msgRoutes = require('./routes/msgAdmin');
  const msg = require ('./routes/msg');
  //const chatRoutes = require("./routes/messages");
  const { generateFrame } = require('./controllers/frameController');
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
  })
  app.use('/api/events', eventRoutes);
  app.use('/api/camera', cameraRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/frames', frameRoutes);
  app.use('/api/total', totalRoutes);
  //app.use('/api/chat',chatRoutes);
  app.use('/api/chatify', msg);
  app.use('/api/msg', msgRoutes);
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      setInterval(() => {
        /*generateData()
        .then(data => {
          console.log('Data generated:', data);
        })
        .catch(error => {
          console.error('Error generating data:', error);
        });
        /*generateFrame()
          .then(frame => {
            console.log('Frame generated:', frame);
          })
          .catch(error => {
            console.error('Error generating frame:', error);
          });*/
      }, 6000);
  
      server.listen(process.env.PORT, () => {
        console.log('listening for requests on port', process.env.PORT);
      });
    })
    .catch(error => {
      console.error('Failed to connect to MongoDB:', error);
    });
  