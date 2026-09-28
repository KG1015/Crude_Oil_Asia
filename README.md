# Asia Crude Battleground: Dubai/Oman & The Asian Crude Market
### A Commercial Crude-Trading & Refinery Sourcing Platform

A high-performance, chapter-based, map-driven interactive research platform and trading desk simulator explaining:
> **"How Asia sources crude oil and how Middle Eastern, Russian, and Atlantic Basin barrels compete for Asian refinery demand."**

Built to the visual design standards of **Bloomberg Terminal, Financial Times Special Report, Reuters Graphics, and McKinsey Strategy Presentation**.

---

## 1. Complete Folder Structure

```
asian-crude-battleground/
│
├── index.html                 # Complete Single-Page Application (Three.js + Leaflet + 4 View Modes)
├── styles.css                 # Bloomberg/FT Design System, Terminal Theme & Print Styles
├── data.js                   # Authoritative Market Assays, Nautical Waypoints, OSPs & Citations
├── app.js                    # Three.js 3D Globe, Leaflet Polyline Engine & Arbitrage Calculator
├── vercel.json               # Vercel Production Frontend Deployment Configuration
├── render.yaml               # Render Backend Web Service Blueprint
├── .env.example              # Environment Variable Template
├── README.md                 # Complete Architectural Documentation & Deployment Guide
│
├── docker/
│   ├── Dockerfile            # Multi-stage production container for Node.js API
│   └── docker-compose.yml    # Local multi-container orchestration (API + MongoDB)
│
└── server/                   # MERN Backend REST API
    ├── package.json          # Node dependencies (Express, Mongoose, Helmet, Morgan, Cors)
    ├── server.js             # Express application entrypoint
    ├── controllers/
    │   └── arbitrageController.js  # 5 Crudes x 4 Destinations Parity Engine
    ├── models/
    │   ├── Benchmark.js      # ICE Brent, Dubai Cash, DME Oman & Forward Curves
    │   ├── OspRecord.js      # Aramco, ADNOC, SOMO monthly differential notices
    │   ├── Refinery.js       # Asian refinery complexes & conversion units (NCI)
    │   └── TankerRoute.js    # Verified nautical coordinates & Worldscale rates
    └── routes/
        └── api.js            # REST API routes (/arbitrage, /efs/sensitivity, /osps)
```

---

## 2. Technical Stack

- **Frontend**: HTML5, Vanilla ES6+ Modules (or React Vite compatible), Three.js (3D WebGL Globe & Bezier Arcs), Leaflet.js with CartoDB Dark Matter tiles, CSS Custom Properties Design System.
- **Backend**: Node.js v20, Express 4.x, Mongoose ODM, Helmet security headers, Morgan logging, CORS.
- **Database**: MongoDB Atlas (Cloud) / MongoDB 7.0 (Docker).
- **Deployment**: Vercel (Edge Static Frontend) + Render (Node Web Service) + MongoDB Atlas.

---

## 3. Database Schemas (MongoDB Mongoose)

### A. Benchmark & Forward Curve Schema (`server/models/Benchmark.js`)
```javascript
const BenchmarkSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true }, // BRENT, DUBAI_CASH, DME_OMAN, WTI_HOUSTON, EFS
  name: { type: String, required: true },
  exchange: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  termStructure: {
    state: { type: String, enum: ['BACKWARDATION', 'CONTANGO', 'FLAT'] },
    promptSpreadM1M2: Number,
    boxSpreadM1M3: Number,
    flySpread: Number, // 2*M2 - (M1 + M3)
    contracts: [{ monthCode: String, monthLabel: String, priceUsd: Number }]
  }
});
```

### B. Official Selling Price (OSP) Schema (`server/models/OspRecord.js`)
```javascript
const OspRecordSchema = new mongoose.Schema({
  nationalOilCompany: String, // Saudi Aramco, ADNOC, Iraq SOMO, KPC
  targetMarket: { type: String, default: 'Asia-Pacific' },
  announcementDate: Date,
  differentials: [{
    gradeName: String, // Arab Light, Medium, Heavy, Murban, Basrah Medium
    differentialUsd: Number,
    monthOfDelivery: String
  }]
});
```

---

## 4. REST API Architecture

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Health check & service status |
| `POST` | `/api/v1/arbitrage/calculate` | Calculates delivered parity for 5 crudes into China, India, Japan, or Korea |
| `GET` | `/api/v1/efs/sensitivity` | Returns global flow shifts across variable EFS spreads ($-\$1.00$ to $+\$4.00/\text{bbl}$) |
| `GET` | `/api/v1/osps` | Returns monthly OSP differential tables for Saudi Aramco, ADNOC, and SOMO |

---

## 5. Local Development Setup

### Option A: Direct Browser Launch (Zero Dependencies)
You can test the complete frontend immediately:
```powershell
Start-Process "asian-crude-battleground/index.html"
```

### Option B: Full MERN Stack with Docker
```bash
# 1. Clone repository
git clone https://github.com/your-org/asian-crude-battleground.git
cd asian-crude-battleground

# 2. Launch API and MongoDB using Docker Compose
docker-compose -f docker/docker-compose.yml up --build -d

# 3. Test API Health
curl http://localhost:5000/api/v1/health
```

---

## 6. Production Deployment Guide

### A. Deploy Frontend to Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy the root directory:
   ```bash
   cd asian-crude-battleground
   vercel --prod
   ```
3. Your interactive platform is instantly live on `https://asian-crude-battleground.vercel.app`.

---

### B. Deploy Backend to Render
1. Push your repository to GitHub.
2. Log into [Render Dashboard](https://dashboard.render.com).
3. Click **New +** $\to$ **Blueprint**, connect your GitHub repo, and select `render.yaml`.
4. Alternatively, create a **Web Service**:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**: Add `MONGO_URI` from your MongoDB Atlas cluster.
5. Deploy service. Health check URL: `https://your-api.onrender.com/api/v1/health`.

---

### C. Configure MongoDB Atlas
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database User (e.g. `crude_trader`).
3. Under **Network Access**, add `0.0.0.0/0` (allow access from Render web services).
4. Copy your connection string:
   ```
   mongodb+srv://crude_trader:<password>@cluster0.mongodb.net/asian_crude_battleground?retryWrites=true&w=majority
   ```
5. Set `MONGO_URI` in your Render Environment Variables.
