// Books object
var gBooks = [
{
    id: 1,
    name: 'Central Park',
    price: 90,
    details: 'New York, 8am. Alice, a young Parisian cop and Gabriel, American jazz pianist,wake up on a bench in Central park hand­cuffed to one another'+
    'They don’t know each other and have no memory of having met. The night before, Alice was at a party with her girl­friends on the Champs-Elysées and'+ 
    'Gabriel was playing piano in a club in Dublin.Impossible? And yet… So many ques­tions leave them con­founded.'+
    'How did they get them­selves into such a dan­gerous sit­u­a­tion? Whose blood has stained Alice’s shirt? Why is one bullet missing from her gun?'+
    'Alice and Gabriel are left with no choice but to team up to figure out what is hap­pening to them and get back to their normal lives.'+
    'What they are going to dis­cover will turn their lives upside down.',
    imgURL: 'img/centralPark.jpg',
    rate: 9
},
{
    id: 2,
    name: 'Call from an Angel',
    price: 40,
    details: 'What starts as a romantic comedy turns progressively into a high-flying thriller. A masterful intrigue driven by moving characters'+
    'A superbly executed finale two whole lives contained in two tiny mobile phones… New York, JFK Airport. In a packed airport lounge,'+
    'a man and a woman literally run into each other, spilling their belongings on the floor. After a brief shouting match, they go their separate ways.'+
    'Madeline and Jonathan have never met before, and should never have met again. However, as they hurried to collect their things, they switched'+
    'mobile phones. When they realise their mistake, they are already more than 6,000 miles apart: She is a florist in Paris, and he owns a restaurant in'+
    'San Francisco. It doesn’t take long before they give in to temptation and explore the contents of each other’s phones. An indiscretion on both their'+
    'parts, but which leads to an unexpected revelation: their lives are linked by a secret that both thought would stay buried forever…',
    imgURL: 'img/callFromAngel.jpg',
    rate: 5
}];

// Adding a book to the table
function addBookToTable() {
    var bookDetails;
    var bookImage;
    if(gElFormBookDesc.value === '') {
        bookDetails = "No information was provided for this book...SORRY!";
    } else {
        bookDetails = gElFormBookDesc.value;
    }
    if (gElFormBookImg.value === '') {
        bookImage = 'img/noImage.jpg';
    } else {
        bookImage = gElFormBookImg.value;
    }
    if(gElFormInputName.value !== '' && gElFormInputPrice.value !== '') {
        gBooks.push({id: gBooks.length+1, name: gElFormInputName.value, price: gElFormInputPrice.value, details: bookDetails, imgURL: bookImage});
        renderBooks();
        toggleBooksAdding();
    } else {
        alert('Please insert price and name!!');
    }
}

// Delete book row
function deleteBook(bookId) {
    var itemsForRemove = document.querySelector('#tr-'+bookId+'');
    itemsForRemove.remove();
    gBooks.splice(bookId,1);
}

// Activates once you click the Update button
function readAndUpdateBook (bookId) {
    var newPrice = prompt('Insert new price:');
    if(newPrice !== null) {
        updateBook(bookId, newPrice);
    }
}

// Update book
function updateBook(bookId, newPrice) {
    gBooks[bookId].price = newPrice;
    renderBooks();
}