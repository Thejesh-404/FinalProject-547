<template>
      <div class="header-left" >

      <button class="menu-toggle" @click.stop="toggleMenu">☰</button>
      <div class="side-bar">
        <h2>Hi,{{user.given_name}}</h2>
        <hr>
        <router-link to="/myitems" class="my-items-btn">My items</router-link>
         <router-link to="/message" class="my-items-btn">Messages</router-link>
      </div>
      <div class="logo" @click="redirectToHome">
        <img :src="logo">
      </div>


    </div>
</template>


<script>

import logo from '../assets/logo-usc.png'

export default {

    data () {
    return {
      user : JSON.parse(localStorage.userdata),
      logo : logo
    }
    },
    mounted() {
    document.addEventListener('click', (event) => {
      const menu = document.querySelector('.side-bar');
      if (!menu.contains(event.target)) {
        this.closeSidebar();
      }
    });
    },
  methods: {
      toggleMenu() {
      const menu = document.querySelector('.side-bar');
      menu.classList.toggle('active');
      },
      closeSidebar() {
        const menu = document.querySelector('.side-bar');
        menu.classList.remove('active');
      },
      redirectToHome() {
      this.$router.push('/')
      },
      redirectToMyItems(){
        this.$router.push('/myitems')
      } 
    }

}

</script>


<style>

.header-left {
  display: flex;
}

.menu-toggle {
  font-size: 30px;
  border: none;
  background-color: transparent;
  margin-right: 20px;
}

.side-bar.active {
  display: block;
  left: 0;
}

.side-bar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 9999;
  overflow-y: auto;
}

.side-bar h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.side-bar hr {
  margin: 20px 0;
  border: none;
  border-bottom: 1px solid #ccc;
}

#cross-button {
  border: none;
  left: 180px;
  font-size: 30px;
  color: red;
  margin-right: 20px;
  cursor: pointer;
}

.logo {
  width: 40px; 
  height: 40px; 
  margin-left: 10px;
  display: flex;
  align-items: center; 
}
.logo img {
  width: 100%; /* to make sure the image fits within the container */
  height: 100%; /* to make sure the image fits within the container */
}

.my-items-btn {
  display: block;
  padding: 10px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

</style>
