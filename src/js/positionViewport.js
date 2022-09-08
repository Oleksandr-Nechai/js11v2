import elementsRefs from './elementsRefs';

const refs = elementsRefs();
const startpositionViewport = refs.divGallery.getBoundingClientRect();

export function scrollerByViewportWithButton () {

    const { height: cardHeight } = refs.divGallery.firstElementChild.getBoundingClientRect();
    const {height:buttonHeight}= refs.buttonGallery.getBoundingClientRect();

      window.scrollBy({
        top: (cardHeight * 2) + buttonHeight,
        behavior: 'smooth',
      });
       
    }

export function startViewport () {

        const positionViewport = refs.divGallery.getBoundingClientRect();
       
        window.scrollBy({
        top: positionViewport.top - startpositionViewport.top,
       })
    }