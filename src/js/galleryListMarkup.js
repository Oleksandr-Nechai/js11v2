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
        `<div class="photo-card">
<div class="info-card">
<img class="info-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
</div>
<div class="info">
  <p class="info-item">
    <b>Likes</b>
    ${likes}
  </p>
  <p class="info-item">
    <b>Views</b>
    ${views}
  </p>
  <p class="info-item">
    <b>Comments</b>
    ${comments}
  </p>
  <p class="info-item">
    <b>Downloads</b>
    ${downloads}
  </p>
</div>
</div>`).join('');

this.isMarkup?this.#insertContinueMarkup(stringListMarkup):this.insertStartMarkup(stringListMarkup);

    }

    createButtonMarkup () {
      console.log("555")
      const button =`<button type="button" class="load-more">Load more</button>`;
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

