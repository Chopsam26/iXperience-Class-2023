



class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    constructor() {
        this.form = document.getElementById('form');

        this.title = document.getElementById('form');
        this.author = document.getElementById('author-input'); 
        this.isbn = document.getElementById('isbn-input')

        this.tableBody = document.getElementById('table-body');
        
        this.form.addEventListener('sumbit', (e) => this.onformSubmit(e));
            
        this.books = {};
    }

    onformSubmit(e) {
        e.preventDefault();

        if(this.title.value)
    }
    
}

const ui = new UI();