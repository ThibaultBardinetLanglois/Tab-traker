import Api from '@/services/Api'

export default {
  getAll (userId) {
    return Api().get(`user/${userId}/bookmarks`)
  },

  find (userId, songId) {
    return Api().get(`user/bookmark/${userId}/${songId}`)
  },

  post (bookmark) {
    return Api().post(`user/bookmark`, bookmark)
  },

  delete (bookmarkId) {
    return Api().delete(`user/bookmark/${bookmarkId}`)
  }
}
