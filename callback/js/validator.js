"use strict";

// кнопка, яка відкриває модальне вікно
let callbackButton = document.getElementById("callbackButton");

let callbackSection = document.getElementById("callbackSection");
let callback = document.getElementById("callback");
let callbackCloseButton = callbackSection.querySelector(".modal-window__close-button");
let callbackSubmit = document.getElementById("callbackSubmit");



callbackButton.addEventListener("click", function (){
    document.querySelector(".modal-window-bg").classList.toggle("modal-window-bg_show");
    callbackSection.classList.add("modal-window_show");
    callback.classList.add("modal-window-form_show");
});

callbackCloseButton.addEventListener("click", function (){
    document.querySelector(".modal-window-bg").classList.toggle("modal-window-bg_show");
    callbackSection.classList.remove("modal-window_show");
    callback.classList.remove("modal-window-form_show");
});


// валідація форми
let callbackName = document.getElementById("callbackName");
let callbackEmail = document.getElementById("callbackEmail");
let callbackTel = document.getElementById("callbackTel");
let callbackComment = document.getElementById("callbackComment");


let validCallbackName = false;
let validCallbackEmail = true;
let validCallbackTel = false;
let validCallbackComment = false;


// регулярки для валідації кінцевої валідації
let regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
let regNames = /^[a-zA-Zа-яА-Я іІїЇєЄёЁ']{0,30}$/;
let regTel = /^\+380\s\d{2}\s\d{3}\s\d{4}$/;


// регулярки для динамічної валідації
let regInputEmail = /^[a-z0-9_\-\.@]*$/;
let regInputNames = /^[a-zA-Zа-яА-Я іІїЇєЄёЁ']{0,30}$/;
let regInputTel = /^[0-9\+ ]{0,16}$/;


// функції для маніпуляції формою
function setSpanError(spanID, errorText){
    let span = document.getElementById(spanID + "Span");
        span.classList.add("modal-window-form__error_show");
        span.innerText = errorText;
}
function deleteSpanError(spanID){
    let span = document.getElementById(spanID + "Span");
        span.classList.remove("modal-window-form__error_show");
        span.innerText = "";
}
function regTest(reg, value){
    return reg.test(value);
}
function checkEmptyInput(input){
    return (input.value == "") ? true : false;
}
function reportEmptyField(input){
    if(checkEmptyInput(input)){
        setSpanError(input.id, "Поле повинне бути заповнене!");
        return true;
    } else {
        return false;
    }
}


// Name ===================================================
callbackName.addEventListener("blur", function(){
    if(regTest(regNames, this.value)){
        deleteSpanError(this.id);
        validCallbackName = true;
    } else if(!checkEmptyInput(this)){
        setSpanError(this.id, "У поле можна ввести лише символи!");
        validCallbackName = false;
    }
});
callbackName.addEventListener("focus", function (){
    deleteSpanError(this.id);
    validCallbackName = false;
});
callbackName.addEventListener("input", function(){
    if(regTest(regNames, this.value)){
        deleteSpanError(this.id);
    } else {
        setSpanError(this.id, "У поле можна ввести лише символи!");
        validCallbackName = false;
    }
});

// Tel ===================================================
callbackTel.addEventListener("blur", function (){
    if(regTest(regTel, this.value)){
        deleteSpanError(this.id);
        validCallbackTel = true;
    } else if(this.value != "+380 "){
        setSpanError(this.id, "Введений вами номер не відповідає шаблону +380 66 666 6666!");
        validCallbackTel = false;
    }
});
callbackTel.addEventListener("focus", function (){
    deleteSpanError(this.id);
    validCallbackTel = false;
});
callbackTel.addEventListener("input", function (){
    if(event.inputType == "deleteContentBackward" && regTest(regInputTel, this.value)){
        deleteSpanError(this.id);

        this.value = (this.value.length <= 4) ? "+380 " : this.value;
    } else if(event.inputType == "deleteContentBackward"){
        setSpanError(this.id, "Ви ввели заборонений символ!");

        this.value = (this.value.length <= 4) ? "+380 " : this.value;
    } else if(regTest(regInputTel, this.value)){
        deleteSpanError(this.id);
        
        this.value = (this.value.length <= 4) ? "+380 " : this.value;
        this.value = (this.value.length == 7) ? this.value + " " : this.value;
        this.value = (this.value.length == 11) ? this.value + " " : this.value;

    } else if(this.value.length > 16){
        setSpanError(this.id, "Введений вами номер не відповідає шаблону +380 66 666 6666");

        validCallbackTel = false;
    } else {
        setSpanError(this.id, "Ви ввели заборонений символ!");

        validCallbackTel = false;

    }
});

// Email ===================================================
callbackEmail.addEventListener("blur", function(){
    if(regTest(regEmail, this.value)){
        deleteSpanError(this.id);
        validCallbackEmail = true;
    } else if(checkEmptyInput(this)){
        validCallbackEmail = true;
    } else {
        setSpanError(this.id, "Email не відповідає шаблону! (Можливо Ви зробили помилку)");
        validCallbackEmail = false;
    }
});
callbackEmail.addEventListener("focus", function (){
    deleteSpanError(this.id);
    validCallbackEmail = false;
});
callbackEmail.addEventListener("input", function(){
    if(regTest(regInputEmail, this.value)){
        deleteSpanError(this.id);
    } else {
        setSpanError(this.id, "Email не відповідає шаблону! (Можливо Ви зробили помилку)");
        validCallbackEmail = false;
    }
});

// Email ===================================================
callbackComment.addEventListener("focus", function (){
    deleteSpanError(this.id);
    validCallbackComment = false;
});

callback.addEventListener("submit", function (){
    event.preventDefault(); 

    // Name ===================================================
    if(regTest(regNames, callbackName.value)){
        deleteSpanError(callbackName.id);
        validCallbackName = !reportEmptyField(callbackName);
    } else {
        setSpanError(callbackName.id, "У поле можна ввести лише символи!");
        validCallbackName = false;
    }

    // Tel ===================================================
    if(regTest(regTel, callbackTel.value)){
        deleteSpanError(callbackTel.id);
        validCallbackTel = true;
    } else {
        if(callbackTel.value == "+380 "){
            setSpanError(callbackTel.id, "Поле повинне бути заповнене!");
            validCallbackTel = false;
        } else {
            setSpanError(callbackTel.id, "Введений вами номер не відповідає шаблону +380 66 666 6666!");
            validCallbackTel = false;
        }
    }
    
    // Email ===================================================
    if(regTest(regEmail, callbackEmail.value) || checkEmptyInput(callbackEmail)){
        deleteSpanError(callbackEmail.id);
        validCallbackEmail = true;
    } else {
        setSpanError(callbackEmail.id, "Email не відповідає шаблону! (Можливо Ви зробили помилку)");
        validCallbackEmail = false;
    }

    // Comment ===================================================
    if(!reportEmptyField(callbackComment)){
        validCallbackComment = true;
    }
    
    if(validCallbackName && validCallbackEmail && validCallbackTel && validCallbackComment){
        let formAnswer = callbackSection.querySelector(".modal-window-form__answer");
        let callbackData = new XMLHttpRequest();
        callbackData.onreadystatechange = function(){

            if (callbackData.readyState == 4 && callbackData.status == 200){
                callback.classList.remove("modal-window-form_show");
                if(callbackData.responseText != "false"){
                    formAnswer.innerText = "Дякую! Ми передзвонимо Вам.";
                    formAnswer.classList.add("modal-window-form__answer_success");

                    setTimeout(function (){
                        formAnswer.innerText = "";
                        formAnswer.classList.remove("modal-window-form__answer_success");

                        callbackName.value = "";
                        callbackEmail.value = "";
                        callbackTel.value = "+380 ";
                        callbackComment.value = "";

                        callback.classList.add("modal-window-form_show");
                    }, 4000);
                } else {
                    formAnswer.innerText = "Щось пішло не так. Спробуйте будь ласка ще раз.";
                    formAnswer.classList.add("modal-window-form__answer_error");

                    setTimeout(function (){
                        formAnswer.innerText = "";
                        formAnswer.classList.remove("modal-window-form__answer_error");

                        callback.classList.add("modal-window-form_show");
                    }, 4000);
                }
            }
        }
        callbackData.open("POST", "handlers/callback.php", true);
        callbackData.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        callbackData.send("name=" + callbackName.value +
                    "&phone=" + callbackTel.value + 
                    "&email=" + callbackEmail.value +
                    "&comment" + callbackComment.value
                    );
    }
    
});