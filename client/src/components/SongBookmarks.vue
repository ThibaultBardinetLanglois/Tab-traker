<template>
  <div v-if="bookmarks.length">
    <h3>Bookmarks</h3>
    <table>
      <thead>
        <th>Title</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Genre</th>
        <th>See</th>
      </thead>
      <tbody
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
      >
        <tr>
          <td> {{ bookmark.title }} </td>
          <td> {{ bookmark.artist }} </td>
          <td> {{ bookmark.album }} </td>
          <td> {{ bookmark.genre }} </td>
          <td>  <router-link :to="{
                  name: 'view-song',
                  params: {
                            songId: bookmark.song_id
                          }
                  }">
                    <icon name="eye"></icon>
                </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import BookmarksService from '@/services/BookmarksService'
import store from '@/store/store'
export default {
  data () {
    return {
      bookmarks: ''
    }
  },
  components: {
    Panel
  },
  async mounted () {
    // do a request to the backend for all the user's bookmarks
    if (this.$store.state.isUserLoggedIn) {
      console.log('ISLOGGED? =>', store.state.isUserLoggedIn)
      const userId = this.$store.state.user.id
      console.log('USER ID => ', userId)
      this.bookmarks = (await BookmarksService.getAll(userId)).data
      console.log('THIS BOOKMARKS => ', this.bookmarks)
      if (this.bookmarks.length) {
        console.log('THIS BOOKMARKS => ', this.bookmarks)
      }
    }
  }
}
</script>

<style scoped>

</style>
