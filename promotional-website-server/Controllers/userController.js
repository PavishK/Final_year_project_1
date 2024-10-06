const generateToken = require("../Config/generateToken");
const UserModel = require("../modals/userModel");
const expressAsyncHandler = require("express-async-handler");
// Login
const loginController = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;

  const user = await UserModel.findOne({ name });

  console.log("fetched user Data", user);
  console.log(await user.matchPassword(password));
  if (user && (await user.matchPassword(password))) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isadmin: user.isadmin,
      fullname:user.fullname,
      location:user.location,
      phno:user.phno,
      token: generateToken(user._id),
    };
    console.log(response);
    res.json(response);
  } else {
    res.status(401);
    throw new Error("Invalid UserName or Password");
  }
});

// Registration
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check for all fields
  if (!name || !email || !password) {
    res.send(400);
    throw Error("All necessary input fields have not been filled");
  }

  // pre-existing user
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.send(405);
    throw new Error("User already Exists");
  }

  // userName already Taken
  const userNameExist = await UserModel.findOne({ name });
  if (userNameExist) {
    res.send(406);
    throw new Error("UserName already taken");
  }

  // create an entry in the db
  const user = await UserModel.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isadmin: user.isadmin,
      fullname:user.fullname,
      location:user.location,
      phno:user.phno,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration Error");
  }
});

const updateUserData=expressAsyncHandler(async(req,res)=>{
  const id=req.params.id;
  try{
    const user=await UserModel.findById(id);
    if(!user){
      return res.status(404).json({message:"User Not Found"});
    }
    const data=req.body;
    const updatedUser=await UserModel.findByIdAndUpdate(id, data, {new:true});
    res.status(200).json({message:"Profile updated",data:updatedUser});
  }
  catch(err){
    return res.status(500).json({message:err.message});
  }
})


const findUserAndUpdate=expressAsyncHandler(async(req,res)=>{
    const id=req.params.id;
    try{
      const user=await UserModel.findById(id);
      if(!user){
        return res.status(404).json({message:"User Not Found"});
    }
    res.json(user);
  }
  catch(err){
    return res.status(500).json({message:err.message});
  }
});

const updatePassword = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  console.log("Id -> ", id, " Password -> ", currentPassword, " New Password ->", newPassword);
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password!" });
    }

    user.password = newPassword;
    await user.save();
    console.log("Password updated!");
    return res.status(200).json({ message: "Password updated", data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


// const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};

//   const users = await UserModel.find(keyword).find({
//     _id: { $ne: req.user._id },
//   });
//   res.send(users);
// });

module.exports = {
  loginController,
  registerController,
  updateUserData,
  findUserAndUpdate,
  updatePassword,
  // fetchAllUsersController,
};
