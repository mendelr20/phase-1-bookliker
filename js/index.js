const url = 'http://localhost:3000/books'
document.addEventListener("DOMContentLoaded", function() {
fetchRequest()
let btn


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
    <img src =${book.img_url}>
    <h2>${book.title}</h2>
    <p>${book.subtitle}</p>
    <p>${book.author}</p>
    <p>${book.description}</p>
    `
    let userTag = book.users.forEach(user => {
        let p = document.createElement('p')
        p.innerHTML = `${user.username}`
        info.append(p)
    })
    btn = document.createElement('button')
    btn.innerHTML = "LIKE"
    info.append(btn) 
    btn.addEventListener('click', () => likeCallback(book, btn))
}



function likeCallback(book, btn){
    if(btn.innerHTML === 'LIKE'){
        btn.innerHTML = "UNLIKE"
    fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH",
                headers: {"Accept": "application/json",
                    "Content-type": "application/json"},
                body: JSON.stringify({
                    id: book.id,
                    title: book.title,
                    subtitle: book.subtitle,
                    description: book.description,
                    img_url: book.img_url,
                    users: [...book.users, {
                        id: 20,
                        username: 'Mendel'
                    }]
                })
    })
    .then(res => res.json())
    .then(likeCallback(book, btn))
    } else {
        btn.innerHTML = "LIKE"
        fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH",
                headers: {"Accept": "application/json",
                    "Content-type": "application/json"},
                body: JSON.stringify({
                    id: book.id,
                    title: book.title,
                    subtitle: book.subtitle,
                    description: book.description,
                    img_url: book.img_url,
                    users: [...book.users]
                })
    })
    .then(res => res.json())
    .then(likeCallback(book, btn))
    }


}
});
