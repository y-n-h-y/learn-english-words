import { sectionObj01 } from "./section01.js";
import { sectionObj02 } from "./section02.js";
import { sectionObj03 } from "./section03.js";
import { sectionObj04 } from "./section04.js";
import { sectionObj05 } from "./section05.js";
import { sectionObj06 } from "./section06.js";
import { sectionObj07 } from "./section07.js";

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
  modalWrap.setAttribute('style', `height: ${winHeight}px;`);//スマホ表示の高さ調整のためjsで高さ指定
  modalBox.setAttribute('style', `max-height:${modalMaxHeight}px;`);
});

//モーダル内要素を追加する関数
const createChapterElm = (chapter, num) => {
  let l = chapter.length
  for (let i = 0; i < l; i++) {
    chapterHtml += `
      <li>
        <a href="/content/?section=section${num}&content=${i}">
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

//各メニューのクリックイベント
for (const menu of menuList) {
  menu.addEventListener('click', () => {
    const menuData = menu.dataset.words;
    switch (menuData) {
      case '01':
        createChapterElm(sectionObj01, '01');
        break;
      case '02':
        createChapterElm(sectionObj02, '02');
        break
      case '03':
        createChapterElm(sectionObj03, '03');
        break
      case '04':
        createChapterElm(sectionObj04, '04');
        break
      case '05':
        createChapterElm(sectionObj05, '05');
        break
      case '06':
        createChapterElm(sectionObj06, '06');
        break
      case '07':
        createChapterElm(sectionObj07, '07');
        break
    }
  });
}

//モーダルを閉じる処理
modalWrap.addEventListener('click', (event) => {
  if (event.target.closest('.modalBox') === null) {
    chapterHtml = '';
    while (modalBox.firstChild) {
      modalBox.removeChild(modalBox.firstChild);
    }
    modalWrap.classList.add('isNone');
  }
});