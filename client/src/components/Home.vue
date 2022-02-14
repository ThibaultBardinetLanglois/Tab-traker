<template>
  <div class="home">
    <h1>HOME</h1>
  </div>
</template>

<script>
import checkToken from '@/utils/checkToken'
export default {
  async mounted () {
    // do a request to check if token is expired
    await checkToken()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
