import elementsRefs from './js/elementsRefs';
import ApiService from './js/fetchApi';
import CreateMarkup from './js/galleryListMarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = elementsRefs();

const apiService = new ApiService ();
const createMarkup = new CreateMarkup (refs);
const gallery = new SimpleLightbox('.gallery a',{ captionsData: 'alt', captionDelay: 250 });

const messageOptions = {width: '450px',fontSize: '22px',distance: '25px',borderRadius: '10px',timeout: 1500,};
let useScroll = false;




refs.form.addEventListener('submit', handleFormSubmit);
refs.buttonGallery.addEventListener('click', handleButtonClick);


function handleFormSubmit (e) {
        e.preventDefault();
        const searchQuery = e.currentTarget.searchQuery.value.trim();
        const perPage = Number(e.currentTarget.perPage.value.trim())
      
        if(!searchQuery){

createMarkup.insertStartMarkup("","buttonGallery");
createMarkup.insertStartMarkup("")
apiService.value=searchQuery;
Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.",messageOptions)
return
        }

        if(apiService.value===searchQuery){
          
            Notiflix.Notify.info('Search already done, change selection.',messageOptions);
            return
        }
perPage?apiService.itemsOnPage=perPage:apiService.itemsOnPage=40;
        
        apiService.value=searchQuery;
       
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


async function fetchApiData () {
    try {
        const data = await apiService.fetchApi()
     
        if(!data.hits.length){
            return Promise.reject(new Error())
                       }
        createMarkup.data=data
        createMarkup.createListMarkup()
      
        Notiflix.Notify.success(`Hooray! We found ${data.hits.length} images.`,messageOptions);
        gallery.refresh()

        scrollerByViewport ()
      
        if(!(data.hits.length===apiService.itemsOnPage)){
            createMarkup.insertStartMarkup("","buttonGallery");  
            if(!(apiService.page===1)){
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.",messageOptions); 
            }
          
          return
        }
        if(apiService.page===1){
            createMarkup.createButtonMarkup()
        }
    }
    catch {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.",messageOptions)
    }
    }
        
       
    
    


function scrollerByViewport () {

    const { height: cardHeight } = refs.divGallery.firstElementChild.getBoundingClientRect();
    const {height:buttonHeight}= refs.buttonGallery.getBoundingClientRect();

    if(!(apiService.page===1)){
     
    useScroll=true;
      
      window.scrollBy({
        top: (cardHeight * 2) + buttonHeight,
        behavior: 'smooth',
      });
       } 
       else if (useScroll) { 
        const positionViewport = document.documentElement.getBoundingClientRect()
        useScroll=false;
        window.scrollBy({
        top: positionViewport.top,
       })
    }

    }


    document.addEventListener('scroll', ()=>{
       const x = document.documentElement.getBoundingClientRect()

if(x.bottom<document.documentElement.clientHeight+150){
    apiService.page+=1;
    createMarkup.isMarkup=true;
    fetchApiData ()
}
    })