<template>

    <div>
        <header>
            <side-bar-component/>
        </header>
        <div class="edit-item"> 
            <h1>Edit Page</h1>
        </div>
    </div>

</template>



<script>

import sideBarComponent from '../components/sidebar.vue';


export default {

    components: {
        'side-bar-component' : sideBarComponent,
    },
    data () {

    },

}




</script>
