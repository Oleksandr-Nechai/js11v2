export default class CreateMarkup {
    constructor(refs){
this.refs=refs;
this.dataArray=[];
this.isMarkup=false;
    }

    insertStartMarkup (string,position="divGallery") {
        this.refs[position].innerHTML=string;
    }


    #insertContinueMarkup (string) {
      this.refs.divGallery.insertAdjacentHTML('beforeend',string)
      
    }
    createListMarkup () {
       
        const stringListMarkup = this.dataArray.hits.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads})=>
        `<a class="gallery-item" href="${largeImageURL}" >
        <div class="gallery-card">
<div class="gallery-photo">
<img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
</div>
<div class="gallery-info">
  <p class="gallery-info-item">
    <b>Likes</b>
    ${likes}
  </p>
  <p class="gallery-info-item">
    <b>Views</b>
    ${views}
  </p>
  <p class="gallery-info-item">
    <b>Comments</b>
    ${comments}
  </p>
  <p class="gallery-info-item">
    <b>Downloads</b>
    ${downloads}
  </p>
</div>
</div>
</a>`).join('');

this.isMarkup?this.#insertContinueMarkup(stringListMarkup):this.insertStartMarkup(stringListMarkup);

    }

    createButtonMarkup () {
      
      const button =`<button type="button" class="load-button">Load more</button>`;
            return this.insertStartMarkup(button,'buttonGallery')
    }
  

 get data () {
    return this.dataArray;
 }

 set data (newdata) {
    this.dataArray=newdata;
 }

 get addItems () {
  return this.isMarkup
 }

 set addItems (boolean) {
  this.isMarkup=boolean;
 }
}

