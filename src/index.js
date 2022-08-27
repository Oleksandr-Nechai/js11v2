import elementsRefs from './js/elementsRefs';
import ApiService from './js/fetchApi';
import CreateMarkup from './js/galleryListMarkup';
import Notiflix from 'notiflix';


const refs = elementsRefs();

const apiService = new ApiService ();
const createMarkup = new CreateMarkup (refs);
const messageOptions = {width: '450px',fontSize: '22px',distance: '25px',borderRadius: '10px',timeout: 1500,};
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
Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.",messageOptions)
return
        }

        if(previousQuery===searchQuery){
            console.log("1111")
            Notiflix.Notify.info('Search already done, change selection.',messageOptions);
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
        Notiflix.Notify.success(`Hooray! We found ${data.hits.length} images.`,messageOptions);
        if(!(data.hits.length===itemsOnPage)){
            
            createMarkup.insertStartMarkup("","buttonGallery")  
            if(!(apiService.page===1)){
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.",messageOptions); 
            }
            console.log("666")
          return
        }
        if(apiService.page===1){
            createMarkup.createButtonMarkup()
        }
       
     })
        .catch(error=>Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.",messageOptions))
}

