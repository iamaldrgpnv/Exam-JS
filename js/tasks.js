"use strict";
// Создание задач
let num = 0;
let arr = [];
let mainDiv = document.getElementById("tasks-container");
for (num; num < localStorage.length; num++) {
	let task = JSON.parse(localStorage.getItem(num));
	let div = document.createElement("div");
	div.classList.add("card");
	div.dataset.date = task.date;
	div.dataset.key = num;
	div.innerHTML = `
			<h3>${task.name}</h3>
			<p>${task.description}</p>
			<p>Срок выполнения: ${task.date}</p>
			<p>Участники: ${task.participants}</p>
	`
	mainDiv.append(div);
	arr.push(task);
	// num++;
}
// Добавление класса удалить
let deleteButton = document.querySelector(".delete-button")
mainDiv.addEventListener("click", addDeleted)
function addDeleted(event) {
	let clickElem = event.target;
	if (clickElem.dataset.date) {
		clickElem.classList.toggle("deleted");
	}
}
// Удаление
deleteButton.addEventListener("click", deleteFunc);
function deleteFunc() {
	let arr = document.querySelectorAll(".deleted");
	for(let element of arr){
		element.remove();
		let index = element.dataset.key;
		localStorage.removeItem(index);
	}
}
// Сортировка по убыванию
let decrease = document.getElementById("decrease");
decrease.addEventListener("click", decFunc);
function decFunc() {
	let divs = document.querySelectorAll("#tasks-container div.card");
	// console.log(divs);
	let sorted = [...divs].sort(function (a, b) { // Работа с node элементами
		return a.dataset.date < b.dataset.date ? 1 : -1;
	});
	mainDiv.innerHTML = ``;
	for (let div of sorted) mainDiv.appendChild(div); // Внимание, работа с переменной sorted
}
// Сортировка по возрастанию
let increase = document.getElementById("increase");
increase.addEventListener("click", incFunc);
function incFunc() {
	let divs = document.querySelectorAll("#tasks-container div.card");
	let sorted = [...divs].sort(function (a, b) { // Работа с node элементами
		return a.dataset.date < b.dataset.date ? -1 : 1;
	});
	mainDiv.innerHTML = ``;
	for (let div of sorted) mainDiv.appendChild(div);
}
// // Удаление (черновик)
// let all_tasks = document.getElementById("tasks-container");
// console.log(all_tasks.children)
// all_tasks.addEventListener("click", deleteFunc);
// function deleteFunc(event){
// 	let clickelem = event.target;
// 	let task = clickelem.dataset.card
// 	if(task){
// 		clickelem.classList.toggle("deleted");
// 		// for(let task of all_tasks.children){
// 		// 		console.log(task.value)
// 		// 	// if(task.classList.){console.log("Ура")};
// 		// }
// 		// document.querySelector(".delete-button").classList.remove("hidden");
// 	}
// }
// // Сортировка
// // for(let i = 0; i < all_tasks.children; i++){
// // 	for(let j = i; j < all_tasks.children; j++){
// // 		if(all_tasks.children[i].dataset.date < all_tasks.children[j].dataset.date){
// // 			replaceNode = all_tasks.replaceChild(all_tasks.children[j], all_tasks.children[i]); // перезаписываем элемент
// // 			insertAfter(replaceNode, nav.children[i]); // вставляем тот, который перезаписали
// // 		}
// // 	}
// // }
// // function insertAfter(elem, refelem){
// // 	return refelem.parentNode.insertBefore(elem, refElem.nextSibling);
// // }

// console.log(all_tasks[0])
























// arr.sort((a, b) => {
// 	return a.date - b.date;
// })
// document.getElementById("decrease").addEventListener("click", () =>{
// 	console.log("Убывание");
// 	arr.sort((a, b) => {
// 	if(new Date(a.date) > new Date(b.date)){
// 		let replaced = mainDiv.replaceChild(a.children, b.children)
// 		mainDiv.appendChild(replaced);
// 	}
// 	})

// });
// // console.log(arr[0].date);





// console.log(arr);
// // Сортировка
// // 3 этапа: 1 этап - сортировка пузырьком
// let a = [20.01.2021, ]; // по возрастанию
// a.sort((a, b) => {
// 	return b-a;
// })
// console.log(a)