$(document).ready(test);
function test(){
    console.log(123);
    $("#wordInput1").text(englishWords[indexArray[0]]);
    $("#wordInput2").text(englishWords[indexArray[1]]);
    $("#wordInput3").text(englishWords[indexArray[2]]);
    $("#wordInput4").text(englishWords[indexArray[3]]);
    $("#wordInput5").text(englishWords[indexArray[4]]);
    $("#wordInput6").text(englishWords[indexArray[5]]);
    $("#wordInput7").text(englishWords[indexArray[6]]);
    $("#wordInput8").text(englishWords[indexArray[7]]);
    $("#wordInput9").text(englishWords[indexArray[8]]);
    $("#wordInput10").text(englishWords[indexArray[9]]);
    $("#wordInput11").text(englishWords[indexArray[10]]);
    $("#wordInput12").text(englishWords[indexArray[11]]);
    $("#wordInput13").text(englishWords[indexArray[12]]);
    $("#wordInput14").text(englishWords[indexArray[13]]);
    $("#wordInput15").text(englishWords[indexArray[14]]);
    $("#wordInput16").text(englishWords[indexArray[15]]);
    $("#wordInput17").text(englishWords[indexArray[16]]);
    $("#wordInput18").text(englishWords[indexArray[17]]);
    $("#wordInput19").text(englishWords[indexArray[18]]);
    $("#wordInput20").text(englishWords[indexArray[19]]);
}
let englishWords = new Array("Hello", "World", "Opacity", "Break", "Build", "Excellent", "Bad", "House", "Look", "Run", "Walk", "Call", "Drink", "Play", "Work", "Sleep", "Lamp", "Countrie", "Year", "Old");
let ukrainianWords = new Array("Привіт", "Світ", "Непрозорість", "Ламати", "Будувати", "Відмінно", "Погано", "Будинок", "Дивитися", "Бігти", "Ходити", "Дзвонити", "Пити", "Грати", "Працювати", "Спати", "Лампа", "Країна", "Рік", "Старий");
let ukrainianWordsLowerCase = new Array();
for(let i = 0; i < ukrainianWords.length; i++){
    ukrainianWordsLowerCase[i] = ukrainianWords[i].toLowerCase();
}
let work = 0;
let indexArray = new Array(englishWords.length);
for(let i = 0; i < indexArray.length; i++){
    indexArray[i] = i;
}
indexArray = randomArray(indexArray);
function randomArray(indexArray){
    for(let i = 0; i < indexArray.length; i++){
        let randomIndex = Math.floor(Math.random()*indexArray.length);
        temp = indexArray[i];
        indexArray[i] = indexArray[randomIndex];
        indexArray[randomIndex] = temp; 
    }
    return indexArray;
}
console.log(indexArray);

$(function(){
    $("#rightArrow").on("click",next);
})
$(function(){
    $("#leftArrow").on("click",previous);
})
let currentPos = 0;
let backIndex = 0;
let answers = 0;
function next(){
    $("#rightArrow").attr("disabled","disabled");
    setTimeout(()=>{
        $("#rightArrow").removeAttr("disabled");
    },1500)
    if(answers == 20){
        $("#btnEnd").click();
    }
    if($("#translate").val() == ""){
        falseAnswer++;
        answers++;
        $(".falseAnswersAmount").text(falseAnswer);
    }
    if($("#translate").val() != ""){
        checkTranslation();
        answers++;
        $(".progress-bar").attr("style",`width: ${answers*5}%`);
        $(".answerNumber").text(`Progress: ${answers}/20`);
    }
    currentPos++;
}
function previous(){
    $("#leftArrow").attr("disabled","disabled");
    setTimeout(()=>{
        $("#leftArrow").removeAttr("disabled");
    },1500)
    if(currentPos == 0){
        answers = 20;
        currentPos = 20;
        $(".progress-bar").attr("style",`width: ${answers*5}%`);
        $(".answerNumber").text(`Progress: ${answers}/20`);
    }
    else{
        currentPos--;
        answers--;
        $(".progress-bar").attr("style",`width: ${answers*5}%`);
        $(".answerNumber").text(`Progress: ${answers}/20`);
    }
}
let trueAnswer = 0;
let falseAnswer = 0;
function checkTranslation(){
    let found = 0;
    let enteredWord = (($("#translate").val()).toLowerCase());
    for(let i = 0; i < ukrainianWordsLowerCase.length; i++){
        if(enteredWord == ukrainianWordsLowerCase[i]){
            if(englishWords[i]==englishWords[indexArray[currentPos]]){
                trueAnswer++;
                $(".trueAnswersAmount").text(trueAnswer);
                $("#translate").val("");
                found = 1;
                break;
            }
            else{
                found = 0;
                break;  
            }
        }
    }
    if(found == 0){
        falseAnswer++;
        $(".falseAnswersAmount").text(falseAnswer);
        $("#translate").val("");
    }
}
$(function(){
    $("#btnEnd").on("click",endFunc);
})
function endFunc(){
    let englishSkill = "";
    if(trueAnswer < 5){
        englishSkill = ":(";
    }
    if(trueAnswer > 5){
        englishSkill = "Newbie";
    }
    if(trueAnswer > 10){
        englishSkill = "Good";
    }
    if(trueAnswer > 15){
        englishSkill = "Master";
    }
    if(trueAnswer > 20){
        englishSkill = "God";
    }
    $(".modal-header").css("color","white");
    $(".modal-body").css("color","white");
    $(".questionsNumber").append(`<span>${answers}</span>`);
    $(".result").append(`<span>${trueAnswer}</span>`);
    $(".resultFail").append(`<span>${falseAnswer}</span>`);
    $(".gameResult").append(`<span>${englishSkill}</span>`);
}
$(function(){
    $("#btnReload").on("click",endReload);
})
function endReload(){
    location.reload();
}