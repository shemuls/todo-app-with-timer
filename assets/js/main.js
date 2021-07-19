// Get today date
let todayDate = new Date().toDateString();
document.getElementById(
  "today-date"
).innerHTML = `<h6 class="">Today Date: ${todayDate}</h6>`;
const itemSubmitForm = document.getElementById("itemSubmitForm");

// Submit add item form
itemSubmitForm.addEventListener("submit", submitItem);
function submitItem(e) {
  const workName = document.getElementById("workName").value;
  const clientName = document.getElementById("clientName").value;
  const endDate = document.getElementById("endDate").value;
  const endTime = document.getElementById("endTime").value;
  const { totalSecond } = startCountDown(endDate + " " + endTime);
  const setTotalSecond = totalSecond;

  const id = Math.floor(Math.random() * 100000);
  const price = 0;
  const status = "Do";
  const item = {
    id,
    workName,
    clientName,
    endDate,
    endTime,
    price,
    setTotalSecond,
    status,
  };
  let items = [];

  if (workName) {
    if (localStorage.getItem("items")) {
      items = JSON.parse(localStorage.getItem("items"));
    }
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
  }
  showAll();
  this.reset();
  e.preventDefault();
}

// CountDown function
const startCountDown = (dateTime = "2021-7-28 2:22", completed = false) => {
  const getDateTime = new Date(dateTime).getTime();
  const currentDateTime = new Date().getTime();

  let countDownData;
  if (completed == true) {
    countDownData = {
      taskStatus: "done",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSecond: 0,
    };
  } else {
    const distance = getDateTime - currentDateTime;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      countDownData = {
        taskStatus: "do",
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        totalSecond: Math.floor(distance / 1000),
      };
    } else {
      countDownData = {
        taskStatus: "expired",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSecond: 0,
      };
    }
  }

  return countDownData;
};

// Add item price
const addItemPrice = (id) => {
  if (id) {
    if (localStorage.getItem("items")) {
      const items = JSON.parse(localStorage.getItem("items"));
      const getPrice = document.getElementById("price-" + id).value;
      const currentItem = items.find((item) => item.id == id);
      if (getPrice) {
        currentItem.price = getPrice;
      }
      localStorage.setItem("items", JSON.stringify(items));
    }

    showAll();
  }
};
// Edit item price
const editItemPrice = (id) => {
  if (id) {
    if (localStorage.getItem("items")) {
      const items = JSON.parse(localStorage.getItem("items"));
      const currentItem = items.find((item) => item.id == id);
      const getPrice = prompt("Edit Price", currentItem.price);
      if (getPrice) {
        currentItem.price = getPrice;
      }
      localStorage.setItem("items", JSON.stringify(items));
    }

    showAll();
  }
};
// Purchase status change taskComplete
const taskComplete = (id) => {
  if (id) {
    if (localStorage.getItem("items")) {
      const items = JSON.parse(localStorage.getItem("items"));
      const currentItem = items.find((item) => item.id == id);
      currentItem.status = "Done";

      localStorage.setItem("items", JSON.stringify(items));
    }

    showAll();
  }
};
// Delete item
const deleteItem = (id) => {
  if (id) {
    if (localStorage.getItem("items")) {
      const items = JSON.parse(localStorage.getItem("items"));
      const remainingItem = items.filter((item) => item.id !== id);

      localStorage.setItem("items", JSON.stringify(remainingItem));
    }
  }
  showAll();
};

// set interval funciton
setInterval(() => {
  showAll();
}, 1000);

