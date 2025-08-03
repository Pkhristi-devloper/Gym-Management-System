import MembershipModel from "../Models/Membership.js";

export const addMembership = async (req, res) => {
  try {
    let { months, price } = req.body;
    let memership = await MembershipModel.findOne({
      gym: req.user._id,
      months,
    });

    if (memership) {
      memership.price = price;
      await memership.save();
      return res
        .status(200)
        .json({ message: "Updated membership successfully" });
    } else {
      let newMembership = new MembershipModel({
        price,
        months,
        gym: req.user._id,
      });
      await newMembership.save();
      return res
        .status(201)
        .json({ message: "New membership added successfully...!!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Add membership error : " + error });
  }
};

export const getMembership = async (req, res) => {
  try {
    let loggedInUser = req.user._id;
    let membership = await MembershipModel.find({gym: loggedInUser});
    // console.log(loggedInUser);
    return res.status(200).json({
      message: "Membership get successfully..!!",
      membership: membership,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Get membership error..!!" + error });
  }
};