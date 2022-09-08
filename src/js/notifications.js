import Notiflix from 'notiflix';

const messageOptions = {timeout: 1500,width: '450px',fontSize: '22px',distance: '25px',borderRadius: '10px',};

export function inform () {
    return Notiflix.Notify.info("Search already done, change selection.",messageOptions);
}

export function endSearch () {
    return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.",messageOptions);
}

export function reject () {
    return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.",messageOptions);
}

export function load () {
    return Notiflix.Loading.hourglass({
        svgColor: '#65dcce',
        svgSize: '100px',
        backgroundColor: 'rgba(0,0,0,0.3)',
      });
}

export function removeLoader () {
   return Notiflix.Loading.remove();
}


export function findImages (amount) {
    return Notiflix.Notify.success(`Hooray! We found ${amount} images.`,messageOptions);
}