// Show all item
const showAll = () => {
  if (localStorage.getItem("items")) {
    const getitems = JSON.parse(localStorage.getItem("items"));

    // item counter
    document.getElementById("itemCounter").innerHTML = getitems.length;
    document
      .getElementById("itemCounter")
      .addEventListener("click", function () {
        // console.log("test click");
      });
    document.getElementById("itemCounter").click();
    // Item do counter
    const doCounter = getitems.filter((item) => item.status == "Do");
    document.getElementById("itemDoCounter").innerHTML = doCounter.length;
    // Total cost
    let totalCost = 0;

    // Item done counter
    const doneCounter = getitems.filter((item) => item.status == "Done");
    document.getElementById("itemDoneCounter").innerHTML = doneCounter.length;

    const todoListItem = document.getElementById("todo-list-items");
    todoListItem.innerHTML = "";

    let countDownHtml;

    for (let i = 0; i < getitems.length; i++) {
      const element = getitems[i];
      let totalSum = parseInt(element.price);
      totalCost = totalCost + totalSum;

      let taskCompletedOrNot;
      if (element.status == "Done") {
        taskCompletedOrNot = true;
      } else {
        taskCompletedOrNot = false;
      }
      const endDate = element.endDate;
      const endTime = element.endTime;
      const { taskStatus, days, hours, minutes, seconds, totalSecond } =
        startCountDown(`${endDate} ${endTime}`, taskCompletedOrNot);

      // progress bar color
      const totalSecond30 = element.setTotalSecond / 3;
      const totalSecond60 = element.setTotalSecond / 2;
      const totalSecond100 = element.setTotalSecond / 1;
      let progressBarColor;
      let progressBarColorBack;
      if (totalSecond < totalSecond30) {
        progressBarColor = "red";
      } else if (totalSecond < totalSecond60) {
        progressBarColor = "yellow";
      } else if (totalSecond < totalSecond100) {
        progressBarColor = "green";
      } else {
        progressBarColor = "blue";
      }
      if (totalSecond === 0) {
        progressBarColorBack = "red";
      } else {
        progressBarColorBack = "white";
      }

      // COuntDown HTML

      if (taskStatus == "done") {
        countDownHtml = "<p class='badge badge-success'>Great Work</p>";
      } else if (taskStatus == "do") {
        countDownHtml = `<div class="countDownItem rounded mx-1">
                                    ${days}d
                                </div>
                                <div class="countDownItem rounded mx-1">
                                    ${hours}h
                                </div>
                                <div class="countDownItem rounded mx-1">
                                    ${minutes}m
                                </div>
                                <div class="countDownItem rounded mx-1">
                                ${seconds}s
                                </div>`;
      } else if (taskStatus == "expired") {
        countDownHtml = "<p class='badge badge-danger '>Time Expired</p>";
      } else {
        countDownHtml = "";
      }

      todoListItem.innerHTML += `

                <div class="card bajar-list-item">
                    
                    
                    <div class="row" style="display: none">
                        <div class="col-4">
                            <span class="badge badge-${
                              element.status == "Do" ? `info` : `success`
                            }">${element.status}</span>
                        </div>
                        <div id="editItemPriceInput" class="col-8 text-right">
                            ${
                              element.price > 0
                                ? `
                            <span>৳ ${element.price}  </span>
                            <button onClick="editItemPrice(${element.id})" id="editItemPriceBTN" class="btn btn-info btn-sm"><i class="fa fa-pencil"></i></button>
                            `
                                : `
                            <input name="price" id="price-${element.id}" style="width: 100px"  type="number" class="btn btn-sm btn-dark m-0 text-left" placeholder="100..">
                            <button onClick="addItemPrice(${element.id})" class="btn btn-sm btn-info m-0">Add price</button>
                            `
                            }
                            

                        </div>
                    </div>
                    <div class="row d-flex align-items-center mt-2">
                        <div class="col-3">
                            <h6>${i + 1}. ${element.workName}</h6>
                        </div>
                        <div class="col-3">
                            <h6>${element.clientName}</h6>
                        </div>
                        <div class="col-3">
                           <div class="countDown d-flex justify-content-center" >
                                ${countDownHtml}
                            </div>
                        </div>
                        <div class="col-3 text-right">
                            <button onClick="deleteItem(${
                              element.id
                            })" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
                            <button onClick="taskComplete(${
                              element.id
                            })" class="btn btn-sm btn-success"><i class="fa fa-check"></i></button>
                        </div>
                    </div>
                    <div class="row">
                <style>
                 progress {
                      border-radius: 7px; 
                      height: 5px;
                  }
                  #countDown_${element.id} progress::-webkit-progress-bar {
                      background-color: ${progressBarColorBack};
                  }
                  #countDown_${element.id} progress::-webkit-progress-value {
                      background-color: ${progressBarColor};
                  }
                </style>
                            <div class="w-100" id="countDown_${element.id}">
                            ${
                              !taskCompletedOrNot
                                ? `<progress style="width:100%;" value="${totalSecond}" max="${element.setTotalSecond}">e </progress>`
                                : ""
                            }</div>
      
                    </div>        
                </div>
                
            
            `;
      document.getElementById("itemTotalCost").innerHTML = totalCost;
    }
  }
};
showAll();
