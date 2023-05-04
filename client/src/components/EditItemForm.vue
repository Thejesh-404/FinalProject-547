<template>
  <div class="form-container">
    <form class="form" @submit.prevent="submitForm">
      <h2>Edit Item</h2>
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
        <label for="condition">Condition:</label>
        <select id="condition" v-model="condition">
          <option value="">Select Condition</option>
          <option value="Brand New">Brand New</option>
          <option value="Almost New">Almost New</option>
          <option value="Used">Used</option>
          <option value="Well Used">Well Used</option>
        </select>
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="category">
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Tools">Tools</option>
        </select>
      </div>
      <button type="submit" id="button">Submit</button>
      <div v-if="Message" class="message">{{ Message }}</div>
    </form>
   
  </div>
</template>


<script>

import AuthenticationService from '@/services/AuthenticationService'


export default {

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      productName: this.item.productName,
      description: this.item.description,
      pickupLocation: this.item.pickupLocation,
      condition: this.item.condition,
      category: this.item.category,
      Message: null,
    };
  },

  methods: {


    async submitForm() {
      
      const formData = {
        productName : this.productName,
        description : this.description,
        pickupLocation : this.pickupLocation,
        condition : this.condition,
        category : this.category,
        owner: JSON.parse(localStorage.userdata).email,
        isSold: false,
      };

      const url = window.location.href;
      const parts = url.split('/');
      const id = parts[parts.length - 1];

      const response = await  AuthenticationService.updateFormData(formData,id)

      if (response && response.data.message) {
        this.Message = 'Product Details Updated Successfully';
      }
      else {
        this.Message = 'There seems to be an error. Try Again....'
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
  height: 680px;
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
  margin-bottom: 25px;
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

.message {
  color: red;
  margin-top: 20px;
  margin-left: 120px;

}


label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

select {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}




</style>


