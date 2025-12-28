const toDoName = document.querySelector(".toDoName");
const toDoSubmit = document.querySelector(".toDoSubmit");
const toDoInfo = document.querySelector(".toDoInfo");
const toDoTime = document.querySelector(".toDoTime");
const toDoCard = document.querySelector(".toDoCard");
const toDoTimePositive = document.querySelectorAll(".toDoTimePositive");
const toDoTimeNegative = document.querySelectorAll(".toDoTimeNegative");
const warningMessage = document.querySelector(".warningMessage");
const toDoComponents = document.querySelector(".toDoComponents");
const toDoHeader = document.querySelector(".toDoHeader");
let toDoItems = [];


function addTask() {

    if (toDoName.value.trim() === "" || toDoTime.value.trim() === "") {
        warningMessage.style.display = "block";
    }
    else {
        warningMessage.style.display = "none";

        const targetDate = initialTime(toDoTime.value);

        const container = document.createElement("div");
        container.classList.add("toDoCard");

        const toDoTitle = document.createElement("p");
        toDoTitle.classList.add("toDoTitle");
        toDoTitle.textContent = toDoName.value;
        
        const toDoDescription = document.createElement("p");
        toDoDescription.classList.add("toDoDescription");
        const trimmedDescription = trimDescription();
        toDoDescription.textContent = trimmedDescription;

        const divDivider = document.createElement("div");
        divDivider.classList.add("divDivider");

        const divDivider2 = document.createElement("div");
        divDivider2.classList.add("divDivider2");

        const toDoTimePositive = document.createElement("span");
        toDoTimePositive.classList.add("toDoTimePositive");

        divDivider.appendChild(toDoTitle);
        divDivider.appendChild(toDoDescription);

        divDivider2.appendChild(toDoTimePositive);

        container.appendChild(divDivider);
        container.appendChild(divDivider2);

        toDoHeader.insertAdjacentElement("afterend", container);

        toDoItems.push({
            deadline: targetDate,
            element: toDoTimePositive,
            parentContainer: container
        })
    }

}

function trimDescription() {
    
    if (toDoInfo.value.length >= 200) {
        const toDoInfoShorten = toDoInfo.value.slice(0, 100) + "…";
        return toDoInfoShorten;
    }
    else {
        return toDoInfo.value;
    }

}

function initialTime(target) {

    const now = new Date();

    const [targetHours, targetMinutes] = target.split(":");

    const targetDate = new Date();
    targetDate.setHours(targetHours);
    targetDate.setMinutes(targetMinutes);
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);

    if (targetDate < now) {
        targetDate.setDate(targetDate.getDate() + 1);
    }

    return targetDate;

}

function setTime(msDiff) {

    msDiff = Math.floor(msDiff / 1000);

    const hours = String(Math.floor(msDiff / 3600)).padStart(2, "0");
    msDiff %= 3600;

    const minutes = String(Math.floor(msDiff / 60)).padStart(2, "0");
    const seconds = String(msDiff % 60).padStart(2, "0");

    const time = [hours, minutes, seconds];

    return time;

}

function countTime() {

    const now = new Date();
    toDoItems.sort((a, b) => b.deadline - a.deadline);
    console.log(toDoItems);

    toDoItems.forEach((item) => {

        const diff = item.deadline - now;

        let msDiff = Math.floor(diff / 1000);

        const hours = String(Math.floor(msDiff / 3600)).padStart(2, "0");
        msDiff %= 3600;

        const minutes = String(Math.floor(msDiff / 60)).padStart(2, "0");
        const seconds = String(msDiff % 60).padStart(2, "0");

        const time = [hours, minutes, seconds];

        item.element.textContent = `${time[0]}:${time[1]}:${time[2]}`;

        toDoHeader.insertAdjacentElement("afterend", item.parentContainer);
    })

}

setInterval(countTime, 1000);