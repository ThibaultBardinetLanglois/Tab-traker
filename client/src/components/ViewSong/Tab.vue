<template>
  <Panel title="Tabs">
    <textarea
      readonly
      v-model="song[0].tab"
    ></textarea>
  </Panel>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  props: [
    'song'
  ],
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
