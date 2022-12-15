import { sectionObj } from "./content.js";


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
        createChapterElm(sectionObj.section01, '01');
        break;
      case '02':
        createChapterElm(sectionObj.section02, '02');
        break
      case '03':
        createChapterElm(sectionObj.section03, '03');
        break
      case '04':
        createChapterElm(sectionObj.section04, '04');
        break
      case '05':
        createChapterElm(sectionObj.section05, '05');
        break
      case '06':
        createChapterElm(sectionObj.section06, '06');
        break
      case '07':
        createChapterElm(sectionObj.section07, '07');
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