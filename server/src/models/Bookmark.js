const pool = require("../../config/database").pool

exports.getAll = async () => {
  let query = "SELECT * FROM bookmarks"
    return pool
    .then(connection => connection.query(query))
    .catch(err => console.log(err))
}

exports.setBookmark = async (user_id, song_id) => {
  let query = "INSERT INTO bookmarks (user_id, song_id) VALUES (?, ?)"
    return pool
    .then(connection => connection.query(query, [user_id, song_id])) 
    .catch(err => console.log(err))
}

exports.getBookmarksByUser = async (user_id) => {
  let query = `SELECT s.title, s.artist, s.genre, s.album, s.album_image, s.youtube_id, s.lyrics, s.tab, b.id, b.song_id
              FROM bookmarks AS b
              LEFT JOIN songs AS s
              ON b.song_id = s.id
              WHERE user_id = ?`
  return pool
  .then(connection => connection.query(query, [user_id]))
  .catch(err => console.log(err))
}

exports.getOneBookmarkedSong = async (user_id, song_id) => {
  let query = `SELECT s.title, s.artist, s.genre, s.album, s.album_image, s.youtube_id, s.lyrics, s.tab, b.id
              FROM bookmarks AS b
              LEFT JOIN songs AS s
              ON b.song_id = s.id
              WHERE user_id = ? && song_id = ?`
  return pool
  .then(connection => connection.query(query, [user_id, song_id]))
  .catch(err => console.log(err))
}

exports.deleteBookmark = async (id) => {
  let query = "DELETE FROM bookmarks WHERE id= ?"
  return pool
  .then(connection => connection.query(query, [id]))
}