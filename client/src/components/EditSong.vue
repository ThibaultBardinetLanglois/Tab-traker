<template>
  <div>
    <v-layout column>
      <Panel title="Song metadata">
        <form>
          <v-text-field
              v-model="song[0].title"
              label="title"
              type="text"
              class="input-field"
              required
              :rules="[required]"
            />
            <br>
          <v-text-field
            v-model="song[0].artist"
            label="artist"
            type="text"
            class="input-field"
            required
            :rules="[required]"
          />
          <v-text-field
              v-model="song[0].genre"
              label="genre"
              type="text"
              class="input-field"
              required
              :rules="[required]"
            />
            <br>
          <v-text-field
            v-model="song[0].album"
            label="album"
            type="text"
            class="input-field"
            required
            :rules="[required]"
          />
          <v-text-field
              v-model="song[0].album_image"
              label="album image url"
              type="text"
              class="input-field"
              required
              :rules="[required]"
            />
            <br>
          <v-text-field
            v-model="song[0].youtube_id"
            label="youtube id"
            type="text"
            class="input-field"
            required
            :rules="[required]"
          />
          <v-text-field
              v-model="song[0].lyrics"
              label="lyrics"
              type="text"
              class="input-field"
              required
              :rules="[required]"
            />
            <br>
          <v-text-field
            v-model="song[0].tab"
            label="tab"
            type="text"
            class="input-field"
            required
            :rules="[required]"
          />
        </form>
      </Panel>

      <span class="error">
        {{ error }}
      </span>

      <v-btn
        dark
        class="cyan"
        @click="edit">
        Edit song
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
import checkToken from '@/utils/checkToken'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        album_image: null,
        youtube_id: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  components: {
    Panel
  },
  methods: {
    async edit () {
      this.error = null
      const areAllFilled = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFilled) {
        this.error = 'Please fill in all the required fields'
      }
      if (this.error === null) {
        try {
          const songId = this.$store.state.route.params.songId
          await SongsService.editSong(this.song)
          this.$router.push({
            name: 'view-song',
            params: {
              songId: songId
            }
          })
        } catch (err) {
          console.log(err)
          this.$router.push({
            name: 'login'
          })
        }
      }
    }
  },
  async mounted () {
    // do a request to check if token is expired
    await checkToken()

    try {
      const songId = this.$store.state.route.params.songId
      console.log('song ID =>', songId)
      this.song = (await SongsService.showSong(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>
