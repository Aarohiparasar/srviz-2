import Lead from "../Models/Lead.js";
import {PackageModel} from "../Models/packageModel.js";
import { EventModel } from "../Models/eventModel.js";
import Quote from "../Models/quoteModel.js"

export const generateQuote = async (req, res) => {
  try {
    const { leadId, packageId } = req.body;

    if (!leadId || !packageId) {
      return res.status(400).json({ message: "leadId and packageId are required" });
    }

    // 1️⃣ Fetch Lead
    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    // 2️⃣ Fetch Package
    const pkg = await PackageModel.findById(packageId);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    // 3️⃣ Fetch Event
    const event = await EventModel.findById(lead.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // =============== PRICING LOGIC ===================
    let basePrice = pkg.price;
    let seasonal = 0;
    let earlyBird = 0;
    let lastMinute = 0;
    let group = 0;
    let weekend = 0;

    const eventDate = new Date(event.date);
    const today = new Date();
    const month = eventDate.getMonth() + 1;

    // 2️⃣ Seasonal Multiplier
    if ([6, 7, 12].includes(month)) seasonal = basePrice * 0.20;
    else if ([4, 5, 9].includes(month)) seasonal = basePrice * 0.10;

    // 3️⃣ Early Bird Discount (120 days before)
    const daysBefore = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    if (daysBefore >= 120) earlyBird = basePrice * -0.10;

    // 4️⃣ Last-minute surcharge (<15 days)
    if (daysBefore < 15) lastMinute = basePrice * 0.25;

    // 5️⃣ Group Discount (>=4 travellers)
    if (lead.travellers >= 4) group = basePrice * -0.08;

    // 6️⃣ Weekend surcharge (if event falls on Sat or Sun)
    const eventDay = eventDate.getDay(); // 0=Sun, 6=Sat
    if (eventDay === 0 || eventDay === 6) weekend = basePrice * 0.08;

    const finalPrice =
      basePrice +
      seasonal +
      earlyBird +
      lastMinute +
      group +
      weekend;

    // ================== SAVE QUOTE ===================
    const quote = await Quote.create({
      leadId,
      packageId,
      basePrice,
      adjustments: {
        seasonal,
        earlyBird,
        lastMinute,
        group,
        weekend,
      },
      finalPrice,
    });

    // ========== Auto Update Lead Status ==========
    lead.status = "Quote Sent";
    lead.statusHistory.push({ status: "Quote Sent" });
    await lead.save();

    return res.status(201).json({
      message: "Quote generated successfully",
      quoteId: quote._id,
      pricing: {
        basePrice,
        adjustments: {
          seasonal,
          earlyBird,
          lastMinute,
          group,
          weekend,
        },
        finalPrice,
      },
      leadStatus: "Quote Sent",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
