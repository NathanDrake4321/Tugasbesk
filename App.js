// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// SoundFlow API Implementation

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Data Sementara (Array in-memory)
let song = [
  {
    id: 1,
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    genre: 'R&B / Pop',
    duration: '03:50',
    isPremium: false
  },
  {
    id: 2,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Synthwave',
    duration: '03:20',
    isPremium: true
  },
  {
    id: 3,
    title: 'Kill Bill',
    artist: 'SZA',
    album: 'SOS',
    genre: 'R&B',
    duration: '02:33',
    isPremium: false
  },
  {
    id: 4,
    title: 'Evaluasi',
    artist: 'Hindia',
    album: 'Menari dengan Bayangan',
    genre: 'Indie Pop',
    duration: '03:24',
    isPremium: false
  },
  {
    id: 5,
    title: 'Gagal Bersembunyi',
    artist: 'The Rain',
    album: 'Jabat Erat',
    genre: 'Pop Rock',
    duration: '04:12',
    isPremium: false
  },
  {
    id: 6,
    title: 'Komang',
    artist: 'Raim Laode',
    album: 'Komang - Single',
    genre: 'Indie Folk',
    duration: '03:42',
    isPremium: false
  },
  {
    id: 7,
    title: 'Sial',
    artist: 'Mahalini',
    album: 'Fabula',
    genre: 'Pop',
    duration: '04:03',
    isPremium: true
  },
  {
    id: 8,
    title: 'As It Was',
    artist: 'Harry Styles',
    album: "Harry's House",
    genre: 'Synth-pop',
    duration: '02:47',
    isPremium: false
  },
  {
    id: 9,
    title: 'Numb',
    artist: 'Linkin Park',
    album: 'Meteora',
    genre: 'Alternative Rock',
    duration: '03:07',
    isPremium: true
  },
  {
    id: 10,
    title: 'Untunglah, Hari Ini Kita Masih Bernapas',
    artist: 'Lomba Sihir',
    album: 'Selamat Datang di Ujung Dunia',
    genre: 'Indie Rock',
    duration: '03:55',
    isPremium: false
  }
];

// 0. ROOT ROUTE
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

//1. GET ALL SONGS
app.get('/song', (req, res) => {
  res.status(200).json({
    status: 'success',
    total: song.length,
    data: song
  });
});

// 2. GET SONG BY ID
app.get('/song/:id', (req, res) => {
  const songId = parseInt(req.params.id);
  const foundSong = song.find(s => s.id === songId);

  if (!foundSong) {
    return res.status(404).json({
      status: 'fail',
      message: `Lagu dengan ID ${songId} tidak ditemukan`
    });
  }

  res.status(200).json({
    status: 'success',
    data: foundSong
  });
});

// 3. POST NEW SONG
app.post("/song", (req, res) => {
  const { title, artist, album, genre, duration, isPremium } = req.body;

  if (!title || !artist) {
    return res.status(400).json({
      status: 'fail',
      message: 'Judul (title) dan Artis (artist) wajib diisi'
    });
  }

  const newSong = {
    id: song.length ? song[song.length - 1].id + 1 : 1,
    title,
    artist,
    album: album || 'Single',
    genre: genre || 'General',
    duration: duration || '00:00',
    isPremium: isPremium || false,
  };

  song.push(newSong);

  res.status(201).json({
    status: 'success',
    message: "Song berhasil ditambahkan",
    data: newSong
  });
});

// 4. PUT UPDATE SONG
app.put("/song/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = song.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Song tidak ditemukan"
    });
  }

  const updatedSong = { ...song[index], ...req.body };
  song[index] = updatedSong;

  res.status(200).json({
    status: "success",
    message: "Song berhasil diperbarui",
    data: updatedSong
  });
});

// 5. DELETE SONG
app.delete("/song/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = song.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Song tidak ditemukan"
    });
  }

  const deleted = song.splice(index, 1);

  res.status(200).json({
    status: "success",
    message: "Song berhasil dihapus",
    data: deleted[0]
  });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server SoundFlow API berjalan di http://localhost:${PORT}`);
});