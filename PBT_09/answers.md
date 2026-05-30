# Phần A

## Câu A1

1. Vẽ DOM Tree
                    [ Document ]
                           |
                     <div #app>
                     /        \
                    /          \
            <header>            <main>
            /      \           /      \
        <h1>      <nav>    <form #todoForm>  <ul #todoList>
         |        / | \       /       \          /        \
      "Todo App" <a><a><a> <input>  <button>  <li>        <li>
                  |   |   |     |       |       |           |
               "All""Active""Completed" "Add" "Learn HTML" "Learn CSS"

2. Viết querySelector cho các yêu cầu

a. Chọn thẻ <h1>
```js
document.querySelector('h1');
```
b. Chọn input trong form
```js
document.querySelector('#todoForm input');
```
c. Chọn tất cả .todo-item
```js
document.querySelectorAll('.todo-item');
```
d. Chọn link đang active
```js
document.querySelector('nav a.active');
```
e. Chọn <li> đầu tiên trong #todoList
```js
document.querySelector('#todoList li'); 
```
f. Chọn tất cả <a> bên trong <nav>
```js
document.querySelectorAll('nav a');
```