import axios from 'axios';

const KEY = "24494931-7dc5820272f9876b2770bf0f4";
const BASE_URL = "https://pixabay.com/api/";



export default class ApiService {
    
    constructor(){
        this.searchValue="";
        this.searchPage=1;
        this.perPage="";
    }

    
   async fetchApi () {
    const paramsAxios = {
        timeout: 5000,
        params:{
            key:KEY,
            q:this.searchValue,
            image_type:"photo",
            orientation: "horizontal",
            safesearch:false,
            page:this.searchPage,
            per_page:this.perPage

        }
    }
        const response = await axios.get(`${BASE_URL}`,paramsAxios);
        if(response.status === 404){
            return Promise.reject(new Error());
        }
        return response.data}

     resetPage () {
        this.searchPage=1;
        
     }

     incrementPage () {
        this.searchPage+=1;
     }
get value () {
   return this.searchValue;
}
set value (newValue) {
    this.searchValue=newValue;
}
get page () {
    return this.searchPage
}
set page (newPage) {
 this.searchPage=newPage
}
get itemsOnPage () {
    return this.perPage
}
set itemsOnPage (newItemsOnPage) {
  this.perPage=newItemsOnPage;
}

}

