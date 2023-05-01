<template>
  <div class="display-item">
    <img :src="item.src" class="item-photo">
    <div class="item-details">
      <h2 class="item-name">{{ item.bgtext }}</h2>
      <p class="item-description">{{ item.title }}</p>
      <p class="pickup-location">Pickup Location: {{ item.color }}</p>
      <button class="contact-seller-btn">Contact the Seller</button>
    </div>
  </div>


</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
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
