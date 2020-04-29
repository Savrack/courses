"use strict";

// масив даних
let listAll = [];
let listAdd = [];

// кнопки головного меню контролю
let selectAll = document.getElementById("selectAll");
let deleteSelected = document.getElementById("deleteSelected");
let doneSelected = document.getElementById("doneSelected");
let openAddWindow = document.getElementById("openAddWindow");

// список
let content = document.getElementById("content");

if(document.cookie != ""){

    let data = [];
    let arrAll = getCookie("toDoList");
    if(arrAll != ""){
        arrAll = arrAll.split("},{");

        arrAll.forEach((element) => {
            element = element.replace("{", "");
            element = element.replace("}", "");

            let temp = element.split(",");
            data.push({
                done: temp[0].split("done: ")[1],
                text: temp[1].split("text: ")[1]
            });
        });

    // заповнюємо отримані дані
    data.forEach((element) => {

        // cтворюємо потрібні елементи
        let div = document.createElement("div");
        let selectButton = document.createElement("button");
        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");
        let doneButton = document.createElement("button");
        let text = document.createElement("p");
        
        // задаємо їм класи
        div.classList.add("content__item");
        selectButton.classList.add("content__select");
        deleteButton.classList.add("content__delete");
        editButton.classList.add("content__edit");
        doneButton.classList.add("content__done");
        text.classList.add("content__text");
        
        // добавляємо атрибути
        selectButton.setAttribute("data-select", "0");
        editButton.setAttribute("data-edit", "0");
        doneButton.setAttribute("data-done", element.done);
        
        // добавляємо текст
        text.innerText = element.text;
        
        // добавляємо текст на сторінку
        div.append(selectButton, deleteButton, editButton, doneButton, text);
        content.append(div);

        // обробка кнопок
        selectButton.addEventListener("click", function (){
            let temp = (this.getAttribute("data-select") == "0") ? "1" : "0";
            this.setAttribute("data-select", temp);
        });
        deleteButton.addEventListener("click", function (){
            div.remove();
            checkEmpty();
            setArrAll();
        });
        editButton.addEventListener("click", function (){
            if(this.getAttribute("data-edit") == "0"){
                this.setAttribute("data-edit", "1");

                let textArea = document.createElement("textarea");
                    textArea.setAttribute("type", "text");
                    textArea.value = text.innerText;
                    textArea.style.height = "100px";
                    textArea.classList.add("content__textarea");
                text.remove();
                div.append(textArea);

                // після редагування
                textArea.addEventListener("blur", function (){
                    if(this.value == ""){
                        div.remove();
                        checkEmpty();
                    } else {
                        text.innerText = this.value;
                        this.remove();
                        editButton.setAttribute("data-edit", "0");
                        div.append(text);
                    }
                    setArrAll();
                });
                
            }
        });
        doneButton.addEventListener("click", function (){
            let temp = (this.getAttribute("data-done") == "0") ? "1" : "0";
            this.setAttribute("data-done", temp);
            setArrAll();
        });
    });
    }
        

    checkEmpty();
} else {
    checkEmpty();
}

// вікно добавлення до списку
let addWindow = document.getElementById("addWindow"); 
let closeAddWindow = document.getElementById("closeAddWindow");
let add = document.getElementById("add");

