const mongoose = require("mongoose");
const User = require("../models/User");
const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");

const initializeData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb://localhost:27017/college-appointment-system"
    );
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Availability.deleteMany({});
    await Appointment.deleteMany({});
    console.log("Cleared existing data");

    // Add users
    const professor = await User.create({
      name: "Professor John Doe",
      email: "john.doe@university.com",
      password: "password123", // Will be hashed by pre-save middleware
      role: "professor",
    });

    const student1 = await User.create({
      name: "Student Jane Smith",
      email: "jane.smith@student.com",
      password: "password123", // Will be hashed by pre-save middleware
      role: "student",
    });

    const student2 = await User.create({
      name: "Student John Cena",
      email: "john.cena@student.com",
      password: "password123",
      role: "student",
    });

    console.log("Added users:", professor, student1, student2);

    // Add availability slots
    const availability1 = await Availability.create({
      professor: professor._id,
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      date: "2025-01-10",
      day: "Friday",
    });

    const availability2 = await Availability.create({
      professor: professor._id,
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      date: "2025-01-11",
      day: "Saturday",
    });

    console.log("Added availability slots:", availability1, availability2);

    // Add appointments
    const appointment1 = await Appointment.create({
      professor: professor._id,
      student: student1._id,
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      date: "2025-01-10",
      day: "Friday",
      status: "booked",
    });

    const appointment2 = await Appointment.create({
      professor: professor._id,
      student: student2._id,
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      date: "2025-01-11",
      day: "Saturday",
      status: "booked",
    });

    console.log("Added appointments:", appointment1, appointment2);

    console.log("Dummy data initialized successfully!");
    process.exit(0); // Exit the process after seeding
  } catch (error) {
    console.error("Error initializing data:", error);
    process.exit(1); // Exit the process with failure
  }
};

initializeData();
