"use strict"

// ці рядки не працють (прочитайте файл "важливо") 
/* let request = new XMLHttpRequest();
    request.open("GET", "server/contact.json");
    request.responseType = "json";
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200 ) {
            data = JSON.parse(request.response);             
        }  
    };
    request.send(); */


// місце для списку
const contactList = document.getElementById("contactList");

// кнопки для керування елементами списку
const buttonSelect = document.getElementById("buttonSelect");
const buttonDelete = document.getElementById("buttonDelete");
const buttonAdd = document.getElementById("buttonAdd");

// якщо дані є
// імітація отриманих даних
let response = [
    {
        name: "Саврак Богдан Михайлович",
        age: "17",
        profession: "Програміст",
        salary: "50000",
    },
    {
        name: "Петров Петров Петрович",
        age: "33",
        profession: "Бармен",
        salary: "20000",
    }
];
response = JSON.stringify(response);

let data = JSON.parse(response); 

if(data.length != 0){
    data.forEach(Element => {
        // формуємо html-код
        const li = document.createElement("li");
            
        const buttonSelectItem = document.createElement("button");
        const buttonDeleteItem = document.createElement("button");
        const buttonEditItem = document.createElement("button");

        const inputName = document.createElement("input");
        const inputAge = document.createElement("input");
        const inputProfession = document.createElement("input");
        const inputSalary = document.createElement("input");

        const pName = document.createElement("p");
        const pAge = document.createElement("p");
        const pProfession = document.createElement("p");
        const pSalary = document.createElement("p");

        // встановлюємо їм атрибути
        buttonSelectItem.setAttribute("data-select", "0");
        buttonEditItem.setAttribute("data-edit", "0");

        inputName.setAttribute("data-finish", "0");
        inputAge.setAttribute("data-finish", "0");
        inputProfession.setAttribute("data-finish", "0");
        inputSalary.setAttribute("data-finish", "0");

        // встановлюємо їм класи
        li.classList.add("contact-list__row");

        buttonSelectItem.classList.add("contact-list__button", "contact-list__button_select");
        buttonDeleteItem.classList.add("contact-list__button", "contact-list__button_delete");
        buttonEditItem.classList.add("contact-list__button", "contact-list__button_edit");

        inputName.classList.add("contact-list__input", "contact-list__input_name");
        inputAge.classList.add("contact-list__input", "contact-list__input_age");
        inputProfession.classList.add("contact-list__input", "contact-list__input_profession");
        inputSalary.classList.add("contact-list__input", "contact-list__input_salary");

        pName.classList.add("contact-list__text", "contact-list__text_show", "contact-list__text_name");
        pAge.classList.add("contact-list__text", "contact-list__text_show", "contact-list__text_age");
        pProfession.classList.add("contact-list__text", "contact-list__text_show", "contact-list__text_profession");
        pSalary.classList.add("contact-list__text", "contact-list__text_show", "contact-list__text_salary");

        // добавляэмо дані
        inputName.value = Element.name.trim();
        inputAge.value = Element.age.trim();
        inputProfession.value = Element.profession.trim();
        inputSalary.value = Element.salary.trim();

        pName.innerText = Element.name.trim();
        pAge.innerText = Element.age.trim();
        pProfession.innerText = Element.profession.trim();
        pSalary.innerText = Element.salary.trim();

        // добавляэмо їх на екран
        li.append(buttonSelectItem, buttonDeleteItem, buttonEditItem,
            inputName, pName,
            inputAge, pAge,
            inputProfession, pProfession,
            inputSalary, pSalary
            );
        contactList.append(li);

        // обробка введених даних
        inputName.addEventListener("blur", function (){
            if(setPText(this, pName)){
                this.setAttribute("data-finish", "1");

                if(inputAge.getAttribute("data-finish") == "1" && inputProfession.getAttribute("data-finish") == "1" && inputSalary.getAttribute("data-finish") == "1"){
                    buttonEditItem.setAttribute("data-edit", "0");
                    buttonAdd.setAttribute("data-add", "0");
                    setData();
                }
            } else{
                this.setAttribute("data-finish", "0");
            }
        });
        inputAge.addEventListener("blur", function (){
            if(setPText(this, pAge)){
                this.setAttribute("data-finish", "1");

                if(inputName.getAttribute("data-finish") == "1" && inputProfession.getAttribute("data-finish") == "1" && inputSalary.getAttribute("data-finish") == "1"){
                    buttonEditItem.setAttribute("data-edit", "0");
                    buttonAdd.setAttribute("data-add", "0");
                    setData();
                }
            } else{
                this.setAttribute("data-finish", "0");
            }
        });
        inputProfession.addEventListener("blur", function (){
            if(setPText(this, pProfession)){
                this.setAttribute("data-finish", "1");
                if(inputName.getAttribute("data-finish") == "1" && inputAge.getAttribute("data-finish") == "1" && inputSalary.getAttribute("data-finish") == "1"){
                    buttonEditItem.setAttribute("data-edit", "0");
                    buttonAdd.setAttribute("data-add", "0");
                    setData();
                }
            } else{
                this.setAttribute("data-finish", "0");
            }
        });
        inputSalary.addEventListener("blur", function (){
            if(setPText(this, pSalary)){
                this.setAttribute("data-finish", "1");

                if(inputName.getAttribute("data-finish") == "1" && inputAge.getAttribute("data-finish") == "1" && inputProfession.getAttribute("data-finish") == "1"){
                    buttonEditItem.setAttribute("data-edit", "0");
                    buttonAdd.setAttribute("data-add", "0");
                    setData();
                }
            } else{
                this.setAttribute("data-finish", "0");
            }
        });

        // обробка подій
        buttonSelectItem.addEventListener("click", function(){
            let temp = (this.getAttribute("data-select") == "0") ? "1" : "0";
            this.setAttribute("data-select", temp);
        });
        buttonDeleteItem.addEventListener("click", function(){
            li.remove();
            if(buttonEditItem.getAttribute("data-edit") == "1"){
                buttonAdd.setAttribute("data-add", "0");
            }
            setData();
        });
        buttonEditItem.addEventListener("click", function(){
            if(this.getAttribute("data-edit") == "0"){
                this.setAttribute("data-edit", "1");
                buttonAdd.setAttribute("data-add", "1");
                
                inputName.setAttribute("data-finish", "0");
                inputAge.setAttribute("data-finish", "0");
                inputProfession.setAttribute("data-finish", "0");
                inputSalary.setAttribute("data-finish", "0");

                inputName.classList.add("contact-list__input_show");
                inputAge.classList.add("contact-list__input_show");
                inputProfession.classList.add("contact-list__input_show");
                inputSalary.classList.add("contact-list__input_show");

                pName.classList.remove("contact-list__text_show");
                pAge.classList.remove("contact-list__text_show");
                pProfession.classList.remove("contact-list__text_show");
                pSalary.classList.remove("contact-list__text_show");
            } else if(inputName.value != "" && inputAge.value != "" && inputProfession.value != "" && inputSalary.value != ""){
                this.setAttribute("data-edit", "0");
                buttonAdd.setAttribute("data-add", "0");
                
                inputName.setAttribute("data-finish", "1");
                inputAge.setAttribute("data-finish", "1");
                inputProfession.setAttribute("data-finish", "1");
                inputSalary.setAttribute("data-finish", "1");

                inputName.classList.remove("contact-list__input_show");
                inputAge.classList.remove("contact-list__input_show");
                inputProfession.classList.remove("contact-list__input_show");
                inputSalary.classList.remove("contact-list__input_show");

                pName.classList.add("contact-list__text_show");
                pAge.classList.add("contact-list__text_show");
                pProfession.classList.add("contact-list__text_show");
                pSalary.classList.add("contact-list__text_show");
            }
        });
    });
}
checkEmpty();

