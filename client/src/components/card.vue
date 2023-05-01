<template>

<div class="product">

    <router-link :to="{ name: 'product', params: { id: 1234}}">
    <div class="product-inner">
        <div class="product-text-wrap">
        </div>
        <div class="product-image-wrap">
            <img :src="product.src" class="image"/>
        </div>
        <div class="product-detail">
            <h2>{{product.title}}</h2>
        </div>
    </div>
    </router-link>


</div>

</template>



<script>


export default {

props: {
    product: {
      type: Object,
      required: true
    },     
},
methods : {

}
    
}

</script>


<style>

    .product {
        padding: 15px;
    }

    .product-inner {
        position: relative;
        padding: 25px;
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
        perspective: 1000px;
        height: 300px;
        width: 300px;
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
    padding: 25px;
    margin: 0px -25px -25px;
    }

    .product-detail h2 {
    font-size: 24px;
    font-weight: 700;
    color: #676767;
    margin-bottom: 15px;
    }

    .product-detail p {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 300;
    color: #676767;
    }



</style>