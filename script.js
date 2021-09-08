let jsondata = {};
var request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true);
request.send();
request.onload = function () {
    jsondata = JSON.parse(this.response);
    console.log(jsondata);
    let pagination = new Pagination();
    pagination.init(jsondata);
}


function Pagination() {
    //fecth html button for prev,page# and next buttong
    const prevButton = document.getElementById('button_prev');
    const nextButton = document.getElementById('button_next');
  
    //assign page range
    let current_page = 1;
    let records_per_page = 10;

    //call anonymous functions to move pages on user click 
    this.init = function () {
        changePage(1);
        pageNumbers();
        selectedPage();
        clickPage();
        addEventListeners();
    }

    //listener to respond to user click
    let addEventListeners = function () {
        prevButton.addEventListener('click', prevPage);
        nextButton.addEventListener('click', nextPage);
    }

    //Change shade of button upon click on page number
    let selectedPage = function () {
        let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber');
        for (let i = 0; i < page_number.length; i++) {
            if (i == current_page - 1) {
                page_number[i].style.opacity = "1.0";
            }
            else {
                page_number[i].style.opacity = "0.3";
            }
        }
    }

    //Add or remove opacity of page number upon click on Prev and Next buttons
    let checkButtonOpacity = function () {
        current_page == 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
        current_page == numPages() ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
    }

    //Change Page
    let changePage = function (page) {
        const listingTable = document.getElementById('listingTable');

        if (page < 1) {
            page = 1;
        }
        if (page > (numPages() - 1)) {
            page = numPages();
        }

        listingTable.innerHTML = "";
        listingTable.innerHTML +='<caption>User Contact Details</caption>';
        listingTable.innerHTML += '<tr><th>ID</th><th>Name</th><th>Email</th></tr>';
        for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < jsondata.length; i++) {
            listingTable.innerHTML += "<tr><td>" + jsondata[i].id + "</td><td>" + jsondata[i].name + "</td><td>" + jsondata[i].email + "</td></tr>"
        }
        checkButtonOpacity();
        selectedPage();
    }

    //get previous page based on current page
    let prevPage = function () {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    //get next page based on current page
    let nextPage = function () {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }


    let clickPage = function () {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
                current_page = e.target.textContent;
                changePage(current_page);
            }
        });
    }

    //generate page numbers using span element
    let pageNumbers = function () {
        let pageNumber = document.getElementById('page_number');
        pageNumber.innerHTML = "";

        for (let i = 1; i < numPages() + 1; i++) {
            pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
        }
    }

    //get total pages based params assigned at start of function
    let numPages = function () {
        return Math.ceil(jsondata.length / records_per_page);
    }
}
