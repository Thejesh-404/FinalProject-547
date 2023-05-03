import Api from '@/services/Api'

export default {
    
    uploadFormData(data){
        return Api().post('item',data)
    },

    fetchAllProducts(){
        return Api().get('items')
    },

    fetchSingleProduct(id){
        return Api().get(`item/${id}`)
    },
}
