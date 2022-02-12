<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form>
            <v-text-field
              v-model="pseudo"
              label="Pseudo"
              type="text"
              class="input-field"
              required
              ></v-text-field>
            <br>
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              class="input-field"
              required
            />
            <br>
            <v-text-field
              v-model="password"
              label="password"
              type="password"
              class="input-field"
              required
            />
          </form>
          <br>
          <div class="error" v-html="error" />
          <br>
          <v-btn
            class="cyan"
            @click="register">
            Register
          </v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      pseudo: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          pseudo: this.pseudo,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error // thanx to axios
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}

.input-field {
  color: rgb(129, 57, 196) !important;
}

</style>
