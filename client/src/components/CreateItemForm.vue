<template>
  <div class="form-container">
    <form class="form" @submit.prevent="submitForm">
      <h2>Product Form</h2>
      <div class="form-group">
        <label for="product-name">Product Name:</label>
        <input type="text" id="product-name" v-model="productName" required>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label for="pickup-location">Pickup Location:</label>
        <input type="text" id="pickup-location" v-model="pickupLocation" required>
      </div>
      <div class="form-group">
        <label for="photo">Photo:</label>
        <input type="file" id="image" accept="image/*" @change="handleFileUpload">
      </div>
      <button type="submit" id="button">Submit</button>
    </form>
  </div>
</template>



<script>

import AuthenticationService from '@/services/AuthenticationService'

export default {
  data() {
    return {
      productName: '',
      description: '',
      pickupLocation: '',
      image: null,
    };
  },
  methods: {

    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.image = reader.result;
      };

      reader.readAsDataURL(file);
    }, 

    async submitForm() {
      
      const formData = {
        productName : this.productName,
        description : this.description,
        pickupLocation : this.pickupLocation,
        image: this.image,
      };


      console.log(formData);

      try {
        const response = await  AuthenticationService.uploadFormData(formData)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }

    },

  }
};
</script>






<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  align-items: center;
  height: 550px;
  width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 30px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

#button {
    width: 460px;
}

button[type="submit"] {
  background-color: #008CBA;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #006B8F;
}
</style>
