import elementsRefs from './js/elementsRefs';
import ApiService from './js/fetchApi';
import CreateMarkup from './js/galleryListMarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import throttle from 'lodash.throttle';

import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = elementsRefs();

const apiService = new ApiService ();
const createMarkup = new CreateMarkup (refs);
const gallery = new SimpleLightbox('.gallery a',{ captionsData: 'alt', captionDelay: 250 });

const handleGalleryScroll = throttle (scrollLoader,100);

const messageOptions = {timeout: 1000,width: '450px',fontSize: '22px',distance: '25px',borderRadius: '10px',};

const startpositionViewport = refs.divGallery.getBoundingClientRect();


let goApi = true;

let pageLoadingMethod = 'buttonJS';


refs.form.addEventListener('submit', handleFormSubmit);
refs.formLoad.addEventListener('change', handleLoadChange );

function handleLoadChange(e) {
    pageLoadingMethod = e.target.value;
    switch (pageLoadingMethod) {

            case "buttonJS":
                refs.formItemsOnPage.removeAttribute('disabled');
                refs.formItemsOnPage.value = '';
              break;
          
            case "scrollJS":
                refs.formItemsOnPage.setAttribute('disabled', 'disabled');
                refs.formItemsOnPage.value = 40;
              break;

          
            default:
              return
          }
}


function handleFormSubmit (e) {
        e.preventDefault();
       
        const searchQuery = e.currentTarget.searchQuery.value.trim();
        const perPage = Number(e.currentTarget.perPage.value.trim());
        

      
        if(!searchQuery){
        createMarkup.insertStartMarkup("","buttonGallery");
        createMarkup.insertStartMarkup("")
        apiService.value=searchQuery;
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.",messageOptions)
        return
        }

        if(apiService.value===searchQuery){

            Notiflix.Notify.info("Search already done, change selection.",messageOptions);
            return
        }
           
        perPage?apiService.itemsOnPage=perPage:apiService.itemsOnPage=40;
        
        apiService.value=searchQuery;
       
        apiService.resetPage ();
        createMarkup.isMarkup=false;
      
        fetchApiData ()
        
}

async function fetchApiData () {
    try {
        goApi = false;
        Notiflix.Loading.hourglass({
            svgColor: '#65dcce',
            svgSize: '100px',
            backgroundColor: 'rgba(0,0,0,0.3)',
          });
          refs.buttonGallery.firstElementChild?.setAttribute('disabled', 'disabled');
          refs.formButton.setAttribute('disabled', 'disabled');
        const data = await apiService.fetchApi()
        Notiflix.Loading.remove();
        refs.buttonGallery.firstElementChild?.removeAttribute('disabled');
        refs.formButton.removeAttribute('disabled');
        
        if(!(data.totalHits)){
            throw  new Error ();
        }
        createMarkup.data=data
        createMarkup.createListMarkup()

        Notiflix.Notify.success(`Hooray! We found ${data.hits.length} images.`,messageOptions);
        gallery.refresh()
                       
        goApi = true;
        
        if(apiService.page!==1 && pageLoadingMethod === 'buttonJS') {
          scrollerByViewportWithButton ()
        }
          
        const totalHits = data.totalHits===500?data.totalHits+1:data.totalHits;
        if(totalHits<=apiService.itemsOnPage*apiService.page){
            goApi = false;
            createMarkup.insertStartMarkup("","buttonGallery");  
            if(!(apiService.page===1)){
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.",messageOptions); 
            }

          return
        }

        if(apiService.page===1){
           
            if (pageLoadingMethod==="buttonJS") {
                refs.buttonGallery.addEventListener('click', handleButtonClick);
                document.removeEventListener ('scroll', handleGalleryScroll);
                createMarkup.createButtonMarkup()
    
            } else {
                document.addEventListener('scroll', handleGalleryScroll);
                refs.buttonGallery.removeEventListener('click', handleButtonClick);
                createMarkup.insertStartMarkup("","buttonGallery");  
            }
            startViewport ()
        }
      

    }
    catch  { 
        goApi = false;
        createMarkup.insertStartMarkup("","buttonGallery"); 
        createMarkup.insertStartMarkup("");
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.",messageOptions);
        Notiflix.Loading.remove();
        refs.buttonGallery.firstElementChild?.removeAttribute('disabled');
        refs.formButton.removeAttribute('disabled');
    }
    }



function scrollerByViewportWithButton () {

    const { height: cardHeight } = refs.divGallery.firstElementChild.getBoundingClientRect();
    const {height:buttonHeight}= refs.buttonGallery.getBoundingClientRect();

      window.scrollBy({
        top: (cardHeight * 2) + buttonHeight,
        behavior: 'smooth',
      });
       
    }

    function startViewport () {
        const positionViewport = refs.divGallery.getBoundingClientRect();
       
        window.scrollBy({
        top: positionViewport.top - startpositionViewport.top,
       })
    }

    function handleButtonClick (e) {
        if(!(e.target.nodeName==='BUTTON')){
            return
        } 
        
    apiService.incrementPage ()
    createMarkup.isMarkup=true;
    fetchApiData ()
    }


function scrollLoader () {
    if (!goApi) {
        return
    } 
    const locationViewport = refs.divGallery.getBoundingClientRect();
    const heightViewport = document.documentElement.clientHeight;

       if(locationViewport.bottom<heightViewport*3)
       {
        
           apiService.incrementPage ()
           createMarkup.isMarkup=true;
           fetchApiData ()
       }
}
    

