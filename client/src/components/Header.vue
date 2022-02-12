<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title>Tab Tracker</v-toolbar-title>
      <v-toolbar-items>
          <router-link :to="{ name: 'home' }">
            <v-btn text dark>
                Home
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'songs' }">
            <v-btn
              text dark>
                Browse
            </v-btn>
          </router-link>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-toolbar-items>
          <router-link :to="{ name: 'login' }">
            <v-btn
              v-if="!$store.state.isUserLoggedIn"
              text dark>
                Login
            </v-btn>
          </router-link>
          <router-link :to="{name: 'register' }">
            <v-btn
              v-if="!$store.state.isUserLoggedIn"
             text dark>
                Sign Up
            </v-btn>
          </router-link>
          <v-btn
            v-if="$store.state.isUserLoggedIn"
            text
            dark
            @click="logout">
              Logout
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // redirect to homepage
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
