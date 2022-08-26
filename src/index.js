import elementsRefs from './js/elementsRefs';
import ApiService from './js/fetchApi';
import CreateMarkup from './js/galleryListMarkup';


const refs = elementsRefs();

const apiService = new ApiService ();
const createMarkup = new CreateMarkup (refs);
let itemsOnPage = 50;
let previousQuery = '' ;

refs.form.addEventListener('submit', handleFormSubmit)
refs.buttonGallery.addEventListener('click', handleButtonClick)

function handleFormSubmit (e) {
        e.preventDefault();
        const searchQuery = e.currentTarget.searchQuery.value.trim()
        if(!searchQuery){
console.log("222")
createMarkup.insertStartMarkup("","buttonGallery");
createMarkup.insertStartMarkup("")
return
        }

        if(previousQuery===searchQuery){
            console.log("1111")
            return
        }

        previousQuery = searchQuery;
        apiService.value=searchQuery;
        apiService.itemsOnPage=itemsOnPage;
        apiService.page=1;
        createMarkup.isMarkup=false;
        fetchApiData ()
        
}


function handleButtonClick (e) {
    if(!(e.target.nodeName==='BUTTON')){
        return
    }
apiService.page+=1;
createMarkup.isMarkup=true;
fetchApiData ()
}


function fetchApiData () {
    apiService.fetchApi().then(data=>{
        if(!data.hits.length){
            return Promise.reject(new Error())
                       }
        createMarkup.data=data
        createMarkup.createListMarkup()
        console.log(data.hits.length)
        if(!(data.hits.length===itemsOnPage)){
            console.log("666")
            createMarkup.insertStartMarkup("","buttonGallery")  
          return
        }
        if(apiService.page===1){
            createMarkup.createButtonMarkup()
        }
       
     })
        .catch(error=>console.log("Sorry, there are no images matching your search query. Please try again."))
}

