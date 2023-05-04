<template>

<div class="product">
    <router-link style="text-decoration: none;  color: inherit;" :to="{ name: 'product', params: { id: product._id}}">
    <div class="product-inner">
        <div class="product-text-wrap">
        </div>
        <div class="product-image-wrap">
            <v-img contain height="200px" width="200px" :src="product.image" class="image"></v-img>
        </div>
        <div class="product-detail">
            <h2>{{product.productName}}</h2>
            <p>{{product.description}}</p>
        </div>
    </div>
    </router-link>


</div>

</template>



<script>

import AuthenticationService from '@/services/AuthenticationService'

console.log("check.....")
const res = await AuthenticationService.fetchAllProducts()
console.log(res.data[0])


export default {
    props: {
        product: {
        type: Object,
        required: true
        },     
    },   
}

</script>


<style>


    .product-inner {
        position: relative;
        padding: 20px;
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
        perspective: 2000px;
        height: 350px;
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


</style>