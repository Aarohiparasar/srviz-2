import { PackageModel } from "../Models/packageModel.js";
import { EventModel } from "../Models/eventModel.js";

export const getPackagesByEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if event exists
    const event = await EventModel.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Get packages for that event
    const packages = await PackageModel.find({ eventId: id });

    return res.status(200).json({
      event,
      packages,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
