<template>
  <v-flex>

    <router-link :to="{
      name: 'edit-song',
      params: {
                songId: song[0].id
              }
      }">
      <v-btn text>
          Edit
      </v-btn>
    </router-link>

    <v-btn
      v-if="$store.state.isUserLoggedIn && !bookmark"
      text
      @click="setBookmark">
        Bookmark
    </v-btn>

    <v-btn
      v-if="$store.state.isUserLoggedIn && bookmark"
      text
      @click="unBookmark">
        Unbookmark
    </v-btn>

    <Panel title="Song Metadata">
      <div class="song-title">
          {{ song[0].title }}
        </div>
        <div class="song-artist">
          {{ song[0].artist }}
        </div>
        <div class="song-genre">
          {{ song[0].genre }}
        </div>

        <div class="album-image">
          <img :src="song[0].album_image" />
          <br>
          {{ song[0].album }}
        </div>
    </Panel>

  </v-flex>
</template>

<script>
import Panel from '@/components/Panel'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  components: {
    Panel
  },
  methods: {
    async setBookmark () {
      const userId = this.$store.state.user.id
      const songId = this.$store.state.route.params.songId
      console.log('bookmark')
      const newBookmark = {
        userId: userId,
        songId: songId
      }

      try {
        await BookmarksService.post(newBookmark)
      } catch (err) {
        console.log(err)
      }

      try {
        const bookmark = (await BookmarksService.find(userId, songId)).data[0]
        this.bookmark = bookmark
      } catch (err) {
        console.log(err)
      }
      console.log('THIS.BOOKMARK =>', this.bookmark)
    },
    async unBookmark () {
      console.log('unBookmark')
      const bookmarkId = this.bookmark.id
      try {
        await BookmarksService.delete(bookmarkId)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    const userId = this.$store.state.user.id
    const songId = this.$store.state.route.params.songId
    const bookmark = (await BookmarksService.find(userId, songId)).data[0]
    console.log('BOOKMARK =>', bookmark)
    if (bookmark) {
      this.bookmark = bookmark
      console.log('THIS.BOKKMARK =>', this.bookmark)
    }
  }
}
</script>

<style scoped>

</style>
