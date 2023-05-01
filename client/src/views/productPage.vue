<template>
    <header>
      <side-bar-component/>
      <section class="display-item">
        <display-component :item="item"/>
      </section>
    </header>
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
  right: 240px;
  top: 200px;
}


</style>

<script>
import sideBarComponent from '../components/sidebar.vue';
import userBarComponent from '../components/userbar.vue'
import displayProduct from '../components/displayProduct.vue';


import scoot from "@/assets/scoot.jpg";

export default {

  data() {
    return {
    item : {
          title: 'scoot',
          color: 'pink',
          bgtext: 'MAX',
          src: scoot
        }
    }
  },
  components: {
    'side-bar-component' : sideBarComponent,
    'user-bar-component' : userBarComponent,
    'display-component' : displayProduct
  },


}
</script>