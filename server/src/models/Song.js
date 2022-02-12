const pool = require("../../config/database").pool

exports.createSong = async (title, artist, genre, album, albumImage, youtubeId, lyrics, tab) => {
  let query = "INSERT INTO songs (title, artist, genre, album, album_image, youtube_id, lyrics, tab) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    return pool
    .then(connection => connection.query(query, [title, artist, genre, album, albumImage, youtubeId, lyrics, tab])) 
    .catch(err => console.log(err))
}

exports.getAll = async () => {
  let query = "SELECT * FROM songs"
    return pool
    .then(connection => connection.query(query))
    .catch(err => console.log(err))
}

exports.getSongById = async (id) => {
  let query = "SELECT * FROM songs WHERE id = ?";
  return pool
  .then(connection => connection.query(query, [id]))
  .catch(err => console.log(err))
}

exports.updateSong = async (id, song) => {
  let query = "UPDATE songs SET title = ?, artist = ?, genre = ?, album = ?, album_image = ?, youtube_id = ?, lyrics = ?, tab = ?   WHERE id = ?";
  return pool
  .then(connection => connection.query(query, [
    song.title,
    song.artist,
    song.genre,
    song.album,
    song.albumImage,
    song.youtubeId,
    song.lyrics,
    song.tab,
    song.id
  ]))
  .catch(err => console.log(err))
}

exports.deleteSong = async (id) => {
  let query = "DELETE FROM songs WHERE id = ?"
  return pool
  .then(connection => connection.query(query, [id]))
}