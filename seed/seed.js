import mongoose from "mongoose";
import dotenv from "dotenv";
import { EventModel } from "../Models/eventModel.js";
import { PackageModel } from "../Models/packageModel.js";
import connectDB from "../DB/db.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB(); 

    // Clear old data
    await EventModel.deleteMany({});
    await PackageModel.deleteMany({});
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

    console.log("✅ Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
