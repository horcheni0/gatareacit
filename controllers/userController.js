const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require ('validator')
const bcrypt = require ('bcrypt')
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}
const getTechHelp = async (req, res) => {
  try {
    const role1 = 'tech';
    const role2 = 'help_desk';

    const users = await User.find({ role: { $in: [role1, role2] } });

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'No users found with the specified roles' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// login user 
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    // create token 
    const role = user.role
    const id = user._id
    const token = createToken(user._id)
    res.status(200).json({ email, token,id,role })  
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// signup user
const signupUser = async (req, res) => {
  const { firstname, lastname, email, role, password } = req.body   
  try {
    const user = await User.signup(firstname, lastname, email, role, password)
    const token = createToken(user._id)
    res.status(200).json({ firstname, lastname, email, role, password, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get users
const getUsers = async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
}
// get users by email
const getUsersByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email: email })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new Error('User ID is required');
    }
    const userProfile = await User.getUserProfile(userId);
    res.json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error finding user');
  }
}
const changeUserProfile = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    const userId = req.params.userId;
    const updatedProfile = await User.changeUserProfile(userId, { firstname, lastname, email });
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update user profile" });
  }
};
const getUserByName = async (req, res) => {
  const { name, firstname } = req.params;
  const query = {};
  if (name) {
    query["$or"] = [
      { name: { $regex: name, $options: "i" } },
      { firstname: { $regex: name, $options: "i" } },
    ];
  } else if (firstname) {
    query.firstname = { $regex: firstname, $options: "i" };
  } else {
    return res.status(400).json({ message: 'Invalid request' });
  }
  try {
    const user = await User.findOne(query);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/*
// Réinitialisation du mot de passe
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    // Vérifier si l'e-mail existe dans la base de données
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Générer un nouveau hash pour le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    // Mettre à jour le mot de passe de l'utilisateur
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during password reset' });
  }
};*/
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate a new hash for the new password
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during password reset' });
  }
};

module.exports = { getTechHelp,loginUser, signupUser ,resetPassword,changeUserProfile, getUsers , getUsersByEmail,getUserProfile,getUserByName }
