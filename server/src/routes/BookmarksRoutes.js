const express = require('express')
const bookmarksRoutes = require("../controllers/bookmarkController")
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/:userId/bookmarks', auth, bookmarksRoutes.getBookmarksByUser)
router.get('/bookmark/:userId/:songId', auth, bookmarksRoutes.getOneBookmarkedSong)
router.post('/bookmark', auth, bookmarksRoutes.setBookmark)
router.delete('/bookmark/:bookmarkId', auth, bookmarksRoutes.deleteBookmark)

module.exports = router