import Api from '@/services/Api'

export default {
    
    uploadFormData(data){
        return Api().post('item',data)
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

    fetchSingleProduct(id){
        return Api().get(`item/${id}`)
    },
}
