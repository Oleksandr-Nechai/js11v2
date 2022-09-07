import {templateButton,templateListCards} from "./createMarkup"


export default class CreateMarkup {
  #buttonMarkup;
  #listCardsMarkup;
    constructor(refs){
this.#buttonMarkup= templateButton;
this.#listCardsMarkup=templateListCards;

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
       
    const stringListMarkup = this.dataArray.hits.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads})=>(this.#listCardsMarkup({largeImageURL,webformatURL,tags,likes,views,comments,downloads}))).join('');
       
    this.isMarkup?this.#insertContinueMarkup(stringListMarkup):this.insertStartMarkup(stringListMarkup);

    }

    createButtonMarkup () {
    return this.insertStartMarkup(this.#buttonMarkup(),'buttonGallery')
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

