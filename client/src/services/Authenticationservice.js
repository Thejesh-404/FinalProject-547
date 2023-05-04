import Api from '@/services/Api'

export default {
    
    uploadFormData(data){
        return Api().post('item',data)
    },

    updateFormData(data,id){
        return Api().post(`item/${id}`,data)
    },

    storeUserData(data){
        return Api().post('user',data)
    },
    
    fetchUserByEmail(email){
        return Api().get(`user/${email}`)
    },

    fetchAllProducts(){
        return Api().get('items')
    },

    fetchUnSoldProducts(){
        return Api().get('items/?sold_items=false')
    },

    fetchUnSoldProductsByUser(email){
        return Api().get(`items/${email}/?sold_items=false`)
    },

    fetchSoldProductsByUser(email){
        return Api().get(`items/${email}/?sold_items=true`)
    },

    fetchSingleProduct(id){
        return Api().get(`item/${id}`)
    },

    DeleteProduct(id){
        return Api().delete(`item/${id}`)
    },

    CheckProductNameAndImage(image_data){
        console.log(image_data)
        return Api().post('/image/validate',image_data)
    }
}
