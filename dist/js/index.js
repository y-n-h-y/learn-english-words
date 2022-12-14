import { chapterObj01 } from "./section01.js";
import { chapterObj02 } from "./section02.js";
import { chapterObj03 } from "./section03.js";
import { chapterObj04 } from "./section04.js";

//window高さの取得
const winHeight = window.innerHeight;
const modalMaxHeight = winHeight * 0.9;

//モーダル要素
const modalWrap = document.createElement('div');
modalWrap.setAttribute('class', 'modalBg');
const modalBox = document.createElement('div');
const closeBtn = document.createElement('button');
modalBox.setAttribute('class', 'modalBox');
modalBox.append(closeBtn);
modalWrap.append(modalBox);
let chapterHtml = '';

const menuList = document.querySelectorAll('.menu');

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main').append(modalWrap);
  modalWrap.classList.add('isNone');
  modalWrap.setAttribute('style', `height: ${winHeight}px;`);
  modalBox.setAttribute('style', `max-height:${modalMaxHeight}px;`);
});

const createChapterElm = (chapter, num) => {
  let l = chapter.length
  for (let i = 0; i < l; i++) {
    chapterHtml += `
      <li>
        <a href="/section${num}/${chapter[i].title}.html">
          <p>${chapter[i].title}</p>
        </a>
      </li>
    `;
  }
  if (modalWrap.classList.contains('isNone')) {
    modalWrap.classList.remove('isNone');
  }
  modalBox.innerHTML = `<ul>${chapterHtml}</ul>`;
}

for (const menu of menuList) {
  menu.addEventListener('click', () => {
    const menuData = menu.dataset.words;
    switch (menuData) {
      case '01':
        createChapterElm(chapterObj01, '01');
        break;
      case '02':
        createChapterElm(chapterObj02, '02');
        break
      case '03':
        createChapterElm(chapterObj03, '03');
        break
      case '04':
        createChapterElm(chapterObj04, '04');
        break
    }
  });
}

modalWrap.addEventListener('click', (event) => {
  if (event.target.closest('.modalBox') === null) {
    chapterHtml = '';
    while (modalBox.firstChild) {
      modalBox.removeChild(modalBox.firstChild);
    }
    modalWrap.classList.add('isNone');
  }
});