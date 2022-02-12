<template>
  <div>
    <v-layout column>
      <Panel title="Song metadata">
        <form>
          <v-text-field
              v-model="song.title"
              label="title"
              type="text"
              class="input-field"
              required
              :rules="[required]"
            />
            <br>
          <v-text-field
            v-model="song.artist"
            label="artist"
            type="text"
            class="input-field"
            required
            :rules="[required]"
          />
          <v-text-field
              v-model="song.genre"
              label="genre"
              type="text"
              class="input-field"
              required
              :rules="[required]"
            />
            <br>
          <v-text-field
            v-model="song.album"
            label="album"
            type="text"
            class="input-field"
            required
            :rules="[required]"
          />
          <v-text-field
              v-model="song.albumImage"
              label="album image url"
              type="text"
              class="input-field"
              required
              :rules="[required]"
            />
            <br>
          <v-text-field
            v-model="song.youtubeId"
            label="youtube id"
            type="text"
            class="input-field"
            required
            :rules="[required]"
          />
          <v-text-field
              v-model="song.lyrics"
              label="lyrics"
              type="text"
              class="input-field"
              required
              :rules="[required]"
            />
            <br>
          <v-text-field
            v-model="song.tab"
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
        @click="create">
        Create song
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import SongService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImage: null,
        youtubeId: null,
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
    async create () {
      this.error = null
      const areAllFilled = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFilled) {
        this.error = 'Please fill in all the required fields'
      }
      if (this.error === null) {
        try {
          await SongService.createSong(this.song)
          // We have to redirect to the songs page
          this.$router.push({
            name: 'songs'
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
