const bookmarkModel = require('../models/Bookmark')

exports.setBookmark = async (req,res) => {
  console.log("BOOKMARK REQ =>", req.body)
  try {
    const bookmark = await bookmarkModel.getOneBookmarkedSong(req.params.userId, req.params.songId)
    console.log("BOOKMARK => ", bookmark)
    if(bookmark.length) {
      return res.status(400).send({
        error: 'You already have this set as a bookmark'
      })
    }
    const newBookmark = await bookmarkModel.setBookmark(req.body.userId, req.body.songId)
    .then(response => {
      res.status(200).json({message: "Bookmark created succesfully!"})
    })
  } catch(err) {
    console.log(err)
    res.status(500).send({
      erron: 'An error has occured when trying to create the bookmark'
    })
  }
}

exports.deleteBookmark = async (req,res) => {
  await bookmarkModel.deleteBookmark(req.params.bookmarkId)
  .then(response => {
    res.status(200).json({message: "Bookmark deleted succesfully"})
  })
  .catch(error => console.log(error))
}

exports.getBookmarksByUser = async (req, res) => {
  await bookmarkModel.getBookmarksByUser(req.params.userId)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => console.log(error))
}

exports.getOneBookmarkedSong = async (req, res) => {
  await bookmarkModel.getOneBookmarkedSong(req.params.userId, req.params.songId)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => console.log(error))
}