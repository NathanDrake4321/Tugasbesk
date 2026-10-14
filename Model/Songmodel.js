// models/songModel.js
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

function getAll() {
  return song;
}

function getById(id) {
  return song.find(s => s.id === id);
}

function create(data) {
  const { title, artist, album, genre, duration, isPremium } = data;
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
  return newSong;
}

function update(id, data) {
  const index = song.findIndex(s => s.id === id);
  if (index === -1) return null;

  song[index] = { ...song[index], ...data };
  return song[index];
}

function remove(id) {
  const index = song.findIndex(s => s.id === id);
  if (index === -1) return null;

  const deleted = song.splice(index, 1);
  return deleted[0];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};