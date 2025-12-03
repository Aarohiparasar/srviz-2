🏆Sports Trip Booking API

A backend service to manage Events → Packages → Leads → Quotes for sports trip bookings.

**deployed URl on Render:
  -https://srviz-2.onrender.com

🚀 How to Run Locally
-  git clone <repo-url>
- npm install
- Create .env (MONGO_URI ,PORT,FRONTEND_URL)
- Start Server(npm run dev)
- 🌱 Seed Database (npm run seed)

  ⚙️ Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- Seeding Script

🛠 What I Would Improve in Production
- Add JWT auth + role-based access
- Add caching with Redis
-Add background jobs (emails)

📚 Data Model

** Event
- title, description, date, location
- 
** Package
- name, description, basePrice
-belongs to an Event

** Lead
-name, email, phone, travellers
-references eventId and packageId

** statuses:
- New → Contacted → Quote Sent → Interested → Closed Won / Closed Lost
- stores statusHistory

** Quote
-basePrice
-all price adjustments
-finalPrice
-linked to a Lead
-auto-updates lead status → Quote Sent

🔌 API Documentation

** Events
-GET /api/events/getEvents (Fetch all events)
-CREATE /api/events/createEvent(create events)

** Packages
- GET /api/events/:id/packages (Fetch packages for an event)

** Leads
- GET /api/leads/getLeads (get leads)
- POST /api/leads/createLead (Create lead (user inquiry))
- PATCH /api/leads/:id/status (Update lead status)

  ** Quotes
- POST /api/quotes/generate (Generate quote and auto-update lead status → Quote Sent)
  *Response includes:
     - Base price
     - All adjustments
     - Final price
     - Quote ID
  **Frontend
  A minimal Vite-based frontend used for testing backend APIs.

🧪 Features
- Fetch all events
- Fetch packages for an event
- Submit a lead (name, email, phone, event, travellers)
- Generate a quote for a lead
- Show API responses on screen

 🎯 Purpose
-Helps verify end-to-end backend flow:
-Events & packages
-Lead creation
-Quote generation
-Status updates
-CORS working

**Deploy on Vercel/Netlify
-link-https://srviz-2-6ftk.vercel.app/events
