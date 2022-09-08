export default class CreateMarkup {

  #buttonMarkup;
  #listCardsMarkup;

    constructor(refs,templateButton,templateListCards){

   this.#buttonMarkup= templateButton;
   this.#listCardsMarkup=templateListCards;

   this.refs=refs;
   this.dataArray=[];
   this.isMarkup=false;

    }

    #insertContinueMarkup (string) {
      this.refs.divGallery.insertAdjacentHTML('beforeend',string)
      
    }

    insertStartMarkup (string,position="divGallery") {
        this.refs[position].innerHTML=string;
    }

    createListMarkup () {
    const stringListMarkup = this.dataArray.hits.map(this.#listCardsMarkup).join('');
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

