<template>
    <div>
        <div v-if=itemLoaded>
            <header>
                <side-bar-component/>
            </header>
        <div class="edit-item">
          <edit-form-component :item="item"/>
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
import editFormComponent from '../components/EditItemForm.vue';
import AuthenticationService from '@/services/AuthenticationService';


export default {
    async created() {
        const url = window.location.href;
        const parts = url.split('/');
        const id = parts[parts.length - 1];
        const res = await AuthenticationService.fetchSingleProduct(id)
        this.item = res.data;
        this.itemLoaded = true;
    },

    components: {
        'side-bar-component' : sideBarComponent,
        'edit-form-component' : editFormComponent,
    },

    data () {
        return {
            item : [],
            itemLoaded: false

        }
    },
}


</script>


<style scoped>

.edit-item{
    top: 100px
}

</style>
