import { sectionObj } from "./content.js";

//問題表示用要素
const chaptersWrap = document.createElement('ul');
const winHeight = window.innerHeight;
let questionHtml = '';

//urlから表示する内容を選定
const url = location.search;
const param = url.replace('?', '').split('&');
const section = param[0].split('=')[1];
const chapter = param[1].split('=')[1];
const chapterChoose = (sec, i) => {
	switch (sec) {
		case 'section01':
			chapterElm(sectionObj.section01[i].content);
			break;
		case 'section02':
			chapterElm(sectionObj.section02[i].content);
			break;
		case 'section03':
			chapterElm(sectionObj.section03[i].content);
			break;
		case 'section04':
			chapterElm(sectionObj.section04[i].content);
			break;
		case 'section05':
			chapterElm(sectionObj.section05[i].content);
			break;
		case 'section06':
			chapterElm(sectionObj.section06[i].content);
			break;
		case 'section07':
			chapterElm(sectionObj.section07[i].content);
			break;
	}
}

//単語と回答の要素を作成
const chapterElm = (datas) => {
	const dataLength = datas.length;
	let randomWord = [], setUnique, index = 0;
	for (const data of datas) {
		index++;
		if (randomWord.length > 0) {
			randomWord = [];
		}
		for (let i = 0; i < 4; i++) {//回答選択肢を4つ用意する
			randomWord.push(datas[Math.floor(Math.random() * dataLength)].mean);
		}
		if (randomWord.indexOf(new String(data.mean)) == -1) {//正解となる回答がない場合、正解を格納する
			setUnique = randomWord.slice(1);
			setUnique.push(data.mean);
		}
		const set = new Set(setUnique);//setWord内の重複データを削除
		for (let n = 0; set.size < 4; n++) {//set内の数が4になるまで回答選択肢を追加する
			set.add(datas[Math.floor(Math.random() * dataLength)].mean);
		}
		questionHtml += `
			<li style="height: ${winHeight}px;">
				<div class="qWord">
					<h2>${data.word}</h2>
					<div class="aList">
						<button>${[...set][0]}</button>
						<button>${[...set][1]}</button>
						<button>${[...set][2]}</button>
						<button>${[...set][3]}</button>
					</div>
				</div>
				<div class="answer">
					<p>${data.mean}</p>
					<p>${data.example !== '' ? data.example : ''}<br class="isSp"> (${data.subtext !== '' ? data.subtext : ''})</p>
				</div>
				<div class="next">
					<button class="nextBtn" data-page="${index}">つぎへ</button>
				</div>
			</li>
		`;
	}
	chaptersWrap.innerHTML = questionHtml;
	questionHtml = '';
}

window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.questions').append(chaptersWrap);
	chapterChoose(section, chapter);
	const answerBtn = document.querySelectorAll('.aList button');//回答ボタンの取得
	console.log(answerBtn);
});

window.addEventListener('load', () => {
	let pageList = document.querySelectorAll('li');
	const nextBtns = document.querySelectorAll('.nextBtn');
	let pageData;
	for (const nextBtn of nextBtns) {
		nextBtn.addEventListener('click', () => {
			pageData = nextBtn.dataset.page;
			if (pageData == nextBtns.length) {
				location.href = '/result.html'
			} else {
				pageMove(pageData);
			}
		});
	}
	window.addEventListener('resize', (pageData) => {
		pageMove(pageData);
	});
	const pageMove = (pageNum) => {//つぎへボタンを押したときのページ移動関数
		const pageWidth = pageList[0].clientWidth;
		for (const page of pageList) {
			page.style.transform = `translateX(-${pageWidth * pageNum}px)`;
		}
	}
});