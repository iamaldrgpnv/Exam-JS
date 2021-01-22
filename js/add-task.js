"use strict";
let form = document.forms.add_task;
let task = form.elements["name-of-task"];
let description = form.elements["describe-task"];
let date = form.elements.date;
// Добавление участников
let button_add = form.elements["add-participant-button"];
let participants = form.elements["add-participant-input"];
button_add.addEventListener("click", showInput);
function showInput() {
	participants.classList.toggle("hidden");
	this.innerText === "Добавить участников" ? this.innerText = "Не добавлять участников" : this.innerText = "Добавить участников";
	document.getElementById("participants_error").innerText === "" ? document.getElementById("participants_error").innerText = "" : document.getElementById("participants_error").innerText = "";
}
// Валидация
let taskRule = {
	elem: form.elements["name-of-task"],
	minLength: 6,
	lang: true,
	errorField: document.getElementById("task_error"),
}
let descriptionRule = {
	elem: form.elements["describe-task"],
	minLength: 10,
	lang: true,
	errorField: document.getElementById("describe_error")
}
let participantsRule = {
	elem: form.elements["add-participant-input"],
	minLength: 3,
	lang: true,
	comma: true,
	errorField: document.getElementById("participants_error")
}
let validator = {
	check(rule) {
		if (rule.elem.value.trim().length <= rule.minLength) {
			rule.errorField.innerText =
				'Минимальное количество символов: ' + rule.minLength;
			return false;
		}
		if (/[а-я]/i.test(rule.elem.value) != rule.lang) {
			rule.errorField.innerText = "Внимание, перекючите расскладку"
			return false;
		}
		rule.errorField.innerText = "";
		return true;
	},
	checkParticipants(rule) {
		if (rule.elem.value.trim().length <= rule.minLength) {
			rule.errorField.innerText =
				'Минимальное количество символов: ' + rule.minLength;
			return false;
		}
		if (/[а-я]/i.test(rule.elem.value) != rule.lang) {
			rule.errorField.innerText = "Внимание, перекючите расскладку"
			return false;
		}
		if (rule.elem.value.includes(",") != rule.comma) {
			rule.errorField.innerText = "Внимание, вы забыли запятые"
			return false;
		}
		rule.errorField.innerText = "";
		return true;
	}
}
// Проверка элементов
task.addEventListener("keyup", validator.check.bind(null, taskRule));
description.addEventListener("keyup", validator.check.bind(null, descriptionRule));
participants.addEventListener("keyup", validator.checkParticipants.bind(null, participantsRule))
form.addEventListener("submit", submitForm);
// Добавление объекта в LocalStorage
let iterator = 0;
function submitForm(event) {
	event.preventDefault();
	if (!validator.check(taskRule) || !validator.check(descriptionRule) ||
		!validator.checkParticipants(participantsRule)) document.getElementById("submit_error").innerText = "Проверьте корректность формы";
	else {
		console.log("Отправлено");
		participantsRule.errorField.innerText = "Отправлено!"
		let obj = {
			name: task.value.trim(),
			description: description.value.trim(),
			date: date.value.trim(),
			participants: participants.value.trim(), 
			iterator: iterator
		}
		localStorage.setItem(iterator, JSON.stringify(obj))
		iterator++;
	}
}
localStorage.clear();
// синхронизация вкладок
window.addEventListener("storage", event => {
	console.log(event);
})
// Работа с localStorage
// Работает с текущим доменом
// localStorage - глобальный объект
// localStorage.getItem() - получение объекта
// localStorage.setItem("key", "value") - установка объекта
// умеет работать только со строками
// localStorage.clear() - удаление всего localStorage
// посмотреть все значения localStorage
// devtool -> Application -> Local Storage
// К объекту применяется метод toString();
// localStorage.setItem('person', object);
// как записать объект в localstorage? JSON
// localStorage.setItem('person', JSON.stringify(object))
// // На выходе получаем строчку, но с объектом
// // Вызов объекта
// let raw = localStorage.getItem('person'); // сохранили строку в переменную
// console.log(JSON.parse(raw)); // Вызвали именно объект, с которым можно работать
// синхронизация вкладок
// window.addEventListener("storage", event => {
// 	console.log(event);
// })
// событие вызывается в том случае, если в другой вкладке 
// того же самого домена происходит запись 