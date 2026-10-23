// ── 1. Load environment variables ──────────────────────
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// ── 2. Import routes ───────────────────────────────────
const contactRouter = require('./routes/contact');

// ── 3. Create Express app ──────────────────────────────
const app = express();

// ── 4. CORS ────────────────────────────────────────────
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173', // Vite dev server
    'http://localhost:4173', // Vite preview
    'https://portfolio-jixi.vercel.app', // <-- YOUR LIVE VERCEL URL
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (e.g. Postman, curl) or whitelisted origins
            if (!origin ||
                allowedOrigins.includes(origin) ||
                origin.endsWith('.vercel.app') // <-- Allows Vercel preview deployments
            ) {
                callback(null, true);
            } else {
                callback(new Error(`CORS: origin "${origin}" not allowed`));
            }
        },
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
        credentials: false,
    })
);

// ── 5. Body parsers ────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// ── 6. Health check ────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        time: new Date().toISOString(),
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
});

// ── 7. Routes ──────────────────────────────────────────
app.use('/api/contact', contactRouter);

// ── 8. 404 fallback ────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found.' });
});

// ── 9. Global error handler ────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    console.error('[server] Unhandled error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ── 10. Connect to MongoDB then start server ───────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log(`[db] Connected to MongoDB at ${MONGO_URI}`);
        app.listen(PORT, () => {
            console.log(`[server] Listening on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('[db] MongoDB connection failed:', err.message);
        process.exit(1);
    });