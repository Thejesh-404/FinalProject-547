<template>
    <div>
        <header>
            <side-bar-component/>
        </header>
        <div v-if=itemsLoaded>
            <div class="list-item"> 
                <h2 id="check">Listings:</h2>
                <div v-if="items.length!=0" class="products">
                <Products
                v-for="item in items" 
                :key ="item._id"
                :product="item"
                class="item"
                />
                </div>
                <div v-else class="message">
                <h1>No,Listings Yet....!</h1>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="message-loading">
            <h1>Loading...</h1>
            </div>
        </div>
    </div>
</template>

<script>

import sideBarComponent from '../components/sidebar.vue';
import userBarComponent from '../components/userbar.vue'
import Products from '../components/listing-card.vue'

import AuthenticationService from '@/services/AuthenticationService'

export default {

    async created() {
        const res = await AuthenticationService.fetchAllProducts();
        this.items = res.data;
        this.itemsLoaded = true; 
    },
    
    components: {
        'side-bar-component' : sideBarComponent,
        'user-bar-component' : userBarComponent,
        'Products' : Products,
    },

    data () {
    return {
      items: [],
      itemsLoaded: false,
    }
  },


}
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

#check{
    top: 100px;
}


.products {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  top: 100px;
  left: 150px;
  flex-wrap: wrap;
}

.message-loading {
  top: 400px;
  left: 700px;
}

.message {
  top: 400px;
  left: 550px;
}

.item {
  width: 25%; /* Each item takes up one-third of the container width */
  box-sizing: border-box;
}

</style>
