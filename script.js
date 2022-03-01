const bill_elt = document.querySelector('.bill input');
const tip_option_elts = document.querySelectorAll('.options button, .options input');
const first_option_elt = document.querySelector('.options > *');
const people_elt = document.querySelector('.people  input');
const tip_amount_elt = document.querySelector('.tip-amount .result');
const total_elt = document.querySelector('.total .result');
const reset_elt = document.querySelector('.output > button');
const error_message_elt = document.querySelector('.people .error');

var active_tip_elt;

function activate(target, elt_list){
    for(elt of elt_list){
        if(elt == target){
            elt.setAttribute('data-active', 'true');
            active_tip_elt = elt;
        } else{
            elt.setAttribute('data-active', 'false');
        }
    }
}

function calcTip(bill, number_people, tip_percentage){
    return {
        "tip_amount": (tip_percentage * 0.01 * bill) / number_people,
        "total": (tip_percentage * 0.01 * bill + bill) / number_people 
    }
}

function reset(){
    bill_elt.value = "0";
    active_tip_elt = first_option_elt;
    people_elt.value = "1";

    tip_amount_elt.textContent = "$0.00";
    total_elt.textContent = "$0.00";
}

function displayError(){
    error_message_elt.textContent = "Can't be zero";
    people_elt.setAttribute('data-error', 'true');
}
function removeError(){
    error_message_elt.textContent = "";
    people_elt.setAttribute('data-error', 'false');
}

function readInput(elt, precision){
    var floatInput = parseFloat(elt.value);
    if(!isNaN(floatInput)){
        return elt.value = Math.abs(floatInput.toFixed(precision));
    } else{
        return elt.value = 0;
    }
}

function updateOutput(){

    var tip_percentage = active_tip_elt.getAttribute('data-value');
    if (tip_percentage == "custom"){
        tip_percentage = readInput(active_tip_elt, 2);
    } else{
        tip_percentage = parseFloat(tip_percentage);
    }

    var bill = readInput(bill_elt, 2);
    var number_people = readInput(people_elt, 0);

    if(number_people == 0){
        displayError();
    } else{
        removeError();
        var res = calcTip(bill, number_people, tip_percentage);
        tip_amount_elt.textContent = "$"+res.tip_amount.toFixed(2);
        total_elt.textContent = "$"+res.total.toFixed(2);
    }

    requestAnimationFrame(updateOutput);
}

activate(first_option_elt, tip_option_elts);
for(option_elt of tip_option_elts){
    option_elt.addEventListener('click', function(){
        activate(this, tip_option_elts);
    });
}

reset_elt.addEventListener('click', reset);

updateOutput();

