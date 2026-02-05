const balance = document.getElementById("balance"),
    moneyPlus = document.getElementById("moneyPlus"),
    moneyMinus = document.getElementById("moneyMinus"),
    list = document.getElementById("list"),
    form = document.getElementById("form"),
    text = document.getElementById("text"),
    amount = document.getElementById("amount");



let transactions = [];


form.addEventListener("submit", addTransaction); // pag pinindot ni user yung button na nsa loob ng form
function addTransaction(e) {
    e.preventDefault();

    // console.log(text.value,amount.value);
    const transtion = {
        id: generateID(),
        text: text.value, 
        amount: amount.value}; // list of text and amount

    addTransactionDom(transtion); // tatawaging yung funtion na gumagawa ng li
    transactions.push(transtion); // tatawaging yung empthy list na may kasamang list of text and amount
    // console.log(transactions);

    updateTransaction() //tatawagin si (total,income,expenses)


    // di ko alam kung para san yan
    text.value = "";
    amount.value = "";


    init() // tinawag si (click remove) para mawala agad yung (no transaction)
}



function generateID() {
    return Math.floor(Math.random() * 100000000)
}


//  too add the li in list (mag aadd ng transaction)
function addTransactionDom(transtion) {
    const sign = transtion.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transtion.amount < 0 ? "minus" : "plus") // for color on the border line

    item.innerHTML = `${transtion.text} 
    <div><span>${sign} ₱${Math.abs(transtion.amount)}</span>
    <button class="delete" onclick="removeTransaction(${transtion.id})">x<button>`; //gumagawa ng line sa html tapos sa loob parin ng line na yun pede magsulat ng html code
    
    list.appendChild(item); // pust to li
}


// remove 
function removeTransaction(id){
    // console.log(id);
    transactions = transactions.filter((transaction) => transaction.id !== id)
    init() // tatawagan yung (click remove)
    updateTransaction() //tatawagin si (total,income,expenses) para pag pinindut yung x maaalis din yung amout di sya mag stay dun
}

// click remove
function init(){
    list.innerHTML=""; // to remove
    // para pag nagdelete ka lahat ay lilitaw yung (No transaction) 
    if (transactions.length == 0) { //yung length ay yung bilang nung transaction sa loob
        const item = document.createElement('li'); //create
        item.innerHTML = "No Transaction" // isusulat
        list.appendChild(item) //location 
    }


    transactions.forEach(addTransactionDom);
}


// para palabasin yung (total,income,expenses)
function updateTransaction() {
    const amounts = transactions.map((transaction) => Number(transaction.amount)); // convert into number (lahat ng papasok sa transaction ay magiging amount)

    // .reduce == para magcalculate at pagsamasamahin
    //.filter == para syang if statement 
    // toFixed(2) ay mag convert number into str and make it into decemal (pababaliking paramagamit masulat ulit)


    // Calculate total
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);  
    // toFixed - para magdisplay ng decimal at maconvert it into string

    // console.log(total);


    // income
    const income = amounts 
        .filter((item) => item > 0) // ififilter nya kung mas malaki ba yun sa 0 (keep only positive)
        .reduce((acc, item) => (acc += item),0) // (calculator) pag add lahat para mag total
        .toFixed(2)
    
    // expense
    const expense = (
        amounts.filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * 
        -1
    ).toFixed(2);

    // console.log(amounts, total, income, expense)


    // para isulat sa html
    balance.innerHTML=`₱${total}`; // para sa balance
    moneyPlus.innerHTML=`₱${income}`; // para sa income
    moneyMinus.innerHTML=`₱${expense}`; // para sa expense
}

