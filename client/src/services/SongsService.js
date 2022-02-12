import Api from '@/services/Api'

export default {
  getAllSongs () {
    return Api().get('user/songs')
  },
  showSong (songId) {
    return Api().get(`user/songs/${songId}`)
  },
  createSong (song) {
    return Api().post('user/song', song)
  },
  editSong (song) {
    console.log('Song ==>', song)
    return Api().put(`user/songs/${song.id}`, song)
  }
}
