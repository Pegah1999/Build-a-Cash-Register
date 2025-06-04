let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

let changObj = [
    ['PENNY', 0],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0]
  ];

const cash = document.querySelector("#cash");
const purchaseBtn = document.querySelector("#purchase-btn");
const changeDue = document.querySelector("#change-due");


purchaseBtn.addEventListener("click", outputPurchase);
cash.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        outputPurchase();
        cash.value = "";
    }
  });

function updateDrawer(){
    document.getElementById("total").textContent = `Total: $${price}`;

    document.getElementById("pennies").textContent = `Pennies: $${cid[0][1]}`;
    document.getElementById("nickels").textContent = `Nickels: $${cid[1][1]}`;
    document.getElementById("dimes").textContent = `Dimes: $${cid[2][1]}`;
    document.getElementById("quarters").textContent = `Quarters: $${cid[3][1]}`;
    document.getElementById("ones").textContent = `Ones: $${cid[4][1]}`;
    document.getElementById("fives").textContent = `Fives: $${cid[5][1]}`;
    document.getElementById("tens").textContent = `Tens: $${cid[6][1]}`;
    document.getElementById("twenties").textContent = `Twenties: $${cid[7][1]}`;
    document.getElementById("hundreds").textContent = `Hundreds: $${cid[8][1]}`;

    for (let i = changObj.length - 1; i >= 0 ; i--) {
        if(changObj[i][1]) {
            changeDue.textContent += `\n${changObj[i][0]}: $${changObj[i][1]}`;
        }
    }
};
updateDrawer();

function hasMoreThanTwoDecimals(num) {
    return (num.toString().split('.')[1]?.length || 0) > 2;
  }
  
function giveBackChange(change) {
    const CID = [...cid];
    const values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    let cashLeft = 0;
    for(let i = changObj.length - 1; i >= 0 ; i--) {
        let temp = Math.min(values[i]*Math.floor((change)/(values[i])), cid[i][1]);
        cid[i][1] -= temp;      
            if(hasMoreThanTwoDecimals(cid[i][1])) {cid[i][1] = cid[i][1].toFixed(2);}
        changObj[i][1] = temp;  
            if(hasMoreThanTwoDecimals(changObj[i][1])) {changObj[i][1] = changObj[i][1].toFixed(2);}
        change -= temp;         
            if(hasMoreThanTwoDecimals(change)) {change = change.toFixed(2);}
        if(cid[i][1]) {cashLeft++;}
    }
    if(change) {changeDue.textContent = "Status: INSUFFICIENT_FUNDS"; cid = [...CID];}
    else if(cashLeft) {changeDue.textContent = "Status: OPEN"; updateDrawer();}
    else {changeDue.textContent = "Status: CLOSED"; updateDrawer();}
}

function outputPurchase() {
    const Cash = parseFloat(cash.value.replace(/[\s]/g,''));
    if(Cash < price){
        alert("Customer does not have enough money to purchase the item");
    }
    else if(Cash === price){
        changeDue.textContent = "No change due - customer paid with exact cash";
    }
    else {
        const change = Cash - price;
        giveBackChange(change);
    }
};
