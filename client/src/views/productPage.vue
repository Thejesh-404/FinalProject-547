<template>

    <div>

      <div v-if=itemsLoaded>
        <header>
          <side-bar-component/>
        </header>
        <div class="display-item">
          <display-component :items="items"/>
        </div>
      </div>

      <div v-else>
        <div class="message-loading">
          <h1>Loading...</h1>
        </div>
      </div>

    </div>

</template>


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

.display-item {
  width: 600px;
  height: 400px;
  left: 200px;
  top: 100px;
}

.message-loading {
  top: 400px;
  left: 700px;
}

</style>

<script>
import sideBarComponent from '../components/sidebar.vue';
import userBarComponent from '../components/userbar.vue'
import displayProduct from '../components/displayProduct.vue';

import AuthenticationService from '@/services/AuthenticationService'


export default {

  async created() {
        const url = window.location.href;
        const parts = url.split('/');
        const id = parts[parts.length - 1];
        const res = await AuthenticationService.fetchSingleProduct(id)
        this.items = res.data;
        console.log(typeof res.data)
        this.itemsLoaded = true; 
  },

  data() {
    return {
      items : null,
      itemsLoaded: false,
    }
  },
  components: {
    'side-bar-component' : sideBarComponent,
    'user-bar-component' : userBarComponent,
    'display-component' : displayProduct
  },


}
</script>