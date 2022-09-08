import elementsRefs from './js/elementsRefs';
import ApiService from './js/fetchApi';
import CreateMarkup from './js/galleryListMarkup';
import * as notification from './js/notifications';
import {scrollerByViewportWithButton,startViewport} from './js/positionViewport';
import {templateButton,templateListCards} from './js/createMarkup';
import SimpleLightbox from 'simplelightbox';
import throttle from 'lodash.throttle';

import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = elementsRefs();
const apiService = new ApiService ();
const createMarkup = new CreateMarkup (refs,templateButton,templateListCards);
const gallery = new SimpleLightbox('.gallery a',{ captionsData: 'alt', captionDelay: 250 });
const handleGalleryScroll = throttle (scrollLoader,100);

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
        rejectSearch ()
        apiService.value=searchQuery;
        return
        }

        if(apiService.value===searchQuery){
            notification.inform(); 
            return
        }
           
        perPage?apiService.itemsOnPage=perPage:apiService.itemsOnPage=40;
        
        apiService.value=searchQuery;
       
        apiService.resetPage();

        createMarkup.isMarkup=false;
      
        fetchApiData ();
        
}

async function fetchApiData () {
    try {

        goApi = false;

        notification.load();
          
        refs.buttonGallery.firstElementChild?.setAttribute('disabled', 'disabled');
        refs.formButton.setAttribute('disabled', 'disabled');
         
        const data = await apiService.fetchApi();

        notification.removeLoader();
        
        refs.buttonGallery.firstElementChild?.removeAttribute('disabled');
        refs.formButton.removeAttribute('disabled');
        
        if(!(data.totalHits)){
            throw  new Error ();
        }

        createMarkup.data=data;
        createMarkup.createListMarkup();

        notification.findImages(data.hits.length);
        gallery.refresh();
                       
        goApi = true;
        
        if(apiService.page!==1 && pageLoadingMethod === 'buttonJS') {
          scrollerByViewportWithButton ();
        }
          
        const totalHits = data.totalHits===500?data.totalHits+1:data.totalHits;
        if(totalHits<=apiService.itemsOnPage*apiService.page){
            goApi = false;
            createMarkup.insertStartMarkup("","buttonGallery");  

            if(!(apiService.page===1)){
                notification.endSearch(); 
            }
          return
        }

        if(apiService.page===1){
           
            if (pageLoadingMethod==="buttonJS") {
                onSearchByButton ()
            } else {
                onSearchByScroll ()
            }
            startViewport ();
        }
      

    }
    catch  { 
        rejectSearch ();
        goApi = false;
        notification.removeLoader();
        refs.formButton.removeAttribute('disabled');
    }
    }


    function handleButtonClick (e) {
        if(!(e.target.nodeName==='BUTTON')){
            return
        } 
        getNextPage ()
    }


function scrollLoader () {
    if (!goApi) {
        return
    } 
    const locationViewport = refs.divGallery.getBoundingClientRect();
    const heightViewport = document.documentElement.clientHeight;

       if(locationViewport.bottom<heightViewport*3)
       {
        getNextPage ()
       }
}
    
function rejectSearch () {
    createMarkup.insertStartMarkup("","buttonGallery");
    createMarkup.insertStartMarkup("");
    notification.reject();
}

function onSearchByButton () {
    refs.buttonGallery.addEventListener('click', handleButtonClick);
    document.removeEventListener ('scroll', handleGalleryScroll);
    createMarkup.createButtonMarkup();
}

function onSearchByScroll () {
    document.addEventListener('scroll', handleGalleryScroll);
    refs.buttonGallery.removeEventListener('click', handleButtonClick);
    createMarkup.insertStartMarkup("","buttonGallery");  
}

function getNextPage () {
    apiService.incrementPage ();
    createMarkup.isMarkup=true;
    fetchApiData ();
}