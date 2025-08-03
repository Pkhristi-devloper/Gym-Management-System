import MemberModel from "../Models/Member.js";
import MembershipModel from "../Models/Membership.js";

export const getAllMembers = async (req, res) => {
  try {
    let { limit, skip } = req.query;
    let members = await MemberModel.find({ gym: req.user._id });
    let totalMembers = members.length;

    let limitedMembers = await MemberModel.find({ gym: req.user._id })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      message: totalMembers
        ? "Members fetched successfully"
        : "No any member Registered yet",
      members: limitedMembers,
      totalMembers: totalMembers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Get all members error" + error });
  }
};

let addMonthsToDate = (months, joiningDate) => {
  let today = joiningDate;

  //get the current day, month and year
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  let currentDay = today.getDate();

  //calculate the new month and year
  const futureMonth = currentMonth + months;
  const futureYear = currentYear + Math.floor(futureMonth / 12);

  //calculate the correct future month(modulous by the number of months)
  const adjustedMonth = futureMonth % 12;

  //set the date to the first of the future month
  const futureDate = new Date(futureYear, adjustedMonth, 1);

  //get the last day of future month
  const lastDayOfFutureMonth = new Date(
    futureYear,
    adjustedMonth + 1,
    0
  ).getDate();

  //adjust a day if the current day exceeds the number of days in the new month
  const adjustDay = Math.min(currentDay, lastDayOfFutureMonth);

  //set the final adjusted day
  futureDate.setDate(adjustDay);

  return futureDate;
};

export const registerMember = async (req, res) => {
  try {
    let { name, mobileno, address, membership, profileImg, joiningDate } =
      req.body;
    let member = await MemberModel.findOne({ gym: req.user._id, mobileno });
    if (member) {
      return res
        .status(400)
        .json({ message: "User already registered with this mobile number." });
    }
    let memberShip = await MembershipModel.findOne({
      _id: membership,
      gym: req.user._id,
    });
    // console.log(memberShip)
    let membershipMonth = memberShip.months;
    if (memberShip) {
      let jngDate = new Date(joiningDate);
      let nextBillDate = addMonthsToDate(membershipMonth, jngDate);
      let newMember = new MemberModel({
        name,
        mobileno,
        address,
        membership,
        gym: req.user._id,
        profileImg,
        nextBillDate,
        lastPayment: jngDate,
      });
      await newMember.save();
      return res
        .status(200)
        .json({ message: "Member registered successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Register member internal error : " + error });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Register Member error : " + error });
  }
};

export const searchUser = async (req, res) => {
  try {
    let { searchItem } = req.query;
    let member = await MemberModel.find({
      gym: req.user._id,
      $or: [
        { name: { $regex: "^" + searchItem, $options: "i" } },
        { mobileno: { $regex: "^" + searchItem, $options: "i" } },
      ],
    });
    res.status(200).json({
      message: member.length
        ? "Members fetched successfully."
        : "No such members registered.",
      members: member,
      totalMembers: member.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Search user error : " + error });
  }
};

export const monthlyMembers = async (req, res) => {
  try {
    let now = new Date();

    let startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    // console.log(startOfMonth,endOfMonth)
    let member = await MemberModel.find({
      gym: req.user._id,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).sort({ createdAt: -1 });
    return res.status(200).json({
      message: member.length
        ? "Members fetched successfully."
        : "No such members registered.",
      members: member,
      totalMembers: member.length,
    });
  } catch (error) {}
};

export const expireInThreeDays = async (req, res) => {
  try {
    let today = new Date();
    let nextThreeDays = new Date();

    nextThreeDays.setDate(today.getDate() + 3);
    const member = await MemberModel.find({
      gym: req.user._id,
      nextBillDate: {
        $gte: today,
        $lte: nextThreeDays,
      },
    });

    return res.status(200).json({
      message: member.length
        ? "Fetched members successfully"
        : "No such member is expiring in three days",
      members: member,
      totalMembers: member.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Expire in Three days error : " + error });
  }
};

export const expireIn4to7Days = async (req, res) => {
  try {
    let today = new Date();
    let next4Days = new Date();
    let next7Days = new Date();

    next4Days.setDate(today.getDate() + 4);
    next7Days.setDate(today.getDate() + 7);
    const member = await MemberModel.find({
      gym: req.user._id,
      nextBillDate: {
        $gte: next4Days,
        $lte: next7Days,
      },
    });

    return res.status(200).json({
      message: member.length
        ? "Fetched members successfully"
        : "No such member is expiring in three days",
      members: member,
      totalMembers: member.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Expire in Three days error : " + error });
  }
};

export const expiredMembers = async (req, res) => {
  try {
    let today = new Date();
    let member = await MemberModel.find({
      gym: req.user._id,
      status: "Active",
      nextBillDate: {
        $lt: today,
      },
    });
    return res.status(200).json({
      message: member.length
        ? "Members fetched successfully"
        : "No such member is expired",
      members: member,
      totalMembers: member.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Expired member error : " + error,
    });
  }
};

export const inActiveMembers = async (req, res) => {
  try {
    let member = await MemberModel.find({
      gym: req.user._id,
      status: "Pending",
    });
    return res.status(200).json({
      message: member.length
        ? "Members fetched successfully"
        : "No such member is expired",
      members: member,
      totalMembers: member.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Expired member error : " + error,
    });
  }
};

export const getMemberDetails = async (req, res) => {
  try {
    let { id } = req.params;
    let member = await MemberModel.findOne({ _id: id, gym: req.user._id });
    if (!member) {
      return res.status(400).json({ message: "No member exists..!!" });
    }
    return res.status(200).json({
      message: "Member data fetched",
      member: member,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Get Member details error : " + error });
  }
};

export const changeStatus = async (req, res) => {
  try {
    let { id } = req.params;
    let { status } = req.body;
    let member = await MemberModel.findOne({ _id: id, gym: req.user._id });
    if (!member) {
      return res.status(400).json({ message: "No member exist.!" });
    }
    member.status = status;
    await member.save();
    return res
      .status(200)
      .json({ message: "Status changed successfuly.", member: member });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Change status error..! : " + error });
  }
};

export const membershipPlan = async (req, res) => {
  try {
    let { membership } = req.body;
    let { id } = req.params;
    let memberShip = await MembershipModel.findOne({
      gym: req.user._id,
      _id: membership,
    });
    if (!memberShip) {
      return res
        .status(400)
        .json({ message: "No such membership are there..!!" });
    }
    let getMonth = memberShip.months;
    let today = new Date();
    let nextBillDate = addMonthsToDate(getMonth, today);
    let member = await MemberModel.findOne({ gym: req.user._id, _id: id });
    if (!member) {
      return res.status(400).json({ message: "No such members are there" });
    }
    member.nextBillDate = nextBillDate;
    member.lastPayment = today;

    await member.save();
    res.status(200).json({ message: "Member Renewed Successfully..!!" });
    
  } catch (error) {
    return res.status(500).json({ message: "No such Membership available" });
  }
};
