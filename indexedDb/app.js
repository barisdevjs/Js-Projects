let db;
const openOrCreateDB = window.indexedDB.open('todo_db', 1); // It is database file name in SQL

openOrCreateDB.addEventListener('error', () => console.error('Error opening DB'));

openOrCreateDB.addEventListener('success', () => {
 console.log('Successfully opened DB');
 db = openOrCreateDB.result;
 showTodos();
});

openOrCreateDB.addEventListener('upgradeneeded', init => {
  db = init.target.result;

  db.onerror = () => {
    console.error('Error loading database.');
  };

  const table = db.createObjectStore('todo_tb', { keyPath: 'id', autoIncrement:true }); // Table name

  table.createIndex('title', 'title', { unique: false });  // properties in rows
  table.createIndex('desc', 'desc', { unique: false });
});


/************************* FORM ACTIONS **************************/

const todos = document.querySelector('ol');
const form = document.querySelector('form');
const todoTitle = document.querySelector('#title');
const todoDesc = document.querySelector('#desc');
const submit = document.querySelector('button');

form.addEventListener('submit', addTodo);

function addTodo(e) {
  e.preventDefault();
  const newTodo = { title: todoTitle.value, body: todoDesc.value };
  const transaction = db.transaction(['todo_tb'], 'readwrite');
  const objectStore = transaction.objectStore('todo_tb');
  const query = objectStore.add(newTodo);
  query.addEventListener('success', () => {
    todoTitle.value = '';
    todoDesc.value = '';
  });
  transaction.addEventListener('complete', () => {
    showTodos();
  });
  transaction.addEventListener('error', () => console.log('Transaction error'));
}


function showTodos() {
 while (todos.firstChild) {
   todos.removeChild(todos.firstChild);
 }
 const objectStore = db.transaction('todo_tb').objectStore('todo_tb');
 objectStore.openCursor().addEventListener('success', e => {

   const pointer = e.target.result;
   if(pointer) {
     const listItem = document.createElement('li');
     const h3 = document.createElement('h3');
     const pg = document.createElement('p');
     listItem.appendChild(h3);
     listItem.appendChild(pg);
     todos.appendChild(listItem);
     h3.textContent = pointer.value.title;
     pg.textContent = pointer.value.body;
     listItem.setAttribute('data-id', pointer.value.id);
     const deleteBtn = document.createElement('button');
     listItem.appendChild(deleteBtn);
     deleteBtn.textContent = 'Remove';
     deleteBtn.addEventListener('click', deleteItem);
     pointer.continue();
   } else {
     if(!todos.firstChild) {
       const listItem = document.createElement('li');
       listItem.textContent = 'No Todo.'
       todos.appendChild(listItem);
     }

     console.log('Todos all shown');
   }
 });
}


function deleteItem(e) {
 const todoId = Number(e.target.parentNode.getAttribute('data-id'));
 const transaction = db.transaction(['todo_tb'], 'readwrite');
 const objectStore = transaction.objectStore('todo_tb');
 objectStore.delete(todoId);
 transaction.addEventListener('complete', () => {
   e.target.parentNode.parentNode.removeChild(e.target.parentNode);
   alert(`Todo with id of ${todoId} deleted`)
   console.log(`Todo:${todoId} deleted.`);
   if(!todos.firstChild) {
     const listItem = document.createElement('li');
     listItem.textContent = 'No Todo.';
     todos.appendChild(listItem);
   }
 });
 transaction.addEventListener('error', () => console.log('Transaction error'));
}