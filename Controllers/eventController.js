import { EventModel } from "../Models/eventModel.js";

// ------------------ CREATE EVENT ------------------
export const createEvent = async (req, res) => {
  try {
    const { title, date, location,description} = req.body;

    if (!title || !date || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = await EventModel.create({ title, date, location,description });

    return res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ------------------ GET ALL EVENTS ------------------
export const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find();

    return res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
