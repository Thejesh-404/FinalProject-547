<template>
    <div class="header-right" >
      <button class="user-toggle" @click="toggleUser">
        <img :src="user.picture" alt="User photo" class="user-photo">
        <div class="user-info">
          <p>{{ user.name }}</p>
          <p>{{ user.email}}</p>
        </div>
      </button>

      <div class="user-container">
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
        <button class="logout" @click="logout">Sign out</button>
      </div>  
    </div>
</template>

<script>

export default {

  data () {
    return {
      user : JSON.parse(localStorage.userdata)
    }
  },

  props: {
    onLogout: {
      type: Function,
      required: true
      }
  },

    methods: {

      toggleUser() {
      const menu = document.querySelector('.user-container');
      menu.classList.toggle('active');
      },
      logout() {
        this.onLogout();
      }
    }
  }
</script>




<style>
  .header-right {
    display: flex;
    align-items: center;
  }


  .user-toggle {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .user-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-info {
    display: none;
    position: absolute;
    top: 40px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 250px;
  }

  .user-info p {
    margin: 0;
    font-size: 14px;
    color: white;
    margin-bottom: 5px;
  }


  .user-toggle:hover .user-info {
    display: block;
  }

  .user-container {
    position: absolute;
    top: 50px;
    right: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: none;
    z-index: 1;
    width: 300px;
    height: 150px;
    align-items: center;
  }

  .user-container p {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: center;
  }


  .user-container button {
    padding: 10px;
    border: 5px;
    background-color: red;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: white;
    display: block;
    margin: 0 auto;
  }

  .user-container.active {
      display: block;
  }
</style>