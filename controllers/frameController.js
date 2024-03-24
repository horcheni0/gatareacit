const Frame = require('../models/frameModel')
// get all frames
const getFrames = async (req, res) => {
  const events = await Frame.find({})
  res.status(200).json(events)
}
const generateFrame = async () => {
  const faker = require('faker');
  const moment = require('moment');

  // Generate fake data for other fields
  const total = 10; // Example value, change it to your desired total
  const location = 'Riyeda';
  const channel = 'face';
  const trigger = 'face';
  const date = moment('2023-05-17T08:00:00Z');
  const type = 'Coss-in';
  const classification = faker.random.arrayElement(['male', 'female']);
  const snapshot = 'https://uploads-ssl.webflow.com/624ac40503a5277051af4162/62b989bcf985656e8c8e4542_human-detection-in-computer-vision.png';

  try {
    const frame = await Frame.create({ location, channel, trigger, date, type, classification, snapshot, total });
    console.log('Frame generated:', frame);
  } catch (error) {
    console.error('Error generating frame:', error);
  }
};

generateFrame();

/*
const createFrame = async (req, res) => {
  const {location,date,type,snapshot,total,channel,classification,trigger} = req.body

  let emptyFields = []

  if (!location) {
    emptyFields.push('location')
  }
  if (!date) {
    emptyFields.push('date')
  }
  if (!snapshot) {
    emptyFields.push('snapshot')
  }
  if (!type) {
    emptyFields.push('type')
  }
  if (!classification) {
    emptyFields.push('classification')
  }
  if (!channel) {
    emptyFields.push('channel')
  }
  if (!trigger) {
    emptyFields.push('trigger')
  }
  if (!total) {
    emptyFields.push('total')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {

    const frame = await Frame.create({ location,channel,date,total,trigger,classification,type,snapshot })
     res.status(200).json(frame)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}*/
const searchFrames = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res.status(400).json({ error: "Search term is required" });
    }
    const regex = new RegExp(search, "i");
    const query = {
      $or: [
        { location: regex },
        { channel: regex },
        { trigger: regex },
        { type: regex },
        { classification: regex },
        { snapshot: regex },
      ],
    };
    const frames = await Frame.find(query);
    if (frames.length === 0) {
      return res.status(404).json({ error: "No frames found" });
    }
    res.status(200).json(frames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFramesPagination = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const count = await Frame.countDocuments();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const frames = await Frame.find()
    .sort({ date: 'desc' })
    .skip(startIndex)
    .limit(limit);

  if (frames.length === 0) {
    return res.status(404).json({ message: 'No frames to display on this page.' });
  }

  res.status(200).json({
    frames,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
  });
};


module.exports = {
  getFrames,
  generateFrame,
  searchFrames,
  getFramesPagination
}