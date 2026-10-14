// app.js

// 1. Load Environment Variable menggunakan dotenv (Paling atas)
require('dotenv').config();

const express = require('express');
const cors = require('cors'); // 2. Konfigurasi CORS
const app = express();

// Menggunakan PORT dari .env dengan fallback 3000
const PORT = process.env.PORT || 3000;

// 3. Middleware Logger Kustom (Mencatat method, URL, dan waktu setiap request)
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// Daftarkan middleware global SEBELUM route lain
app.use(logger);
app.use(cors());
app.use(express.json());

// Import Routes
const songRouter = require('./ROUTES/SongRouter');

// Main Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Selamat Datang di SoundFlow RESTful API',
    endpoints: {
      getAllSongs: 'GET /song',
      getSongById: 'GET /song/:id',
      createSong: 'POST /song',
      updateSong: 'PUT /song/:id',
      deleteSong: 'DELETE /song/:id'
    }
  });
});

// Register Module Routes
app.use('/song', songRouter);

// 4. Middleware Error-Handling Terpusat (Wajib di bagian paling bawah setelah seluruh route)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'fail',
    message: err.message || 'Terjadi kesalahan pada server'
  });
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server SoundFlow API berjalan di http://localhost:${PORT}`);
});