<template>

    <div>
    <header>
      <side-bar-component/>
    </header>
    <div class="create-item"> 
          <create-item-form/>
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

.create-item {
  top: 100px;
  right: 0px;
  
}

</style>


<script>

import sideBarComponent from '../components/sidebar.vue';
import userBarComponent from '../components/userbar.vue'
import createItemForm from '../components/CreateItemForm.vue';

export default {

  components: {
    'side-bar-component' : sideBarComponent,
    'user-bar-component' : userBarComponent,
    'create-item-form'  : createItemForm
  },


}
</script>
