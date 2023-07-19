class Book {
    constructor(title) {
      this.title = title;
    }
  
    static fromJSON(json) {
      return new Book(json.title);
    }
  }
  
  class UI {
    constructor() {
      this.form = document.getElementById('form');
  
      this.title = document.getElementById('title-input');
      this.tableBody = document.getElementById('table-body');
  
      this.form.addEventListener('submit', (e) => this.onFormSubmit(e));
  
      this.books = [];
      this.loadBooksFromLocalStorage();
      this.renderBookTable();
    }
  
    onFormSubmit(e) {
      e.preventDefault();
  
      if (
        this.title.value == '' 
        
      ) {
        return;
      }
  
      const book = new Book(this.title.value);
      this.books.push(book);
  
      this.saveBooksToLocalStorage();
      this.renderBookTable();
  
      this.title.value = '';
      
    }
  
    renderBookTable() {
      this.tableBody.innerHTML = '';
  
      for (let i = 0; i < this.books.length; i++) {
        const book = this.books[i];
  
        const tr = this.createBookTableRow(book);
        this.tableBody.appendChild(tr);
      }
    }
  
    createBookTableRow(book) {
      const tr = document.createElement('tr');
  
      const tdTitle = document.createElement('td');
      const tdActions = document.createElement('td');
  
      tdTitle.innerHTML = book.title;
  
      const actionButtons = this.createActionButtons(book);
      tdActions.appendChild(actionButtons[0]);
      tdActions.appendChild(actionButtons[1]);
  
      tr.appendChild(tdTitle);
      tr.appendChild(tdActions);
  
      return tr;
    }
  
    createActionButtons(book) {
      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');
  
      deleteButton.setAttribute('class', 'btn btn-danger btn-sm me-1');
      deleteButton.innerHTML = 'Delete';
      deleteButton.addEventListener('click', () => {
        this.onDeleteBookClicked(book);
      });
  
      editButton.setAttribute('class', 'btn btn-warning btn-sm ms-1');
      editButton.innerHTML = 'Edit';
      editButton.addEventListener('click', () => {
        this.onEditBookClicked(book);
      });
  
      return [deleteButton, editButton];
    }
  
    onDeleteBookClicked(book) {
      this.filterBookArray(book);
      this.saveBooksToLocalStorage();
      this.renderBookTable();
    }
  
    onEditBookClicked(book) {
        const index = this.books.findIndex((currentBook) => book.title === currentBook.title);
        if (index !== -1) {
          const newTitle = this.title.textContent.trim();
          if (newTitle !== '') {
            this.books[index].title = newTitle;
            this.saveBooksToLocalStorage();
            this.renderBookTable();
            this.title.textContent = ''; // Clear the title after editing
          }
        }
      }
  
    filterBookArray(book) {
      this.books = this.books.filter((currentBook) => {
        return book.title !== currentBook.title;
      });
      // [1, 2, 3, 4]
      // [1, 3, 4]
    }
  
    saveBooksToLocalStorage() {
      const json = JSON.stringify(this.books);
      // [{}, {}]
      // "[{}{}]"
      localStorage.setItem('books', json);
    }
  
    loadBooksFromLocalStorage() {
      const json = localStorage.getItem('books');
      if (json) {
        const bookArr = JSON.parse(json);
        // "[{}{}]"
        // [{}, {}]
        this.books = bookArr.map((book) => Book.fromJSON(book));
      }
    }
  }
  
  const ui = new UI();