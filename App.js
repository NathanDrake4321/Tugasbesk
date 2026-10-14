const express = require('express');
const app = express();
const PORT = 3000;

// Import Routes
const songRouter = require('./ROUTES/SongRouter');

// Middleware parsing JSON
app.use(express.json());

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

// Server Listening
app.listen(PORT, () => {
  console.log(`Server SoundFlow API berjalan di http://localhost:${PORT}`);
});