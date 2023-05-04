<template>
    <div>
        <header>
            <side-bar-component/>
        </header>
        <div v-if=itemsLoaded>
            <div class="list-item"> 
                <h2 id="check">Listings:</h2>
                <div v-if="items_unsold.length!=0" class="products">
                <Products
                v-for="item in items_unsold" 
                :key ="item._id"
                :product="item"
                class="item"
                />
                </div>
                <div v-else class="message">
                <h1>No,Listings Yet....!</h1>
                </div>
            </div>
            <div class="list-item">
              <h2 id="check">Sold Items:</h2>
              <div v-if="items_sold.length!=0" class="products">
              <soldProducts
                v-for="item in items_sold" 
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
import soldProducts from '../components/card.vue'
import AuthenticationService from '@/services/AuthenticationService'

export default {

    async created() {
        const res1 = await AuthenticationService.fetchUnSoldProductsByUser(JSON.parse(localStorage.userdata).email);
        this.items_unsold = res1.data;
        const res2 = await AuthenticationService.fetchSoldProductsByUser(JSON.parse(localStorage.userdata).email);
        this.items_sold = res2.data;
        this.itemsLoaded = true; 
    },
    
    components: {
        'side-bar-component' : sideBarComponent,
        'user-bar-component' : userBarComponent,
        'Products' : Products,
        'soldProducts' : soldProducts
    },

    data () {
    return {
      items_unsold: [],
      items_sold: [],
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
    left: 50px;
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

.message{
  top:100px;
  left: 300px;
}

.item {
  width: 30%; /* Each item takes up one-third of the container width */
  box-sizing: border-box;
}

</style>
