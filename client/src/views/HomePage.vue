<template>
  <div v-if=loggedIn class="parent">
    <section>
      <UserProfile :user="user" :on-logout="logout"  class="component1"/>
    </section>

    <section class="products">
      <Products
      v-for="item in items" 
      :key ="item.color"
      :product="item"
      class="item"
      />

    </section>
    <button class="donate-btn" @click="redirectToCreate">+</button>
    <section class="donate">
    </section>


  </div>
    <div v-else>
      <LoginWrapper @update-loggedIn="updateLoggedIn" @update-user="updateUser"/>
    </div>
</template>

<script>
import {decodeCredential,googleLogout} from 'vue3-google-login'
import UserProfile from '../components/userhome.vue'
import LoginWrapper from '../components/userlogin.vue'
import Products from '../components/card.vue'

import greenShop from "@/assets/green-shoe.png";
import blueShop from "@/assets/blue-shoe.png";
import pinkShop from "@/assets/pink-shoe.png";
import scoot from "@/assets/scoot.jpg";



let log_status = false;
let user_data = null;

if(localStorage.isloggedIn){
  if(localStorage.isloggedIn==='true') log_status = true
  else log_status = false
}

if(localStorage.userdata){
  user_data = JSON.parse(localStorage.userdata);
}

console.log("starting: ")
console.log(log_status)
console.log(user_data)

export default {

  components: {
    UserProfile,
    LoginWrapper,
    Products
  },
  data () {
    return {
      loggedIn: log_status,
      user: user_data,
      items: [
        {
          title: 'Nike Air Max',
          color: 'green',
          bgtext: 'NIKE',
          src: greenShop
        },
        {
          title: 'Nike flex',
          color: 'blue',
          bgtext: 'AIR',
          src: blueShop
        },
        {
          title: 'Nike Roche Runs',
          color: 'pink',
          bgtext: 'MAX',
          src: pinkShop
        },
        {
          title: 'scoot',
          color: 'pink',
          bgtext: 'MAX',
          src: scoot
        }
      ]
    }
  },
  methods: {

    logout() {
      googleLogout()
      this.loggedIn = false
      localStorage.setItem('isloggedIn',false)
      localStorage.setItem('userdata',null)
    },
    updateLoggedIn(value) {
      localStorage.setItem('isloggedIn',value)
      this.loggedIn = value
    },

    updateUser(value) {

      let req_value = {
        name : value.name,
        given_name : value.given_name,
        family_name : value.family_name,
        picture : value.picture,
        email : value.email
      }

      console.log(req_value)


      this.user = req_value
      localStorage.setItem('userdata', JSON.stringify(req_value))
    },
    redirectToCreate() {
      this.$router.push('/create')
    } 
    
  },

}

</script>

<style scoped>


.products {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  top: 100px;
  left: 150px;
  flex-wrap: wrap;
}

.item {
  width: 33.33%; /* Each item takes up one-third of the container width */
  box-sizing: border-box;
}

.donate-btn {
  color: white;
  background-color: rgb(147, 187, 210);
  padding: 10px;
  position: fixed;
  bottom: 70px;
  left: 1350px;
  border-radius: 50%; /* Set border-radius to 50% to make it circular */
  width: 60px;
  height: 60px;
  font-size: 32px;
}

.donate-btn::after {
  content: "Donate an item"; 
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8); 
  color: white;
  padding: 5px;
  border-radius: 5px; 
  position: absolute; 
  bottom: 70px;
  left: -45px; 
  font-size: 12px;
}

.donate-btn:hover::after {
  visibility: visible; /* Show the tooltip on hover */
}
</style>