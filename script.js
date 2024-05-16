class Expenses {
    constructor(name, cost) {
        const divison = document.createElement("div");
        const nametag = document.createElement("p");
        const costtag = document.createElement("p");
        const editIcon = document.createElement("i");
        const deleteIcon = document.createElement("i");

        editIcon.classList.add("fas", "fa-pen-to-square");
        deleteIcon.classList.add("fas", "fa-trash-can");
        nametag.innerHTML = name;
        costtag.innerHTML = parseInt(cost);


        deleteIcon.addEventListener("click", (event) => {
            removeItem(event.target.parentElement);
        });


        editIcon.addEventListener("click", (event) => {
            editItem(event.target.parentElement);
        });

        divison.appendChild(nametag);
        divison.appendChild(costtag);
        divison.appendChild(editIcon);
        divison.appendChild(deleteIcon);
        divison.classList.add("item");

        return divison;
    }
}






var totalBudget;
if (localStorage.getItem("totalBudget")) {
    totalBudget = parseInt(localStorage.getItem("totalBudget"));
}
else {
    totalBudget = 0;
}

var expensesAmount;
if (localStorage.getItem("expensesAmount")) {
    expensesAmount = parseInt(localStorage.getItem("expensesAmount"));
}
else {
    expensesAmount = 0;
}

var balanceAmount;
if (localStorage.getItem("balanceAmount")) {
    balanceAmount = parseInt(localStorage.getItem("balanceAmount"));
}
else {
    balanceAmount = 0;
}





var itemsArray;
if (localStorage.getItem("itemsArray")) {
    itemsArray = JSON.parse(localStorage.getItem("itemsArray"));
}
else {
    itemsArray = [];
}







// setting the budget amount

const setBudget = () => {
    let inputvalue = document.getElementById("budget-value").value;

    if (inputvalue.length==0) {
        alert("Enter vaild amount");
    }
    else {
        totalBudget = parseInt(inputvalue);
        displayCountBar();
        document.getElementById("budget-value").value = "";
    }
    localStorage.setItem("totalBudget", totalBudget);
}

// Amount display bar

const displayCountBar = () => {
    balanceAmount = totalBudget-expensesAmount;
    document.getElementById("totalBudget").textContent = totalBudget;
    document.getElementById("expensesAmount").textContent = expensesAmount;
    document.getElementById("balanceAmount").textContent = balanceAmount;
    
    localStorage.setItem("balanceAmount", balanceAmount);
}


// setting expenses

const setExpenses = () => {
    const name = document.getElementById("productName").value;
    const cost = document.getElementById("productCost").value;

    if (name.length==0 || cost.length==0) {
        alert("Enter valid name or cost of the product");
    }
    else{
        addExpenses(name, cost);
        itemsArray.push([name, cost]);

        expensesAmount+= parseInt(cost);
        displayCountBar();

        document.getElementById("productName").value = "";
        document.getElementById("productCost").value = "";

        localStorage.setItem("expensesAmount", expensesAmount);
        localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
    }
}


// adding expenses to the list

const addExpenses = (name, cost) => {
    const itemList = document.getElementById("itemlist");
    const x = new Expenses(name, cost);
    itemList.appendChild(x);
}


// remove item

const removeItem = (element) => {
    let cost = element.getElementsByTagName("p")[1].textContent;
    let name = element.getElementsByTagName("p")[0].textContent
    expensesAmount-=parseInt(cost);
    displayCountBar();
    localStorage.setItem("expensesAmount", expensesAmount);

    let itemList = document.getElementById("itemlist");
    itemList.removeChild(element);

    let indx = itemsArray.indexOf([name, cost]);
    itemsArray.splice(indx, 1);

    localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
}




// edit budget

const editItem = (element) => {
    const name = element.getElementsByTagName("p")[0].textContent;
    const cost = element.getElementsByTagName("p")[1].textContent;

    document.getElementById("productName").value = name;
    document.getElementById("productCost").value = cost;
    removeItem(element);
}




// generate local storage at start

const generate = () => {
    if (itemsArray.length > 0) {
        for (let i=0; i<itemsArray.length; i++){
            addExpenses(itemsArray[i][0], itemsArray[i][1]);
        }
    }
}




displayCountBar();
generate();