<template>


  <div class="header">
    <div class="header-left">
     
      <button class="menu-button" @click="toggleMenu">
        <span class="menu-icon"></span>
      </button>

      <div class="user-info">
        <img :src="user.picture" alt="User photo" />
        <button class="logout-button" @click="logout">Logout</button>
      </div>

       <h2>Hi, {{ user.name }}</h2>
    </div>
    <h2>{{ user.email }}</h2>
  </div>




</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    onLogout: {
      type: Function,
      required: true
    }
  },
  methods: {
    logout() {
      this.onLogout();
    },
    toggleMenu() {
      const menu = document.querySelector('.user-info');
      menu.classList.toggle('active');
    }
  }
}
</script>

<style>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #303f9f;
  padding: 10px;
  color: #fff;
}

.header h2 {
  margin: 0;
}

.header-left {
  display: flex;
  align-items: center;
}

.menu-button {
  background-color: transparent;
  border: none;
  margin: 0 10px;
  cursor: pointer;
}

.menu-icon {
  display: block;
  width: 20px;
  height: 2px;
  background-color: #fff;
  margin: 3px 0;
  transition: all 0.3s ease-in-out;
}

.menu-icon:before,
.menu-icon:after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  transition: all 0.3s ease-in-out;
}

.menu-icon:before {
  transform: translateY(-6px);
}

.menu-icon:after {
  transform: translateY(6px);
}

.active .menu-icon {
  background-color: transparent;
}

.active .menu-icon:before {
  transform: rotate(45deg) translate(7px, 7px);
}

.active .menu-icon:after {
  transform: rotate(-45deg) translate(7px, -7px);
}

.user-info {
  position: absolute;
  top: 50px;
  right: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: none;
  z-index: 1;
}

.user-info.active {
  display: block;
}

.user-info img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info button {
  background-color: red;
  padding: 10px;
  border: 10px;
  font-size: 15px;
  color: white;
  cursor: pointer;
}
</style>
