const KEY = "24494931-7dc5820272f9876b2770bf0f4";
const BASE_URL = "https://pixabay.com/api/";



export default class ApiService {
    
    constructor(){
        this.searchValue="";
        this.searchPage=1;
        this.perPage=40
    }

    fetchApi () {
        return  fetch(`${BASE_URL}?key=${KEY}&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=false&page=${this.searchPage}&per_page=${this.perPage}`)
        .then(response=>{if(response.status === 404){
            return Promise.reject(new Error());
        }
        return response.json()})
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

