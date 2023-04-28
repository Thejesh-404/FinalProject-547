<template>
  <div v-if="loggedIn">
   <UserProfile :user="user" :on-logout="logout" />
  </div>
  <div v-else>
    <LoginWrapper @update-loggedIn="updateLoggedIn" @update-user="updateUser"/>
  </div>
</template>

<script>
import {decodeCredential,googleLogout} from 'vue3-google-login'
import UserProfile from '../components/userhome.vue'
import LoginWrapper from '../components/userlogin.vue'


export default {
  components: {
    UserProfile,
    LoginWrapper
  },
  data () {
    return {
      loggedIn: false,
      user: null,
    }
  },
  methods: {

    logout() {
      googleLogout()
      this.loggedIn = false
    },
    updateLoggedIn(value) {
      this.loggedIn = value
    },
    updateUser(value) {
      this.user = value
    }
    
  },

}

</script>

<style scoped>
</style>