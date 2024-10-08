const BASE_URL =
  `https://v6.exchangerate-api.com/v6/da31cf0384f52d302606dcb9/latest`;

const dropdowns = document.querySelectorAll(".dropdowns select") ;
let fromCurr = document.querySelector(".From select") ; 
let toCurr = document.querySelector(".To select") ; 
let btn = document.querySelector("button") ;
let output = document.querySelector("#innerOutput"); 
let msg = document.querySelector(".msg");


for(let select of dropdowns){

    for(currCode in countryList){
        let newOption = document.createElement("option") ;
        newOption.innerText = currCode ;
        newOption.value = currCode ;
       
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){

            newOption.selected = "selected" ;

        }
        select.append(newOption) ;
    }
    
select.addEventListener("change" , (evt)=>{

 updateFlag(evt.target);

});

}

const updateFlag = (element)=>{

let currCode = element.value ;
let countryCode = countryList[currCode] ;
let newflag = `https://flagsapi.com/${countryCode}/flat/64.png` ;
let flagupdated = element.parentElement.querySelector("img")
flagupdated.src = newflag ;

}

btn.addEventListener("click" , async (evt)=>{

evt.preventDefault() ;
let amount = document.querySelector(".amount input") ;
let amount_val = amount.value;
if(amount_val = "" || amount_val<0){
    amount_val = "1" ;
    amount.value = 1 ;
}
// console.log(fromCurr.value.toLowerCase() , toCurr.value.toLowerCase()) ;

const URL = `${BASE_URL}/${fromCurr.value}`;
let response = await fetch(URL) ;
let data = await response.json();
let currency_convert = data.conversion_rates ;
console.log(`${toCurr.value}`, currency_convert[toCurr.value]) ;

output.innerText =  currency_convert[toCurr.value]*amount.value;

msg.innerText = `1${fromCurr.value} = ${toCurr.value}` ;

})