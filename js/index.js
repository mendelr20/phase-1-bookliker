const url = 'http://localhost:3000/books'
document.addEventListener("DOMContentLoaded", function() {
fetchRequest()
});

function fetchRequest(){
    fetch(url)
    .then(res => res.json())
    .then(bookArray => appendDom(bookArray))
}

function appendDom(bookArray){
    bookInfo = bookArray
    bookArray.forEach(book => {
        const list = document.getElementById('list')
        const li = document.createElement('li')
        li.innerHTML = book.title, book.id
        li.addEventListener('click',() => clickCallBack(book))
        list.append(li)
    })
}


function clickCallBack(book){
    const info = document.getElementById('show-panel')
    info.innerHTML = ''
    info.innerHTML = `
    <img src = ${book.img_url}>
    <h2>${book.title}</h2>
    <p>${book.subtitle}</p>
    <p>${book.author}</p>
    <p>${book.description}</p>
    <p>${book.users[0, 1].username}</p>

    `

   
}