import './css/styles.css';
// import { error, defaults } from '../node_modules/@pnotify/core/dist/PNotify.js';
import apiService from './js/apiService';
import { searchFormRef, imageGalleryRef, loadMoreBtnRef } from './js/refs';
import imageCardTemplate from './templates/image-card.hbs';

searchFormRef.addEventListener('submit', onSearchImage);
loadMoreBtnRef.addEventListener('click', onLoadMore);

// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });

function onSearchImage(e) {
  e.preventDefault();

  // if (apiService.searchQuery === '') {
  //     return alert;
  // }

  apiService.searchQuery = e.currentTarget.elements.query.value;
  clearImagesContainer();
  apiService.resetPage();
  apiService.fetchImage().then(createImageMarkup);
}

function onLoadMore() {
  apiService.fetchImage().then(createImageMarkup);
}

function createImageMarkup({ hits }) {
  imageGalleryRef.insertAdjacentHTML('beforeend', imageCardTemplate(hits));
}

function clearImagesContainer() {
  imageGalleryRef.innerHTML = '';
}

