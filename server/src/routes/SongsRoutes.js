const express = require('express')
const songsRoutes = require("../controllers/songController")
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/songs', songsRoutes.getAllSongs)
router.get('/songs/:id', songsRoutes.getSongById)
router.post('/song', auth, songsRoutes.createSong)
router.put('/songs/:songId', auth, songsRoutes.editSong)
router.delete('/songs/:id', auth, songsRoutes.deleteSong)

module.exports = router