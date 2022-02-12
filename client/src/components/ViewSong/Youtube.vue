<template>
  <Panel title="Youtube video">
    <youtube
      :video-id="youtubeId"
      :player-width="500"
      :player-height="200">
    </youtube>
  </Panel>
</template>

<script>
import Panel from '@/components/Panel'
import VueYouTubeEmbed from 'vue-youtube-embed'
export default {
  props: [
    'youtubeId'
  ],
  components: {
    Panel,
    VueYouTubeEmbed
  }
}
</script>

<style scoped>

</style>