// добавляємо ще одного в список
buttonAdd.addEventListener("click", function (){
    if(this.getAttribute("data-add") == "0"){
        this.setAttribute("data-add", "1");

        // формуємо html-код
        const li = document.createElement("li");
    
        const buttonSelectItem = document.createElement("button");
        const buttonDeleteItem = document.createElement("button");
        const buttonEditItem = document.createElement("button");
    
        const inputName = document.createElement("input");
        const inputAge = document.createElement("input");
        const inputProfession = document.createElement("input");
        const inputSalary = document.createElement("input");
    
        const pName = document.createElement("p");
        const pAge = document.createElement("p");
        const pProfession = document.createElement("p");
        const pSalary = document.createElement("p");
    
        // встановлюємо їм атрибути
        buttonSelectItem.setAttribute("data-select", "0");
        buttonEditItem.setAttribute("data-edit", "1");
    
        inputName.setAttribute("data-finish", "0");
        inputAge.setAttribute("data-finish", "0");
        inputProfession.setAttribute("data-finish", "0");
        inputSalary.setAttribute("data-finish", "0");
    
        // встановлюємо їм класи
        li.classList.add("contact-list__row");
    
        buttonSelectItem.classList.add("contact-list__button", "contact-list__button_select");
        buttonDeleteItem.classList.add("contact-list__button", "contact-list__button_delete");
        buttonEditItem.classList.add("contact-list__button", "contact-list__button_edit");
    
        inputName.classList.add("contact-list__input", "contact-list__input_show", "contact-list__input_name");
        inputAge.classList.add("contact-list__input", "contact-list__input_show", "contact-list__input_age");
        inputProfession.classList.add("contact-list__input", "contact-list__input_show", "contact-list__input_profession");
        inputSalary.classList.add("contact-list__input", "contact-list__input_show", "contact-list__input_salary");
    
        pName.classList.add("contact-list__text", "contact-list__text_name");
        pAge.classList.add("contact-list__text", "contact-list__text_age");
        pProfession.classList.add("contact-list__text", "contact-list__text_profession");
        pSalary.classList.add("contact-list__text", "contact-list__text_salary");
    
        // добавляэмо їх на екран
        li.append(buttonSelectItem, buttonDeleteItem, buttonEditItem,
            inputName, pName,
            inputAge, pAge,
            inputProfession, pProfession,
            inputSalary, pSalary
            );
        contactList.append(li);
    
        // обробка введених даних
        inputName.addEventListener("blur", function (){
            if(setPText(this, pName)){
                this.setAttribute("data-finish", "1");
    
                if(inputAge.getAttribute("data-finish") == "1" && inputProfession.getAttribute("data-finish") == "1" && inputSalary.getAttribute("data-finish") == "1"){
                    buttonEditItem.setAttribute("data-edit", "0");
                    buttonAdd.setAttribute("data-add", "0");
                    setData();
                }
            } else{
                this.setAttribute("data-finish", "0");
            }
        });
        inputAge.addEventListener("blur", function (){
            if(setPText(this, pAge)){
                this.setAttribute("data-finish", "1");
    
                if(inputName.getAttribute("data-finish") == "1" && inputProfession.getAttribute("data-finish") == "1" && inputSalary.getAttribute("data-finish") == "1"){
                    buttonEditItem.setAttribute("data-edit", "0");
                    buttonAdd.setAttribute("data-add", "0");
                    setData();
                }
            } else{
                this.setAttribute("data-finish", "0");
            }
        });
        inputProfession.addEventListener("blur", function (){
            if(setPText(this, pProfession)){
                this.setAttribute("data-finish", "1");
                if(inputName.getAttribute("data-finish") == "1" && inputAge.getAttribute("data-finish") == "1" && inputSalary.getAttribute("data-finish") == "1"){
                    buttonEditItem.setAttribute("data-edit", "0");
                    buttonAdd.setAttribute("data-add", "0");
                    setData();
                }
            } else{
                this.setAttribute("data-finish", "0");
            }
        });
        inputSalary.addEventListener("blur", function (){
            if(setPText(this, pSalary)){
                this.setAttribute("data-finish", "1");
    
                if(inputName.getAttribute("data-finish") == "1" && inputAge.getAttribute("data-finish") == "1" && inputProfession.getAttribute("data-finish") == "1"){
                    buttonEditItem.setAttribute("data-edit", "0");
                    buttonAdd.setAttribute("data-add", "0");
                    setData();
                }
            } else{
                this.setAttribute("data-finish", "0");
            }
        });
    
        // обробка подій
        buttonSelectItem.addEventListener("click", function(){
            let temp = (this.getAttribute("data-select") == "0") ? "1" : "0";
            this.setAttribute("data-select", temp);
        });
        buttonDeleteItem.addEventListener("click", function(){
            li.remove();
            if(buttonEditItem.getAttribute("data-edit") == "1"){
                buttonAdd.setAttribute("data-add", "0");
            }
            setData();
        });
        buttonEditItem.addEventListener("click", function(){
            if(this.getAttribute("data-edit") == "0"){
                this.setAttribute("data-edit", "1");
                buttonAdd.setAttribute("data-add", "1");
                
                inputName.setAttribute("data-finish", "0");
                inputAge.setAttribute("data-finish", "0");
                inputProfession.setAttribute("data-finish", "0");
                inputSalary.setAttribute("data-finish", "0");
    
                inputName.classList.add("contact-list__input_show");
                inputAge.classList.add("contact-list__input_show");
                inputProfession.classList.add("contact-list__input_show");
                inputSalary.classList.add("contact-list__input_show");
    
                pName.classList.remove("contact-list__text_show");
                pAge.classList.remove("contact-list__text_show");
                pProfession.classList.remove("contact-list__text_show");
                pSalary.classList.remove("contact-list__text_show");
            } else if(inputName.value != "" && inputAge.value != "" && inputProfession.value != "" && inputSalary.value != ""){
                this.setAttribute("data-edit", "0");
                buttonAdd.setAttribute("data-add", "0");
                
                inputName.setAttribute("data-finish", "1");
                inputAge.setAttribute("data-finish", "1");
                inputProfession.setAttribute("data-finish", "1");
                inputSalary.setAttribute("data-finish", "1");
    
                inputName.classList.remove("contact-list__input_show");
                inputAge.classList.remove("contact-list__input_show");
                inputProfession.classList.remove("contact-list__input_show");
                inputSalary.classList.remove("contact-list__input_show");
    
                pName.classList.add("contact-list__text_show");
                pAge.classList.add("contact-list__text_show");
                pProfession.classList.add("contact-list__text_show");
                pSalary.classList.add("contact-list__text_show");
            }
        });
        
    }
});
buttonSelect.addEventListener('click', function (){
    let dataSelect = contactList.querySelectorAll(".contact-list__button_select");
        dataSelect.forEach(Element => {
            Element.setAttribute("data-select", "1");
        });
});
buttonDelete.addEventListener("click", function (){
    let dataDelete = contactList.querySelectorAll(`[data-select="1"]`);
        dataDelete.forEach(Element => {
            Element.parentElement.remove();
        });    

    setData();
});


function setPText(input, p){
    if(input.value.trim() != ""){
        input.classList.remove("contact-list__input_show");

        p.innerText = input.value.trim();
        p.classList.add("contact-list__text_show");
        
        return true;
    }

    return false;
}
function setData(nameAdd, ageAdd, professionAdd, salaryAdd){
    let dataName = contactList.querySelectorAll(".contact-list__text_name");
    let dataAge = contactList.querySelectorAll(".contact-list__text_age");
    let dataProfession = contactList.querySelectorAll(".contact-list__text_profession");
    let dataSalary = contactList.querySelectorAll(".contact-list__text_salary");

    data = [];
    for(let i = 0; i < dataName.length; i++){
        data.push({
            name: dataName[i].innerText,
            age: dataAge[i].innerText,
            profession: dataProfession[i].innerText,
            salary: dataSalary[i].innerText,
        });
    }

    checkEmpty();
}
function checkEmpty(){
    if(data.length == 0){
        document.getElementById("contactListEmpty").classList.add("contact-list__row-empty_show");
    } else {
        document.getElementById("contactListEmpty").classList.remove("contact-list__row-empty_show");
    }
}
