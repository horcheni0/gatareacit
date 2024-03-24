const Camera = require('../models/cameraModel');
const mongoose = require('mongoose')

const axios = require('axios');

/*const cameraController = {
  createCamera: async (req, res) => {
    try {
      const { name, ipAddress, location } = req.body;

      // Create a new camera instance
      const camera = new Camera({
        name,
        ipAddress,
        location
      });

      // Save the camera to the database
      const savedCamera = await camera.save();

      res.status(201).json(savedCamera);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create camera' });
    }
  },

  getCameraById: async (req, res) => {
    try {
      const { cameraId } = req.params;

      // Find the camera by ID
      const camera = await Camera.findById(cameraId);

      if (!camera) {
        return res.status(404).json({ error: 'Camera not found' });
      }

      res.json(camera);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get camera' });
    }
  },

  getAllCameras: async (req, res) => {
    try {
      // Retrieve all cameras from the database
      const cameras = await Camera.find();

      res.json(cameras);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get cameras' });
    }
  },

  updateCameraById: async (req, res) => {
    try {
      const { cameraId } = req.params;
      const { name, ipAddress, location } = req.body;

      // Find the camera by ID and update its details
      const updatedCamera = await Camera.findByIdAndUpdate(
        cameraId,
        { name, ipAddress, location },
        { new: true }
      );

      if (!updatedCamera) {
        return res.status(404).json({ error: 'Camera not found' });
      }

      res.json(updatedCamera);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update camera' });
    }
  },

  deleteCameraById: async (req, res) => {
    try {
      const { cameraId } = req.params;

      // Find the camera by ID and delete it
      const deletedCamera = await Camera.findByIdAndDelete(cameraId);

      if (!deletedCamera) {
        return res.status(404).json({ error: 'Camera not found' });
      }

      res.json(deletedCamera);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete camera' });
    }
  },

  getCameraFeed: async (req, res) => {
    try {
      const { cameraId } = req.params;

      // Find the camera by ID
      const camera = await Camera.findById(cameraId);

      if (!camera) {
        return res.status(404).json({ error: 'Camera not found' });
      }

      // Make a request to the camera's IP address to retrieve the camera feed
      const response = await axios.get(`http://${camera.ipAddress}/camera-feed`);

      // Return the camera feed data
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch camera feed' });
    }
  }
};*/
const getCameraFeed = async (req, res) => {
  try {
    const videoUrl = 'http://172.16.99.255:8080/browserfs.html';
    res.json({ videoUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video stream' });
  }
};

  const createCamera = async (req, res) => {
    try {
      const { name, ipAddress, location } = req.body;

      // Create a new camera instance
      const camera = new Camera({
        name,
        ipAddress,
        location
      });

      // Save the camera to the database
      const savedCamera = await camera.save();

      res.status(201).json(savedCamera);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create camera' });
    }
  }

module.exports = {getCameraFeed ,createCamera};
