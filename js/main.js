'use strict';

// When adding a book by using the form: Name, price, image and descriptions elements
var gFormDetails;


var gElFormInputName = document.querySelector('#nameID');
var gElFormInputPrice = document.querySelector('#priceID');
var gElFormBookImg = document.querySelector('#imageID');
var gElFormBookDesc = document.querySelector('#descID');

// Rate state
var gThumbsState = {
    up: false,
    down: false
}
var gIsClickedUp = false;
var gIsClickedDown = false;

var gElRateLabel = document.querySelector('.rateLabel');

var gCurrIndex;

var gElDesc = document.querySelector('.descriptionWindow');

// thumbs up
var gElThumbsUp = document.querySelector('.thumbsUp');

// thumbs down
var gElThumbsDown = document.querySelector('.thumbsDown');

// check sorted direction
var gIsAscend = false;

// Form element
var gElForm = document.querySelector('.newBookForm');

// Form open or not element
var gIsOpen = false;

//Initiate the page
function initPage() {
    renderBooks();

}

// This function will draw the table
function renderBooks() {
    // Books shop table div element
    var booksShopTable = document.querySelector('.booksShopTableDiv');

    var booksTableStr = '<table class ="table-bordered table"> <tbody ><tr><th>Id</th><th class="thNamecursor" onclick ="sortTableByName()"><span class="glyphicon glyphicon-sort"></span> Name</th><th>Price</th><th colspan = "3">Actions</th></tr>';
    for (var i = 0; i < gBooks.length; i++) {
        booksTableStr += '<tr id="tr-'+i+'">';
        for(var prop in gBooks[i]) {
            if(prop !== 'details' && prop !== 'rate' && prop !== 'imgURL'){
                booksTableStr += '<td>'+ gBooks[i][prop]+'</td>';
            }
        }
        booksTableStr += '<td><button class = "btn btn-info" onclick ="bookDetails('+i+')">Read</button></td>';
        booksTableStr += '<td><button class = "btn btn-warning" onclick ="readAndUpdateBook('+i+')">Update</button></td>';
        booksTableStr += '<td><button class = "btn btn-danger" onclick ="deleteBook('+i+')">Delete</button></td>';
        booksTableStr += '</tr>';
    }
    booksTableStr += '</tr></tbody></table>';
    booksShopTable.innerHTML = booksTableStr;
}

// Toggle open form
function toggleBooksAdding() {
    gIsOpen = !gIsOpen;
    if(gIsOpen) {
        closeDesc();
        gElForm.style.display = 'block';
        gElForm.style.animation = 'openForm 1.5s';
        gElForm.style.height = '500px';
        gElFormInputName.value = '';
        gElFormInputPrice.value = '';
        gElFormBookImg.value = '';
        gElFormBookDesc.value = '';
    }else {
        gElForm.style.animation = 'closeForm 1.5s';
        gElForm.style.height = '0';
    }
}

// Activates once you click the Read button
function bookDetails(bookId) {

    if(gElForm.style.animation === 'openForm 1.5s') {
        gElForm.style.display = 'none';
    }
    gCurrIndex = bookId;
    
    var elDescTitle = document.querySelector('#descTitle');
    var elbookImg = document.querySelector('.bookImg');
    var elbookDesc = document.querySelector('.bookDesc');
    
    //gElDesc.style.animation = 'openForm 1.5s';
    gElDesc.style.display = 'block';
    elDescTitle.innerHTML = gBooks[bookId].name;
    elbookImg.src = gBooks[bookId].imgURL+'';
    elbookDesc.innerHTML = '<text>'+gBooks[bookId].details+'</text>';
    if(gBooks[bookId].rate !== undefined) {
        gElRateLabel.innerHTML = gBooks[bookId].rate;
    } else {
        gElRateLabel.innerHTML = 0;
    }
    console.log('gElbookImg',elbookImg);
}

function closeDesc() {
    gElDesc.style.display = 'none';
}

function sortTableByName() {
    gIsAscend = !gIsAscend;
    if(gIsAscend){
        gBooks.sort(function(a, b) {
            return (a.name > b.name) - (a.name < b.name);
        });
    } else {
        gBooks.sort(function(a, b) {
            return (a.name < b.name) - (a.name > b.name);
        });
    }
    renderBooks();
}

// Update rate according to thumbs up or thumbs down
function rateClicked(rate) {
    if (rate === 'up') {
        gIsClickedUp = !gIsClickedUp;
        // Check if the state up is true meaning it's highligted and if we clicked it.
        if (gThumbsState.up && !gIsClickedUp){
            // Then just remove the highlight
            gElThumbsUp.classList.remove("selected");
            gBooks[gCurrIndex].rate -= 1; 
            gElRateLabel.innerHTML = gBooks[gCurrIndex].rate + '';
        } else {
            if(gIsClickedDown) {
                if (gBooks[gCurrIndex].rate < 10) {
                    gBooks[gCurrIndex].rate += 2; 
                    gElRateLabel.innerHTML = gBooks[gCurrIndex].rate + '';
                    gIsClickedDown = false;
                }
            } else if (gBooks[gCurrIndex].rate < 10) {
                gBooks[gCurrIndex].rate += 1; 
                gElRateLabel.innerHTML = gBooks[gCurrIndex].rate + '';
            }
            // Update global state
            gThumbsState.up = true;
            gThumbsState.down = false;
            gElThumbsUp.classList.add("selected");
            gElThumbsDown.classList.remove("selected");
        }
    } else {
        
         gIsClickedDown = !gIsClickedDown; 
        if (gThumbsState.down && !gIsClickedDown) {
            gElThumbsDown.classList.remove("selected");
            gBooks[gCurrIndex].rate += 1; 
            gElRateLabel.innerHTML = gBooks[gCurrIndex].rate + '';
        } else {
               
            if (gIsClickedUp) {
                if (gBooks[gCurrIndex].rate > 0) {
                    gBooks[gCurrIndex].rate -= 2; 
                    gElRateLabel.innerHTML = gBooks[gCurrIndex].rate + '';
                    gIsClickedUp = false;
                 } 
            } else if (gBooks[gCurrIndex].rate > 0) {
                gBooks[gCurrIndex].rate -= 1; 
                gElRateLabel.innerHTML = gBooks[gCurrIndex].rate + '';
            }
            gThumbsState.up = false;
            gThumbsState.down = true;
            gElThumbsDown.classList.add("selected");
            gElThumbsUp.classList.remove("selected");
        }
    }
}