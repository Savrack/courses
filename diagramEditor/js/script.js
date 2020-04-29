"use strict"

// дані
let diagrameData = document.getElementById("diagrameData");
let diagrameClearData = document.getElementById("diagrameClearData");

// полотно
let diagrame = document.getElementById("diagrame");
let diagrameField = diagrame.getContext("2d");
let diagrameBarСhart = document.getElementById("diagrameBarСhart");
let diagramePieChart = document.getElementById("diagramePieChart");
let diagrameFieldClear = document.getElementById("diagrameFieldClear");


// скидаємо дані
diagrameClearData.addEventListener("click", function (){
    diagrameData.value = "";
});

// стовпчикова діаграма
diagrameBarСhart.addEventListener("click", function (){
    
    // базові значення
    let margin = 40;
    let barChartWidth = 0;

    let diagrameFieldHeight = diagrame.height - margin;
    let diagrameFieldWidth = diagrame.width - margin;  
      

    // система координат
    drawLine(margin, margin, margin, diagrameFieldHeight);
    drawLine(margin, diagrameFieldHeight, diagrameFieldWidth, diagrameFieldHeight);

    drawTriangle(margin - 5, margin, margin, margin - 10, margin + 5, margin);
    drawTriangle(diagrameFieldWidth, diagrameFieldHeight - 5, diagrameFieldWidth + 10, diagrameFieldHeight, diagrameFieldWidth, diagrameFieldHeight + 5);

    diagrameField.font = "16px Arial";
    diagrameField.fillStyle = "black";
    diagrameField.fillText(0, margin - 15, diagrameFieldHeight + 15);

    // зміні
    let diagrameText = [];
    let diagrameValue = [];
    let diagrameHeightK = [];
    let maxNumber = 0, maxNumberD;

    // отримаємо і опрацьовуємо дані    
    let diagrameDataRow = diagrameData.value.split("\n");
    for(let i = 0; i < diagrameDataRow.length; i++){
        let temp = diagrameDataRow[i].split("-");
        
        diagrameText.push(temp[0]);
        diagrameValue.push(+temp[1]);

        if(maxNumber < +temp[1]){
            maxNumber = +temp[1];
        }
    }

    // округлення максимального значення
    maxNumber = Math.ceil(maxNumber);
    maxNumberD = `${maxNumber}`.length;
    maxNumber = Math.ceil(maxNumber / (Math.pow(10, maxNumberD - 2))) * (Math.pow(10, maxNumberD - 2))

    // вираховуэмо коефіцієнт
    for(let i = 0; i < diagrameValue.length; i++){
        diagrameHeightK.push((diagrameValue[i]) / maxNumber);
    }

    // визначаємо ширину стовпчика щоб всі помісилися
    barChartWidth = (790 - 40 * diagrameHeightK.length) / diagrameHeightK.length; 
    barChartWidth = (barChartWidth > 55) ? 55 : barChartWidth;

    // позначаємо максимальне значення на системі координат
    drawLine(margin - 5, 60, margin + 5, 60);
    diagrameField.fillStyle = "black";
    diagrameField.font = "16px Arial";
    diagrameField.fillText(maxNumber, 5, 55);
    
    
    for(let i = 0; i < diagrameHeightK.length; i++){
        let red = Math.round(Math.random()*255);
        let green = Math.round(Math.random()*255);
        let blue =  Math.round(Math.random()*255);
        let color = `rgb(${red}, ${green}, ${blue})`;

        diagrameField.fillStyle = color;
        diagrameField.fillRect(margin * (i + 2) + i * barChartWidth, diagrameFieldHeight - 1, barChartWidth, -400 * diagrameHeightK[i]);
    
        diagrameField.fillStyle = "black";
        diagrameField.font = "16px Arial";
        diagrameField.fillText(diagrameText[i], margin * (i + 2) + i * barChartWidth, diagrameFieldHeight + 20);

        diagrameField.fillStyle = "black";
        diagrameField.font = "16px Arial";
        diagrameField.fillText(diagrameValue[i], margin * (i + 2) + i * barChartWidth, diagrameFieldHeight - 5 - 400 * diagrameHeightK[i]);

    }

});

// кругова діаграма
diagramePieChart.addEventListener("click", function (){
    // зміні
    let diagrameText = [];
    let diagrameValue = [];
    let diagrameHeightK = [];
    let totalNumber = 0;
    let margin = 25;

    // отримаємо і опрацьовуємо дані    
    let diagrameDataRow = diagrameData.value.split("\n");
    for(let i = 0; i < diagrameDataRow.length; i++){
        let temp = diagrameDataRow[i].split("-");
        
        diagrameText.push(temp[0]);
        diagrameValue.push(+temp[1]);

        totalNumber += +temp[1];
    }

    // вираховуэмо коефіцієнт
    for(let i = 0; i < diagrameValue.length; i++){
        diagrameHeightK.push((diagrameValue[i]) / totalNumber);
    }

    let startAngle = 0;
    for(let i = 0; i < diagrameHeightK.length; i++){
        let sliceAngle = 2 * Math.PI * diagrameHeightK[i];       

        let red = Math.round(Math.random()*255);
        let green = Math.round(Math.random()*255);
        let blue =  Math.round(Math.random()*255);
        let color = `rgb(${red}, ${green}, ${blue})`;

        diagrameField.fillStyle = color;
        diagrameField.beginPath();
        diagrameField.moveTo( 250, diagrame.height / 2);
        diagrameField.arc( 250, diagrame.height / 2, 200, startAngle, startAngle + sliceAngle, false);
        diagrameField.fill();

        diagrameField.fillRect(550, 55 + margin * i, 20, -20);

        diagrameField.font = "20px Arial";
        diagrameField.fillStyle = "black";
        diagrameField.fillText(` - ${diagrameText[i]}`, 575, 50 + margin * i);

        startAngle += sliceAngle;
    }

    startAngle = 0;
    for(let i = 0; i < diagrameHeightK.length; i++){
        let sliceAngle = 2 * Math.PI * diagrameHeightK[i];       

        let fx = 250 + 100 * Math.cos(startAngle + sliceAngle / 2);
        let fy = diagrame.height / 2 + 100 * Math.sin(startAngle + sliceAngle / 2);

        diagrameField.font = "16px Arial";
        diagrameField.fillStyle = "white";
        diagrameField.fillText(Math.round(100 * diagrameHeightK[i]) + "%", fx, fy);

        startAngle += sliceAngle;
    }


});

// очистка полотна
diagrameFieldClear.addEventListener("click", function (){
    diagrameField.clearRect(0, 0, diagrame.width, diagrame.height);
});


function drawLine(xBegin, ybegin, xEnd, yEnd){
    diagrameField.beginPath();
    diagrameField.moveTo(xBegin, ybegin);
    diagrameField.strokeStyle = "black";
    diagrameField.lineWidth = 2;
    diagrameField.lineTo(xEnd, yEnd);
    diagrameField.stroke();
    diagrameField.closePath();
}
function drawTriangle(x1, y1, x2, y2, x3, y3){
    diagrameField.beginPath();
    diagrameField.fillStyle = "black";
    diagrameField.lineWidth = 2;
    diagrameField.moveTo(x1, y1);
    diagrameField.lineTo(x2, y2);
    diagrameField.lineTo(x3, y3);
    diagrameField.lineTo(x1, y1);
    diagrameField.fill();
    diagrameField.closePath();
}