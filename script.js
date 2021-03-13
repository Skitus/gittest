let add = document.getElementsByClassName('add');
let table = document.getElementsByClassName('table');
let kilograms = document.getElementsByClassName('kilograms');
let price = document.getElementsByClassName('price');
let sort = document.getElementsByClassName('sort');
let diagrams = document.getElementsByClassName('diagrams');
let ths = document.getElementsByTagName('th');
let tds = document.getElementsByClassName('forKg');

let n = 0;
let arr = [];
let flag = true;
let oldArray = [];
let max = 0;
let min = 0;

add[0].addEventListener('click', addTable);

//function create html table (td)

function addTable() {
    n++;
    let tr = document.createElement('tr');

    let tdNumber = document.createElement('td');
    tdNumber.className = 'number';
    tdNumber.innerHTML = n;

    let tdForKg = document.createElement('td');
    tdForKg.className = 'forKg';
    tdForKg.innerHTML = price[0].value;

    let tdKg = document.createElement('td');
    tdKg.className = 'tdKg';
    tdKg.innerHTML = kilograms[0].value;

    let tdPrice = document.createElement('td');
    tdPrice.className = 'priceTotal';
    tdPrice.innerHTML = `${Math.round(+kilograms[0].value * +price[0].value)}`;

    let tdData = document.createElement('td');
    tdData.className = 'data';
    let data = new Date();
    tdData.innerHTML = `${data.getDate()}.${data.getMonth() + 1}--${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

    let tdSort = document.createElement('td');
    tdSort.className = 'sort';
    tdSort.innerHTML = sort[0].value;

    tr.appendChild(tdNumber);
    tr.appendChild(tdData);
    tr.appendChild(tdForKg);
    tr.appendChild(tdKg);
    tr.appendChild(tdPrice);
    tr.appendChild(tdSort);
    table[0].appendChild(tr);

    arr.push(+price[0].value);

    constructDiagram(arr, 400, 1000);

}


function constructDiagram(arr, height, width) {
    checkBards();

        let max123 = Number.NEGATIVE_INFINITY;
        diagrams[0].style.height = height + 'px';
        diagrams[0].style.width = width + 'px';
        diagrams[0].style.position = 'relative';
        let scale;
        let barWidth ;

        for (let i = 0; i < arr.length; i++) {
            if (max123 < arr[i]) {
                max123 = arr[i];
            }
        }
            scale =  height / max123;
            barWidth = Math.floor(width / arr.length);

        for (let j = 0; j < arr.length; j++) {
            let div = document.createElement('div');
            div.className = 'cage';
            div.style.height = (arr[j] * scale) + 'px';
            div.style.width = (barWidth - 4) + 'px';

            div.style.position = 'absolute';
            div.style.margin = '4%';
            div.style.bottom = '0px';
            div.style.left = barWidth * j + 'px';
            div.style.backgroundColor = 'green';
            diagrams[0].appendChild(div);
        }
}

function checkBards() {
    let bards = document.getElementsByClassName('cage');
    while(diagrams[0].childNodes.length != 0) {
        for (let i = 0; i < bards.length; i++) {

            diagrams[0].removeChild(bards[i]);

        }
    }
}

function sortTd(classAtr) {

    let arrayforTd = [];
    let sortArray = [];
    let trs = document.getElementsByClassName(classAtr); // 'forkG'
    let arg = classAtr;
    let massageDiagram = document.getElementsByClassName('massageDiagram');


    return function () {

        if (flag == true) {
            for (let u = 0; u < ths.length; u++) {
                let items = ths[u].getAttribute('onclick');
                localStorage.setItem(`attributes${u}`, items);
                if (ths[u].hasAttribute('onclick') && ths[u] != event.target) {
                    ths[u].removeAttribute('onclick');
                }
            }

            massageDiagram[0].innerHTML = `Отсортированная Диграма ${event.target.innerHTML}`;
            event.target.style.backgroundColor = 'grey';

            for (let q = 0; q < trs.length; q++) {
                oldArray.push(+trs[q].innerHTML);
                trs[q].style.backgroundColor = 'grey';
            }

            for (let j = 0; j < trs.length; j++) {
                arrayforTd.push(trs[j].innerHTML);
            }

            for (let k = 0; k < arrayforTd.length; k++) {
                let str = +arrayforTd[k];
                sortArray.push(str);
                sortArray.sort();
                sortArray.sort((a, b) => {
                    return b - a
                });
            }

            for (let j = 0; j < trs.length; j++) {
                if (sortArray[j] == sortArray[0]) {
                    trs[j].style.backgroundColor = 'red';
                    localStorage.setItem(`max${trs[j].className}`, sortArray[j]);
                } else if (sortArray[j] == sortArray[sortArray.length - 1] ) {
                    trs[j].style.backgroundColor = 'green';
                    localStorage.setItem(`min${trs[j].className}`, sortArray[j]);
                }
                trs[j].innerHTML = sortArray[j];
            }

            constructDiagram(sortArray, 400, 1000);

        } else {

            for (let u = 2; u < 5; u++) {
                let itemsLocal = localStorage.getItem(`attributes${u}`);
                ths[u].setAttribute('onclick', itemsLocal);

            }


            massageDiagram[0].innerHTML = `Не Отсортированная Диграма ${event.target.innerHTML}`;
            event.target.style.backgroundColor = 'white';
            for (let q = 0; q < trs.length; q++) {
                trs[q].innerHTML = oldArray[q];

                trs[q].style.backgroundColor = 'white';
            }

            constructDiagram(oldArray, 400, 1000);

            while (oldArray.length != 0) {
                oldArray.pop();
            }
        }
        checkIt(arg);
        flag = !flag;
    }
}

function checkIt(classAtr1) {
    let trs = document.getElementsByClassName(classAtr1);

    for (let j = 0; j < trs.length; j++) {
        let a = localStorage.getItem(`max${trs[j].className}`);
        let b = localStorage.getItem(`min${trs[j].className}`);
        if ( a == trs[j].innerHTML) {
            trs[j].style.backgroundColor = 'red';
        } else if (b  == trs[j].innerHTML) {
            trs[j].style.backgroundColor = 'green';
        }
    }
}
