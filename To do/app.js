document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todoList');
  
    function addTodo() {
      const value = searchBox.value;
      if (value.trim() !== '') {
        const newTodo = document.createElement('div');
        newTodo.classList.add('todo');
      
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            newTodo.classList.add('done');
            label.classList.add('done'); 
          } else {
            newTodo.classList.remove('done');
            label.classList.remove('done'); 
          }
        });
      
        const label = document.createElement('p');
        label.textContent = value;
        label.classList.add('label');
      
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.classList.add('delete-btn');
        closeButton.addEventListener('click', () => {
          newTodo.remove();
        });
      
        newTodo.appendChild(checkbox);
        newTodo.appendChild(label);
        newTodo.appendChild(closeButton);
      
        todoList.appendChild(newTodo);
        searchBox.value = '';
      }
    }
      
    const searchBox = document.getElementById('searchBox');
    const addButton = document.querySelector('button[type=submit]');
    addButton.addEventListener('click', addTodo);
    
    searchBox.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  });
  