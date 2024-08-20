let myLibrary = [];

function incrementBookId(library) {
    let id = 0;
    return function() {
        return id++;
    };
}

let getId = incrementBookId();


function Book(title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead? "already read" : "not read yet"}` 
    }
}

function addBookToLibrary(title, author, pages, isRead, id) {
    const book = new Book(title, author, pages, isRead, id);
    myLibrary.push(book);
}


function createCard(title, author, pages, isRead, id) {

    const newCard = document.createElement("div");
    newCard.classList.add("card", "book");
    newCard.id = id;

    const topCard = document.createElement("div");
    topCard.classList.add("top")

    function createContentLine(classe, leftText, rightText) {

        const line = document.createElement("div");
        line.classList.add("info",classe);

        const leftSpan = document.createElement("span");
        leftSpan.classList.add("left");
        leftSpan.textContent = leftText;

        const rightSpan = document.createElement("span");
        rightSpan.classList.add("right");
        rightSpan.textContent = rightText;

        line.append(leftSpan, rightSpan);
        return line;
    }

    function createIsReadLine(classe, leftText) {
        const line = document.createElement("div");
        line.classList.add("info", classe);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "isread";
        checkbox.id = "isread";
        checkbox.value = "yes";
        isRead ? checkbox.checked = true : null;

        const label = document.createElement("label");
        label.for = "isread";
        label.textContent = leftText;

        checkbox.addEventListener('change', function(event) {
            const book = myLibrary.find((book) => book.id === id);
            book.isRead = event.target.checked;
        })


        line.append(checkbox, label);
        return line;
    }

    function createButtonLine(classe, text) {
        const line = document.createElement("button");
        line.className = classe;
        line.type = "submit";
        line.textContent = text;
        line.addEventListener('click', function(event) {
            myLibrary = deleteFromLibrary(parseInt(id));
            newCard.remove();
        })
        return line;
    }

    topCard.append(
        createContentLine("title", "Titre : ", title),
        createContentLine("author", "Author : ", author ),
        createContentLine("pages", "Pages : ", pages ),
        createIsReadLine("isread", "I've read this book", isRead),
    )

    newCard.append(topCard);
    newCard.append(createButtonLine("button red", "Delete Book"));

    const library = document.querySelector(".library");
    library.append(newCard);
}

function displayLibrary(library) {
    library.forEach((book) => createCard(book.title, book.author, book.pages, book.isRead));
};

// addBookToLibrary("the hobbit2", "J.R.R", 834, false)

function clearLibrary(library) {
    const listOfCards = document.querySelectorAll(".book");
    Array.from(listOfCards).forEach((element) => element.remove());
}

// displayLibrary(myLibrary);

const form = document.querySelector(".book-submit");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.querySelector('input[name="isread"]').checked === true;
    const id = getId();
    addBookToLibrary(title, author, pages, isRead, id);
    createCard(title, author, pages, isRead, id);
    // clearLibrary(myLibrary);
    // displayLibrary(myLibrary);
})

function deleteFromLibrary(id) {
    return myLibrary.filter((book) => book.id !== id);
}

