const Total = require('../models/totalModel');

exports.createTotal = async (req, res, next) => {
  try {
    const { total , gender } = req.body;
    const newTotal = new Total({ total, gender });
    const savedTotal = await newTotal.save();
    res.status(201).json(savedTotal);
  } catch (error) {
    next(error);
  }
};

exports.getTotalGenderPercentage = async (req, res, next) => {
  try {
    const totals = await Total.find();
    let totalMale = 0;
    let totalFemale = 0;
    totals.forEach((total) => {
      totalMale += total.m_total;
      totalFemale += total.f_total;
    });
    const totalPopulation = totalMale + totalFemale;
    const malePercentage = (totalMale / totalPopulation) * 100;
    const femalePercentage = (totalFemale / totalPopulation) * 100;
    res.status(200).json({ malePercentage, femalePercentage });
  } catch (error) {
    next(error);
  }
};
exports.generateData = async () => {
  try {
    const minValue = 0; // Replace with the minimum value of the desired range
    const maxValue = 100; // Replace with the maximum value of the desired range
    const startHour = 8; // Starting hour (8 AM)
    const endHour = 19; // Ending hour (7 PM)

    for (let hour = startHour; hour <= endHour; hour++) {
      // Generate random values within the specified ranges
      const m_total = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      const f_total = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      const total = m_total + f_total;
      const gender = Math.random() < 0.5 ? 'Male' : 'Female';
      const emotion = Math.random() < 0.5 ? 'satisfied' : 'disatisfied';
      const today = new Date();
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour);

      const newTotal = new Total({
        total,
        m_total,
        f_total,
        gender,
        emotion,
        date,
      });

      await newTotal.save();
    }

    console.log('Data generated successfully!');
  } catch (error) {
    console.error('Error generating data:', error);
  }
};
exports.getTotals = async (req, res, next) => {
  try {
    const totals = await Total.find().sort('-date');
    res.status(200).json(totals);
  } catch (error) {
    next(error);
  }
};
exports.getTotalsHour = async (req, res, next) => {
  try {
    const totals = await Total.aggregate([
      {
        $project: {
          date: 1,
          hour: { $hour: "$date" },
          f_total: 1,
          m_total: 1
        }
      },
      {
        $group: {
          _id: { date: "$date", hour: "$hour" },
          f_total: { $sum: "$f_total" },
          m_total: { $sum: "$m_total" }
        }
      },
      {
        $sort: {
          "_id.date": 1,
          "_id.hour": 1
        }
      }
    ]);

    res.status(200).json(totals);
  } catch (error) {
    next(error);
  }
};
exports.getTotalGender = async (req, res, next) => {
  try {
    const femaleCount = await Total.countDocuments({ gender: 'female' });
    const maleCount = await Total.countDocuments({ gender: 'male' });
    res.status(200).json({ femaleCount, maleCount });
  } catch (error) {
    next(error);
  }
};
/*exports.getEmotions = async (req, res, next) => {
  try {
    const satisfiedCount = await Total.countDocuments({ emotion: 'satisfied' });
    const dissatisfiedCount = await Total.countDocuments({ emotion: 'disatisfied' });

    res.status(200).json({ satisfiedCount, dissatisfiedCount });
  } catch (error) {
    next(error);
  }
};*/
exports.getLatestTotal = async (req, res, next) => {
  try {
    const latestTotal = await Total.findOne().sort({ createdAt: -1 }); // Retrieve the latest document
    const latestTotalValue = latestTotal ? latestTotal.total : 0; // Get the total value or default to 0 if no document found

    res.status(200).json({ latestTotal: latestTotalValue });
  } catch (error) {
    next(error);
  }
};
exports.getEmotions = async (req, res, next) => {
  try {
    const totals = await Total.find();
    let satisfied = 0;
    let dissatisfied = 0;

    totals.forEach((total) => {
      if (total.emotion === 'satisfied') {
        satisfied += total.total;
      } else if (total.emotion === 'disatisfied') {
        dissatisfied += total.total;
      }
    });

    res.status(200).json({ satisfied, dissatisfied});
  } catch (error) {
    next(error);
  }
};