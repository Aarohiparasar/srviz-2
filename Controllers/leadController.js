import Lead from "../Models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, eventId, travellers } = req.body;

    if (!name || !email || !phone || !eventId) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      eventId,
      travellers,
      statusHistory: [{ status: "New" }]
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead
    });
  } catch (error) {
    console.error("Create Lead Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
