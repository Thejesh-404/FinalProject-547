import Api from '@/services/Api'

export default {
    
    uploadFormData(data){
        return Api().post('item',data)
    }
}
