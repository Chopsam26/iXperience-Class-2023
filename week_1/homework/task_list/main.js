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
  
      this.title = document.getElementById('title');
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
      tdActions.appendChild(actionButtons[1]);
      tdActions.appendChild(actionButtons[0]);
  
      tr.appendChild(tdTitle);
      tr.appendChild(tdActions);
  
      return tr;
    }
  
    createActionButtons(book) {
      const deleteButton = document.createElement('button');
      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
  
      deleteButton.setAttribute('class', 'btn btn-danger btn-sm me-1');
      deleteButton.innerHTML = 'Delete';
      deleteButton.addEventListener('click', () => {
        this.onDeleteBookClicked(book);
      });

      checkBox.setAttribute('class','checkbox me-4');
      checkBox.addEventListener('click', () => {
        this.onCheckboxClicked(book);
      });
  
  
      return [deleteButton, checkBox];
    }
  
    onDeleteBookClicked(book) {
      this.filterBookArray(book);
      this.saveBooksToLocalStorage();
      this.renderBookTable();
    }
  
    onCheckboxClicked(book) {
      const index = this.books.findIndex((currentBook) => book.title === currentBook.title);
      if (this.books[index].checkBox.checked == true){
        this.books[index].checkBox.checked = false;
      } else {
        this.books[index].checkBox.checked = true;
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