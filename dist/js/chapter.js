import { sectionObj01 } from "./section01.js";
import { sectionObj02 } from "./section02.js";
import { sectionObj03 } from "./section03.js";
import { sectionObj04 } from "./section04.js";
import { sectionObj05 } from "./section05.js";
import { sectionObj06 } from "./section06.js";
import { sectionObj07 } from "./section07.js";

//urlから表示する内容を選定
const url = location.search;
const param = url.replace('?', '').split('&');
const section = param[0].split('=')[1];
const chapter = param[1].split('=')[1];
const chapterChoose = (sec, i) => {
	switch (sec) {
		case 'section01':
			chapterElm(sectionObj01[i].content);
			break;
	}
}
//問題表示用要素
const chaptersWrap = document.createElement('ul');

const chapterElm = (data) => {
	console.log(data);
}

window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.questions').append(chaptersWrap);
	chapterChoose(section, chapter);
});