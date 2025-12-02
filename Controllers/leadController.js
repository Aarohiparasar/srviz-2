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

export const getLeads = async (req, res) => {
  try {
    const { status, event, month, page = 1, limit = 10 } = req.query;

    const filters = {};

    // Filter by status
    if (status) {
      filters.status = status;
    }

    // Filter by eventId
    if (event) {
      filters.eventId = event;
    }

    // Filter by month (based on createdAt)
    if (month) {
      filters.$expr = {
        $eq: [{ $month: "$createdAt" }, Number(month)],
      };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const leads = await Lead.find(filters)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Lead.countDocuments(filters);

    return res.status(200).json({
      message: "Leads fetched successfully",
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalLeads: total,
      leads,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//----------- update lead status---------
const allowedFlow = {
  "New": ["Contacted"],
  "Contacted": ["Quote Sent"],
  "Quote Sent": ["Interested", "Closed Won", "Closed Lost"],
  "Interested": ["Closed Won", "Closed Lost"],
  "Closed Won": [],
  "Closed Lost": []
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status || !allowedFlow[status]) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    // Fetch lead
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const currentStatus = lead.status;

    // Check if the transition is allowed
    const allowedNextStatuses = allowedFlow[currentStatus];

    if (!allowedNextStatuses.includes(status)) {
      return res.status(400).json({
        message: `Illegal status transition: ${currentStatus} → ${status}`
      });
    }

    // Update status
    lead.status = status;

    // Push into history
    lead.statusHistory.push({
      status,
      timestamp: new Date()
    });

    await lead.save();

    return res.status(200).json({
      message: "Lead status updated successfully",
      lead
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
