!function(){function e(e,t,a){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return a}function t(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function a(e,a){t(e,a),a.add(e)}var r=new WeakSet;function n(e){this.refs.divGallery.insertAdjacentHTML("beforeend",e)}const s={form:document.querySelector("#search-form"),divGallery:document.querySelector(".gallery"),buttonGallery:document.querySelector(".button-gallery")},i=new class{fetchApi(){return fetch(`https://pixabay.com/api/?key=24494931-7dc5820272f9876b2770bf0f4&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=false&page=${this.searchPage}&per_page=${this.perPage}`).then((e=>404===e.status?Promise.reject(new Error):e.json()))}get value(){return this.searchValue}set value(e){this.searchValue=e}get page(){return this.searchPage}set page(e){this.searchPage=e}get itemsOnPage(){return this.perPage}set itemsOnPage(e){this.perPage=e}constructor(){this.searchValue="",this.searchPage=1,this.perPage=40}},o=new class{insertStartMarkup(e,t="divGallery"){this.refs[t].innerHTML=e}createListMarkup(){const t=this.dataArray.hits.map((({webformatURL:e,largeImageURL:t,tags:a,likes:r,views:n,comments:s,downloads:i})=>`<div class="photo-card">\n<img width = 50 src="${e}" alt="${a}" loading="lazy" />\n<div class="info">\n  <p class="info-item">\n    <b>Likes ${r}</b>\n  </p>\n  <p class="info-item">\n    <b>Views ${n}</b>\n  </p>\n  <p class="info-item">\n    <b>Comments ${s}</b>\n  </p>\n  <p class="info-item">\n    <b>Downloads ${i}</b>\n  </p>\n</div>\n</div>`)).join("");this.isMarkup?e(this,r,n).call(this,t):this.insertStartMarkup(t)}createButtonMarkup(){console.log("555");return this.insertStartMarkup('<button type="button" class="load-more">Load more</button>',"buttonGallery")}get data(){return this.dataArray}set data(e){this.dataArray=e}get addItems(){return this.isMarkup}set addItems(e){this.isMarkup=e}constructor(e){a(this,r),this.refs=e,this.dataArray=[],this.isMarkup=!1}}(s);let l="";function c(){i.fetchApi().then((e=>e.hits.length?(o.data=e,o.createListMarkup(),console.log(e.hits.length),50!==e.hits.length?(console.log("666"),void o.insertStartMarkup("","buttonGallery")):void(1===i.page&&o.createButtonMarkup())):Promise.reject(new Error))).catch((e=>console.log("Sorry, there are no images matching your search query. Please try again.")))}s.form.addEventListener("submit",(function(e){e.preventDefault();const t=e.currentTarget.searchQuery.value.trim();if(!t)return console.log("222"),o.insertStartMarkup("","buttonGallery"),void o.insertStartMarkup("");if(l===t)return void console.log("1111");l=t,i.value=t,i.itemsOnPage=50,i.page=1,o.isMarkup=!1,c()})),s.buttonGallery.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;i.page+=1,o.isMarkup=!0,c()}))}();
//# sourceMappingURL=index.1890c5bd.js.map
