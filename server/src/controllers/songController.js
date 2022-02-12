const songModel = require('../models/Song')

exports.getAllSongs = async (req, res) => {
  await songModel.getAll()
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => console.log(error))
}

exports.getSongById = async (req, res) => {
  console.log('REQ PARAMS ', req.params)
  await songModel.getSongById(req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => console.log(error))
}

exports.createSong = async (req, res) => {
  console.log('REQ HEADERS => ', req.headers['x-access-token'])
  const song = await songModel.createSong(req.body.title, req.body.artist, req.body.genre, req.body.album, req.body.albumImage, req.body.youtubeId, req.body.lyrics, req.body.tab)
  .then(response => {
    console.log("SONG CREATED SUCCESFULLY!")
    res.status(200).json({message: "SONG CREATED SUCCESFULLY!"})
  })
  .catch(error => console.log(error))
  
}

exports.editSong = async (req, res) => {
  console.log('REQ HEADERS => ', req.headers['Authorization'])
  const newSong = {
    id: req.body[0].id,
    title: req.body[0].title,
    artist: req.body[0].artist,
    genre: req.body[0].genre,
    album: req.body[0].album,
    albumImage: req.body[0].album_image,
    youtubeId: req.body[0].youtube_id,
    lyrics: req.body[0].lyrics,
    tab: req.body[0].tab
  }
  console.log(newSong)
  const song = await songModel.updateSong(newSong.id, newSong)
  .then(response => {
    console.log("SONG UPDATED SUCCESFULLY!")
    res.status(200).send(req.body)
  })
  .catch(error => console.log(error))
  
}

exports.deleteSong = async (req, res) => {
  await songModel.deleteSong(req.params.id)
  .then(response => {
    res.status(200).json({message: "SONG DELETED!!"})
  })
  .catch(error => console.log(error))
}