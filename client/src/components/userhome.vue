<template>
  <header>
    <side-bar-component/>
    <search-bar-component />
    <user-bar-component :on-logout="logout"/>
  </header>
</template>

<script>

import sideBarComponent from './sidebar.vue';
import searchBarComponent from './searchbar.vue'
import userBarComponent from './userbar.vue'


export default {

  components: {
    'side-bar-component' : sideBarComponent,
    'search-bar-component' :  searchBarComponent,
    'user-bar-component' : userBarComponent,
  },
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
    }
  }
};
</script>

<style>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgba(247, 249, 247,1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 80px;
}

</style>
