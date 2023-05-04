<template>
  <div class="product">
    <div class="product-inner" ref="productInner">
      <div class="product-text-wrap">
      </div>
      <div class="product-image-wrap">
        <v-img contain height="200px" width="200px" :src="product.image" class="image"></v-img>
      </div>
      <div class="product-detail">
        <h2>{{product.productName}}</h2>
        <p>{{product.description}}</p>
      </div>
      <div class="product-options">
        <v-btn icon @click="show">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-menu v-model="showOptions"  :close-on-content-click="false" attach="#productInner"
        min-width="80px"   offset-y>
          <v-list>
            <v-list-item @click="view">
              <v-list-item-title>View</v-list-item-title>
            </v-list-item>
            <v-list-item @click="edit">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deletee">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>



<script>

import { mdiDotsVertical } from '@mdi/js';


export default {
    props: {
        product: {
        type: Object,
        required: true
        },     
    },
    data() {
        return {
            showOptions: false,
            icons: {
                mdiDotsVertical
            },
        };
    },
  methods: {
    show(){
        this.showOptions = true;
    },
    view() {
         this.$router.push(`/product/${this.product._id}`)
    },
    edit() {
       this.$router.push(`/edit/product/${this.product._id}`)
    },
    deletee() {
      // Do something when the Delete button is clicked
    },
  },   
}
</script>


<style>


    .product-inner {
        position: relative;
        padding: 25px;
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
        perspective: 2000px;
        height: 400px;
        width: 250px;
        margin-bottom: 20px;
    }

    .product-image-wrap {
    position: relative;
    z-index: 1;
    transform-origin: center;
    }
    
    .product-image-wrap .image {
    width: 100%;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25));
    }

    .product-detail {
    background-color: #FFF;
    padding: 15px;
    margin: 0px -10px -10px;
    }

    .product-detail h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
    }

    .product-detail p {
    font-size: 14px;
    font-weight: 300;
    }

    .product-options {
    position: absolute;
    top: 0;
    right: 0;
    }


</style>