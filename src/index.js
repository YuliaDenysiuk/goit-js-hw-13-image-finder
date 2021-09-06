import './css/styles.css';
import { error, defaults } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import apiService from './js/apiService.js';
import { searchFormRef, imageGalleryRef, loadMoreBtnRef } from './js/refs.js';
import imageCardTemplate from './templates/image-card.hbs';

searchFormRef.addEventListener('submit', onSearchImage);
loadMoreBtnRef.addEventListener('click', onLoadMore);

defaults.delay = 2000;

function onSearchImage(e) {
  e.preventDefault();

  apiService.searchQuery = e.currentTarget.elements.query.value;
 
  if (apiService.searchQuery === '') {
    catchError();
    return;
  }

  clearImagesContainer();
  apiService.resetPage();
  apiService.fetchImage()
    .then(({ hits }) => {
      createImageMarkup({ hits });
      imageGalleryRef.addEventListener('click', onModalOpen);
    })
    .catch(err => console.log(err));
}

function onLoadMore() {
  apiService.fetchImage()
    .then(({ hits }) => {
      createImageMarkup({ hits });
      imageGalleryRef.addEventListener('click', onModalOpen);
      scrollImages();
    })
    .catch(err => console.log(err));
}

function onModalOpen(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const src = e.target.dataset.source;
  const modal = basicLightbox.create(`
    <div class="modal">
        <img src="${src}" width="800" height="600"></img>
    </div>
  `);
  modal.show();
}

function catchError() {  
  error({
    text: 'Please enter a more specific query!',
  })  
  imageGalleryRef.innerHTML = "";
  loadMoreBtnRef.classList.add('is-hidden');
}

function clearImagesContainer() {
  imageGalleryRef.innerHTML = '';
}

function createImageMarkup({ hits }) {
  imageGalleryRef.insertAdjacentHTML('beforeend', imageCardTemplate(hits));
  loadMoreBtnRef.classList.remove('is-hidden');
}

function scrollImages() {
  loadMoreBtnRef.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
  });
}
