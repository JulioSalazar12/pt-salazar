import https from '@/core/http-common'

class DataTableService {    

    getAll(){
        return https.get('/films');
    }    

}

export default new DataTableService();