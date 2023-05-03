<template>
  <div class="login-page">
    <h1>Campus Clearout</h1>
    <p class="subtitle">A Marketplace for Donating Unused Items</p>
    <div class="login-container">
      <GoogleLogin :callback="callback" prompt auto-login/>
    </div>
  </div>
</template>
<script>


import {decodeCredential} from 'vue3-google-login'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  methods: {
    async callback(response) {

      const user_detail_google = decodeCredential(response.credential)
      this.$emit('update-loggedIn', true)
      this.$emit('update-user', user_detail_google)
      const user = await AuthenticationService.fetchUserByEmail(user_detail_google.email)
      if(user.data!=""){
        return
      }
      else{
        const data = {
        name : user_detail_google.name,
        given_name : user_detail_google.given_name,
        family_name : user_detail_google.family_name,
        email : user_detail_google.email
        }
        const add_user = await AuthenticationService.storeUserData(data)
        console.log(add_user)
      }

    }
  }
}


</script>

<style scoped>
.login-page {
  background-color: #f6f6f6;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  color: #5d5d5d;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  color: #8e8e8e;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

</style>