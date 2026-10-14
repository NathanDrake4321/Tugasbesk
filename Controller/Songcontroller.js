// controllers/songController.js
const songModel = require('../models/songModel');

exports.getAllSongs = (req, res, next) => {
  try {
    const songs = songModel.getAll();
    res.status(200).json({
      status: 'success',
      total: songs.length,
      data: songs
    });
  } catch (err) {
    next(err);
  }
};

exports.getSongById = (req, res, next) => {
  try {
    const songId = parseInt(req.params.id);
    const foundSong = songModel.getById(songId);

    if (!foundSong) {
      const error = new Error(`Lagu dengan ID ${songId} tidak ditemukan`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: 'success',
      data: foundSong
    });
  } catch (err) {
    next(err);
  }
};

exports.createSong = (req, res, next) => {
  try {
    const { title, artist } = req.body;

    if (!title || !artist) {
      const error = new Error('Judul (title) dan Artis (artist) wajib diisi');
      error.statusCode = 400;
      throw error;
    }

    const newSong = songModel.create(req.body);

    res.status(201).json({
      status: 'success',
      message: "Song berhasil ditambahkan",
      data: newSong
    });
  } catch (err) {
    next(err);
  }
};

exports.updateSong = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updatedSong = songModel.update(id, req.body);

    if (!updatedSong) {
      const error = new Error("Song tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      message: "Song berhasil diperbarui",
      data: updatedSong
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteSong = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedSong = songModel.remove(id);

    if (!deletedSong) {
      const error = new Error("Song tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      message: "Song berhasil dihapus",
      data: deletedSong
    });
  } catch (err) {
    next(err);
  }
};