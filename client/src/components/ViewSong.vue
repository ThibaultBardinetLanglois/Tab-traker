<template>
  <div>
    <v-layout>
      <v-flex>
        <song-metadata :song="song" />
      </v-flex>

      <v-flex>
        <Lyrics :song="song" />
      </v-flex>
    </v-layout>

    <v-layout>
      <Youtube :youtubeId="song[0].youtube_id" />
      <v-flex>
        <Tab :song="song" />
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
import SongMetadata from '@/components/ViewSong/SongMetadata'
import Youtube from '@/components/ViewSong/Youtube'
import Lyrics from '@/components/ViewSong/Lyrics'
import Tab from '@/components/ViewSong/Tab'
export default {
  data () {
    return {
      song: null
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    console.log(`ID => ${songId}`)
    this.song = (await SongsService.showSong(songId)).data
    console.log(this.song)
  },
  components: {
    Panel,
    SongMetadata,
    Youtube,
    Lyrics,
    Tab
  }
}
</script>

<style scoped>

</style>
