import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = Number(process.env.PORT || 4000);
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
const defaultMongoUri = "mongodb://127.0.0.1:27017/leo_flex";
const resolvedMongoUri = mongoUri || defaultMongoUri;
const jwtSecret = process.env.JWT_SECRET || "leo-flex-secret";

if (!mongoUri) {
  console.warn("MONGODB_URI is not set. Falling back to local MongoDB at", defaultMongoUri);
}

mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true },
    full_name: { type: String, default: "" },
    phone: { type: String, default: "" },
    account_type: { type: String, enum: ["person", "store"], default: "person" },
    role: { type: String, enum: ["admin", "driver", "customer"], default: "customer" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

userSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const driverSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    vehicle_type: { type: String, default: "" },
    vehicle_number: { type: String, default: "" },
    license_number: { type: String, default: "" },
    availability: { type: String, enum: ["online", "offline", "on_trip"], default: "offline" },
    total_earnings: { type: Number, default: 0 },
    rating: { type: Number, default: 5.0 },
    total_trips: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

driverSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const shipmentSchema = new mongoose.Schema(
  {
    tracking_id: { type: String, required: true, unique: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    driver_id: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", default: null },
    status: { type: String, enum: ["pending", "assigned", "picked_up", "in_transit", "delivered", "cancelled", "failed"], default: "pending" },
    package_description: { type: String, required: true },
    package_weight_kg: { type: Number, required: true },
    pickup_address: { type: String, required: true },
    drop_address: { type: String, required: true },
    recipient_name: { type: String, required: true },
    recipient_phone: { type: String, required: true },
    price: { type: Number, default: 0 },
    eta_minutes: { type: Number, default: 0 },
    delivered_at: { type: Date, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

shipmentSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const eventSchema = new mongoose.Schema(
  {
    shipment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment", required: true },
    event_type: { type: String, required: true },
    message: { type: String, default: "" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

eventSchema.pre("save", function (next) {
  this.created_at = new Date();
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Driver = mongoose.models.Driver || mongoose.model("Driver", driverSchema);
const Shipment = mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema);
const ShipmentEvent = mongoose.models.ShipmentEvent || mongoose.model("ShipmentEvent", eventSchema);

const generateTrackingId = () => {
  const date = new Date();
  const yymmdd = date.toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.floor(10000 + Math.random() * 90000);
  return `LF${yymmdd}${random}`;
};

const apiUrl = process.env.API_URL || "http://localhost:4000";

app.use(cors());
app.use(express.json());

const createToken = (user) => jwt.sign({ id: user._id.toString(), email: user.email, role: user.role }, jwtSecret, { expiresIn: "7d" });

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (typeof decoded !== "object" || !decoded || !decoded.id) {
      throw new Error("Invalid token");
    }
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin role required" });
  return next();
};

const ensureDriver = (req, res, next) => {
  if (req.user.role !== "driver") return res.status(403).json({ error: "Driver role required" });
  return next();
};

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "LEO FLEX MongoDB backend is ready" });
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, full_name, phone, account_type, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ error: "Email already in use." });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: normalizedEmail,
      password_hash,
      full_name: full_name || "",
      phone: phone || "",
      account_type: account_type || "person",
      role: role || "customer",
    });

    if (user.role === "driver") {
      await Driver.create({ user_id: user._id });
    }

    const token = createToken(user);
    return res.status(201).json({ token, user: {
      id: user._id.toString(),
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      account_type: user.account_type,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Signup failed." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(401).json({ error: "Invalid credentials." });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    const token = createToken(user);
    return res.json({ token, user: {
      id: user._id.toString(),
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      account_type: user.account_type,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Login failed." });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ error: "User not found." });
    return res.json({ user: {
      id: user._id.toString(),
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      account_type: user.account_type,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not load user." });
  }
});

app.post("/api/shipments", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "customer" && req.user.role !== "admin") {
      return res.status(403).json({ error: "Only customers or admins can create shipments." });
    }

    const {
      package_description,
      package_weight_kg,
      pickup_address,
      drop_address,
      recipient_name,
      recipient_phone,
      price,
      eta_minutes,
    } = req.body;

    if (!package_description || !package_weight_kg || !pickup_address || !drop_address || !recipient_name || !recipient_phone) {
      return res.status(400).json({ error: "Missing required shipment fields." });
    }

    const shipment = await Shipment.create({
      tracking_id: generateTrackingId(),
      customer_id: req.user.id,
      package_description,
      package_weight_kg,
      pickup_address,
      drop_address,
      recipient_name,
      recipient_phone,
      price: price || 0,
      eta_minutes: eta_minutes || 0,
    });

    return res.status(201).json({ id: shipment._id.toString(), tracking_id: shipment.tracking_id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create shipment." });
  }
});

app.get("/api/customers/me/shipments", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "customer") return res.status(403).json({ error: "Customer role required." });
    const shipments = await Shipment.find({ customer_id: req.user.id }).sort({ created_at: -1 }).limit(50).lean();
    return res.json({ shipments: shipments.map((s) => ({ ...s, id: s._id.toString() })) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load shipments." });
  }
});

app.get("/api/drivers/me", authMiddleware, ensureDriver, async (req, res) => {
  try {
    const driver = await Driver.findOne({ user_id: req.user.id }).lean();
    if (!driver) return res.status(404).json({ error: "Driver profile not found." });
    return res.json({ driver: { ...driver, id: driver._id.toString(), user_id: driver.user_id.toString(), created_at: driver.created_at, updated_at: driver.updated_at } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load driver." });
  }
});

app.get("/api/drivers/:id", authMiddleware, async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).lean();
    if (!driver) return res.status(404).json({ error: "Driver profile not found." });
    return res.json({ driver: { ...driver, id: driver._id.toString(), user_id: driver.user_id.toString(), created_at: driver.created_at, updated_at: driver.updated_at } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load driver." });
  }
});

app.get("/api/drivers/me/shipments", authMiddleware, ensureDriver, async (req, res) => {
  try {
    const status = req.query.status;
    const filter = { driver_id: req.query.driver_id || req.user.id };
    if (status) filter.status = { $in: status.toString().split(",") };
    const shipments = await Shipment.find(filter).sort({ created_at: -1 }).limit(50).lean();
    return res.json({ shipments: shipments.map((s) => ({ ...s, id: s._id.toString() })) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load driver shipments." });
  }
});

app.get("/api/shipments", authMiddleware, async (req, res) => {
  try {
    const status = req.query.status ? req.query.status.toString().split(",") : undefined;
    const pool = req.query.pool === "true";
    const query = {};

    if (req.user.role === "customer") {
      query.customer_id = req.user.id;
    }

    if (req.user.role === "driver") {
      if (pool) {
        query.status = "pending";
      } else {
        query.driver_id = req.user.id;
      }
    }

    if (req.user.role === "admin" && !pool) {
      // admin sees all shipments by default
    }

    if (status) {
      if (Array.isArray(query.status)) {
        query.status = { $in: status };
      } else if (query.status === "pending") {
        query.status = { $in: status }; // override pool query if status provided explicitly
      } else {
        query.status = { $in: status };
      }
    }

    const shipments = await Shipment.find(query).sort({ created_at: -1 }).limit(50).lean();
    return res.json({ shipments: shipments.map((s) => ({ ...s, id: s._id.toString() })) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load shipments." });
  }
});

app.put("/api/drivers/me", authMiddleware, ensureDriver, async (req, res) => {
  try {
    const updates = {};
    if (req.body.availability) updates.availability = req.body.availability;
    if (typeof req.body.total_earnings === "number") updates.total_earnings = req.body.total_earnings;
    if (typeof req.body.total_trips === "number") updates.total_trips = req.body.total_trips;
    const driver = await Driver.findOneAndUpdate({ user_id: req.user.id }, updates, { new: true }).lean();
    if (!driver) return res.status(404).json({ error: "Driver profile not found." });
    return res.json({ driver: { ...driver, id: driver._id.toString(), user_id: driver.user_id.toString() } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to update driver." });
  }
});

app.get("/api/shipments/:id", authMiddleware, async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id).lean();
    if (!shipment) return res.status(404).json({ error: "Shipment not found." });
    if (req.user.role === "customer" && shipment.customer_id.toString() !== req.user.id) return res.status(403).json({ error: "Not allowed." });
    if (req.user.role === "driver" && shipment.driver_id && shipment.driver_id.toString() !== req.user.id && shipment.status !== "pending") return res.status(403).json({ error: "Not allowed." });
    return res.json({ shipment: { ...shipment, id: shipment._id.toString() } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load shipment." });
  }
});

app.get("/api/shipments/:id/events", authMiddleware, async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id).lean();
    if (!shipment) return res.status(404).json({ error: "Shipment not found." });
    const events = await ShipmentEvent.find({ shipment_id: shipment._id }).sort({ created_at: -1 }).lean();
    return res.json({ events: events.map((event) => ({ ...event, id: event._id.toString(), shipment_id: event.shipment_id.toString(), created_by: event.created_by?.toString() || null })) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load shipment events." });
  }
});

app.post("/api/shipments/:id/events", authMiddleware, async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id).lean();
    if (!shipment) return res.status(404).json({ error: "Shipment not found." });
    const { event_type, message } = req.body;
    const event = await ShipmentEvent.create({ shipment_id: shipment._id, event_type, message, created_by: req.user.id });
    return res.status(201).json({ event: { ...event.toObject(), id: event._id.toString(), shipment_id: event.shipment_id.toString(), created_by: event.created_by?.toString() || null } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create shipment event." });
  }
});

app.put("/api/shipments/:id", authMiddleware, async (req, res) => {
  try {
    const { status, driver_id, delivered_at } = req.body;
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ error: "Shipment not found." });
    if (req.user.role === "customer" && shipment.customer_id.toString() !== req.user.id) return res.status(403).json({ error: "Not allowed." });
    if (req.user.role === "driver" && shipment.driver_id?.toString() !== req.user.id && status !== "assigned") return res.status(403).json({ error: "Not allowed." });

    if (driver_id) shipment.driver_id = driver_id;
    if (status) shipment.status = status;
    if (delivered_at) shipment.delivered_at = new Date(delivered_at);

    await shipment.save();
    return res.json({ shipment: { ...shipment.toObject(), id: shipment._id.toString() } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to update shipment." });
  }
});

app.get("/api/admin/overview", authMiddleware, adminOnly, async (req, res) => {
  try {
    const [shipments, drivers, users] = await Promise.all([
      Shipment.find().sort({ created_at: -1 }).limit(1000).lean(),
      Driver.find().lean(),
      User.find().lean(),
    ]);

    return res.json({
      shipments: shipments.map((s) => ({ ...s, id: s._id.toString() })),
      drivers: drivers.map((d) => ({ ...d, id: d._id.toString(), user_id: d.user_id.toString() })),
      users: users.map((u) => ({ id: u._id.toString(), email: u.email, full_name: u.full_name, phone: u.phone, account_type: u.account_type, role: u.role, created_at: u.created_at, updated_at: u.updated_at })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load admin overview." });
  }
});

const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL || "leodas@gmail.com";
const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Leo@7631";

const ensureDefaultAdmin = async () => {
  const normalizedEmail = String(defaultAdminEmail).trim().toLowerCase();
  const existingAdmin = await User.findOne({ email: normalizedEmail });
  const password_hash = await bcrypt.hash(defaultAdminPassword, 10);

  if (!existingAdmin) {
    await User.create({
      email: normalizedEmail,
      password_hash,
      full_name: "Admin",
      phone: "",
      account_type: "person",
      role: "admin",
    });
    console.log("Created default admin user:", normalizedEmail);
    return;
  }

  if (existingAdmin.role !== "admin") {
    existingAdmin.role = "admin";
    console.log("Updated default user role to admin for:", normalizedEmail);
  }

  const match = await bcrypt.compare(defaultAdminPassword, existingAdmin.password_hash);
  if (!match) {
    existingAdmin.password_hash = password_hash;
    await existingAdmin.save();
    console.log("Reset default admin password for:", normalizedEmail);
  }
};

mongoose
  .connect(resolvedMongoUri, { autoIndex: true })
  .then(async () => {
    console.log("MongoDB connected");
    await ensureDefaultAdmin();
    app.listen(port, () => {
      console.log(`LEO FLEX backend listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