openAddWindow.addEventListener("click", function (){
    addWindow.classList.toggle("addWork_show");
});
closeAddWindow.addEventListener("click", function (){
    addWindow.classList.toggle("addWork_show");
});
add.addEventListener("click", function (){
    let addText = document.getElementById("addText");
    let temp = addText.value.split("\n-");
        temp[0] = temp[0].replace("-", "");

        listAdd = temp;



    // заповнюємо отримані дані
    listAdd.forEach((element) => {

        // cтворюємо потрібні елементи
        let div = document.createElement("div");
        let selectButton = document.createElement("button");
        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");
        let doneButton = document.createElement("button");
        let text = document.createElement("p");
        
        // задаємо їм класи
        div.classList.add("content__item");
        selectButton.classList.add("content__select");
        deleteButton.classList.add("content__delete");
        editButton.classList.add("content__edit");
        doneButton.classList.add("content__done");
        text.classList.add("content__text");
        
        // добавляємо атрибути
        selectButton.setAttribute("data-select", "0");
        editButton.setAttribute("data-edit", "0");
        doneButton.setAttribute("data-done", "0");
        
        // добавляємо текст
        text.innerText = element.trim();
        
        // добавляємо текст на сторінку
        div.append(selectButton, deleteButton, editButton, doneButton, text);
        content.append(div);

        // обробка кнопок
        selectButton.addEventListener("click", function (){
            let temp = (this.getAttribute("data-select") == "0") ? "1" : "0";
            this.setAttribute("data-select", temp);
        });
        deleteButton.addEventListener("click", function (){
            div.remove();
            checkEmpty();
            setArrAll();
        });
        editButton.addEventListener("click", function (){
            if(this.getAttribute("data-edit") == "0"){
                this.setAttribute("data-edit", "1");

                let textArea = document.createElement("textarea");
                    textArea.setAttribute("type", "text");
                    textArea.value = text.innerText;
                    textArea.style.height = "100px";
                    textArea.classList.add("content__textarea");
                text.remove();
                div.append(textArea);

                // після редагування
                textArea.addEventListener("blur", function (){
                    if(this.value == ""){
                        div.remove();
                        checkEmpty();
                    } else {
                        text.innerText = this.value;
                        this.remove();
                        editButton.setAttribute("data-edit", "0");
                        div.append(text);
                    }
                    setArrAll();
                });
                
            }
        });
        doneButton.addEventListener("click", function (){
            let temp = (this.getAttribute("data-done") == "0") ? "1" : "0";
            this.setAttribute("data-done", temp);
            setArrAll();
        });
    });

    setArrAll();
    checkEmpty();
    addWindow.classList.toggle("addWork_show");
});

// виділення всіх елементів
selectAll.addEventListener("click", function (){
    let arr = content.querySelectorAll(".content__item");

    arr.forEach((element) => {
        let select = element.querySelector(".content__select");
            select.setAttribute("data-select", "1");
    });

});

// видалення виділених елементів
deleteSelected.addEventListener("click", function (){
    let arr = content.querySelectorAll(".content__item");

    arr.forEach((element) => {
        let select = element.querySelector(".content__select");
        
        if(select.getAttribute("data-select") == "1"){
            element.remove();
        }
    });

    checkEmpty();
    setArrAll();
});
doneSelected.addEventListener("click", function (){
    let arr = content.querySelectorAll(".content__item");

    arr.forEach((element) => {
        let select = element.querySelector(".content__select");
        
        if(select.getAttribute("data-select") == "1"){
            let done = element.querySelector(".content__done");
                done.setAttribute("data-done", "1");
                select.setAttribute("data-select", "0");
        }
    });

    setArrAll();
});


function checkEmpty(){
    let contentEmpty = document.getElementById("contentEmpty");
    let arrContent = content.querySelector(".content__item");

    if(arrContent == null){
        contentEmpty.classList.add("content__empty_show");
    } else {
        contentEmpty.classList.remove("content__empty_show");
    }
    
}
function setArrAll(){
    let allItem = content.querySelectorAll(".content__item");
    let data = [];
    allItem.forEach((element) => {
        data.push(`{done: ${element.querySelector(".content__done").getAttribute("data-done")},text: ${element.querySelector(".content__text").innerText}}`);
    });
    
    
    // створюємо кукі
    let day = new Date(Date.now() + 86400e3);
        day = day.toUTCString();
    document.cookie = "toDoList=" + encodeURIComponent(data) + "; path=/; expires=" + day;
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}