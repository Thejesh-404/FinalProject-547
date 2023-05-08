<template>
  <div class="display-item">
    <img :src="items.image" class="item-photo">
    <div class="item-details">
      <h2 class="item-name">{{ items.productName }}</h2>
      <p class="item-description">{{ items.description }}</p>
      <p class="pickup-location">Pickup Location: {{ items.pickupLocation }}</p>
      <p class="condition">condition: {{items.condition }}</p>
      <button class="contact-seller-btn" @click="ownerDetails">Contact the Seller</button>
      <div>
        <h4>{{owner}}</h4>
      </div>
    </div>
  </div>


</template>

<script>



export default {
  props: {
    items: {
      type: Object,
      required: true
    }
  },
  data (){
    return {
      owner: ''
    }
  },
  methods: {
    ownerDetails(){
      this.owner = this.items.owner;
    }

  }
}
</script>

<style scoped>

.display-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.item-photo {
  width: 200px;
  margin-right: 20px;
}

.item-name {
  font-size: 24px;
  margin-bottom: 10px;
}

.item-description {
  margin-bottom: 10px;
}

.pickup-location {
  margin-bottom: 10px;
}

.contact-seller-btn {
  margin-top: 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.contact-seller-btn:hover {
  background-color: #0069d9;
}
</style>
