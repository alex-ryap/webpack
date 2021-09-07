const gallery = document.getElementById('gallery');

export function createTemplate(item) {
  switch (item.type) {
    case 'image':
      gallery.insertAdjacentHTML('beforeend', createTemplateImage(item));
      break;
    case 'audio':
      gallery.insertAdjacentHTML('beforeend', createTemplateAudio(item));
      break;
    case 'video':
      gallery.insertAdjacentHTML('beforeend', createTemplateVideo(item));
      break;
  }
}

function createTemplateImage(item) {
  return `
    <div class="gallery__item">
      <img class="gallery__item-img" src="${item.src}" alt="photo" />
      <p class="gallery__item-title">${item.title}</p> 
    </div>
  `;
}

function createTemplateAudio(item) {
  return `
    <div class="gallery__item">
      <div class="gallery__item-top">
        <audio src="${item.src}" controls></audio>
      </div>
      <p class="gallery__item-title">${item.title}</p> 
    </div>
  `;
}

function createTemplateVideo(item) {
  return `
    <div class="gallery__item">
      <div class="gallery__item-top">
        <video class="gallery__item-video" src="${item.src}" controls></video>
      </div>
      <p class="gallery__item-title">${item.title}</p> 
    </div>
  `;
}
