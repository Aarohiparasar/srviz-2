import mongoose from "mongoose";
import dotenv from "dotenv";
import { EventModel } from "../Models/eventModel.js";
import { PackageModel } from "../Models/packageModel.js";
import Lead from "../Models/Lead.js";
import connectDB from "../DB/db.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data
    await EventModel.deleteMany({});
    await PackageModel.deleteMany({});
    await Lead.deleteMany({});
    console.log("🧹 Old data cleared");

    // Insert Events
    const events = await EventModel.insertMany([
      {
        title: "Champions League Final",
        description: "Experience the thrill of the UEFA Champions League Finale.",
        date: "2025-06-10",
        location: "Berlin, Germany",
      },
      {
        title: "Cricket World Cup",
        description: "World Cup Semi-Final cricket experience.",
        date: "2025-10-22",
        location: "Mumbai, India",
      },
      {
        title: "F1 Grand Prix",
        description: "Formula 1 Grand Prix weekend experience.",
        date: "2025-09-15",
        location: "Singapore",
      },
    ]);
    console.log("🎉 Events Seeded:", events.length);

    // Insert Packages
    const packages = await PackageModel.insertMany([
      // Champions League Packages
      {
        eventId: events[0]._id,
        title: "Standard Pass",
        price: 1200,
        description: "Match ticket + basic seating"
      },
      {
        eventId: events[0]._id,
        title: "VIP Experience",
        price: 2500,
        description: "VIP seating + lounge access + meal"
      },
      // Cricket World Cup Packages
      {
        eventId: events[1]._id,
        title: "Premium Cricket Pass",
        price: 800,
        description: "Best view + hospitality"
      },
      {
        eventId: events[1]._id,
        title: "Budget Pass",
        price: 300,
        description: "Economy seating",
      },
      // F1 Grand Prix Packages
      {
        eventId: events[2]._id,
        title: "F1 Weekend Pass",
        price: 1500,
        description: "3-day pass with paddock walk"
      },
      {
        eventId: events[2]._id,
        title: "F1 VIP Podium",
        price: 3200,
        description: "VIP viewing + driver meet"
      },
    ]);
    console.log("🎁 Packages Seeded:", packages.length);

    // Insert Test Leads
    const leads = await Lead.insertMany([
      {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        eventId: events[0]._id,  // Champions League
        travellers: 2,
        status: "New",
        statusHistory: [{ status: "New" }]
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1987654321",
        eventId: events[1]._id,  // Cricket World Cup
        travellers: 4,
        status: "Contacted",
        statusHistory: [
          { status: "New", timestamp: new Date(Date.now() - 86400000) },
          { status: "Contacted", timestamp: new Date() }
        ]
      },
      {
        name: "Alex Johnson",
        email: "alex.j@example.com",
        phone: "+1555123456",
        eventId: events[2]._id,  // F1 Grand Prix
        travellers: 1,
        status: "New",
        statusHistory: [{ status: "New" }]
      }
    ]);
    console.log("👥 Test Leads Seeded:", leads.length);

    console.log("\n✅ Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedData();