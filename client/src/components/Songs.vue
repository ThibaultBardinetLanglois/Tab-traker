<template>
  <div>
    <v-layout column>
      <v-flex>
        <song-bookmarks />
      </v-flex>
      <v-flex xs6 offset-xs3>
        <Panel title="Songs">
          <v-text-field
            label="Search by song title, artist, album or genre"
            type="search"
            v-model="searchKey"
          ></v-text-field>

          <router-link :to="{ name: 'songs-create' }">
            <v-btn text>
                +
            </v-btn>
          </router-link>
          <div
            v-for="song in filteredList"
            :key="song.id">
            <div class="song-title">
              {{ song.title }}
            </div>
            <div class="song-artist">
              {{ song.artist }}
            </div>
            <div class="song-genre">
              {{ song.genre }}
            </div>

            <router-link
              :to="{
                name: 'view-song',
                params: {
                  songId: song.id
                }
              }">
              <v-btn text>
                  View
              </v-btn>
            </router-link>

            <div class="album-image">
              <img :src="song.album_image" />
            </div>
          </div>
        </Panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
import SongBookmarks from './SongBookmarks.vue'
export default {
  components: {
    Panel,
    SongBookmarks
  },
  data () {
    return {
      songs: '',
      searchKey: ''
    }
  },
  async mounted () {
    // do a request to the backend for all the songs
    this.songs = (await SongsService.getAllSongs()).data
    console.log('SONGS =>', this.songs)
  },
  computed: {
    filteredList () {
      if (this.songs.length) {
        return this.songs.filter((song) => {
          return song.title.toLowerCase().includes(this.searchKey.toLowerCase()) ||
                 song.artist.toLowerCase().includes(this.searchKey.toLowerCase()) ||
                 song.genre.toLowerCase().includes(this.searchKey.toLowerCase()) ||
                 song.album.toLowerCase().includes(this.searchKey.toLowerCase())
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
