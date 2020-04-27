const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const UserLogin = require("../models/logins");
const UserLocation = require("../models/locations");
const config = require("../config");

// users hardcoded for simplicity, store in a db for production applications
async function authenticate({ username, password }) {
  try {
    const user = await UserLogin.findOne(
      { username, password }
    );
    if(!user)
    {
      return null;
    }
    const token = jwt.sign(
      { sub: user.username },
      config.jwtSecret
    );
    const userDetails = await Users.findOne({username});
    return {
      userId: userDetails._id,
      username: user.username,
      areaId: userDetails.area_id,
      homeCoordinatesLat: userDetails.homeCoordinatesLat,
      homeCoordinatesLong: userDetails.homeCoordinatesLong,
      token,
      isRequester: userDetails.role_type.indexOf("Requester") !== -1,
      isVolunteer: userDetails.role_type.indexOf("Volunteer") !== -1,
    };
  } catch (error) {
    return {
      error
    };
  }
}

async function registerUser({ username, password, age,fname,lname,phone,email,security_question, secAnswer, address,city,pin,roles,gender, homeCoordinatesLat,homeCoordinatesLong, area}) {
  try {
    const existingUser = await UserLogin.find({ username }, "username password");
    if (existingUser.length > 0) {
      return {
        message: "We already have an existing user with this username."
      };
    }
   
    const newUser = new Users({
      fname,
      lname,
      username,
      email,
      phone,
      role_type: roles,
      age,
      gender,
      address,
      pin: pin,
      homeCoordinatesLat: homeCoordinatesLat,
      homeCoordinatesLong: homeCoordinatesLong,
      area_id: area._id
    });
    
    await newUser.save();

    const newRegUser = await Users.find({username}, "username password");
    //need to update the user id in userlogin
    const userLogin = new UserLogin({
      username,
      password,
      security_question,
      secAnswer
    });    
    await userLogin.save();
    return await authenticate({username, password})
  } catch (error) {
    return {
      error
    };
  }
}

module.exports = {
  authenticate,
  registerUser
};
