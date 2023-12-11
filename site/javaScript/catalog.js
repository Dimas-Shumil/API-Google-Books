const categories = [
    {
        title: "Architecture",
        url: "subject:Architecture",
    },

    {
        title: "Art & Fashion",
        url: "subject:Art",
    },

    {
        title: "Biography",
        url: "subject: Biography & Autobiography",
    },

    {
        title: "Business",
        url: "subject:Business",
    },

    {
        title: "Crafts & Hobbies",
        url: "subject:Crafts & Hobbies",
    },

    {
        title: "Drama",
        url: "subject:Drama",
    },

    {
        title: "Fiction",
        url: "subject:Fiction",
    },

    {
        title: "Food & Drink",
        url: "subject:Cooking",
    },

    {
        title: "Health & Wellbeing",
        url: "subject:Health & Fitness",
    },

    {
        title: "History & Politics",
        url: "subject:History",
    },

    {
        title: "Humor",
        url: "subject:Humor",
    },

    {
        title: "Poetry",
        url: "subject:Poetry",
    },

    {
        title: "Psychology",
        url: "subject:Psychology",
    },
]

let activeSubject = null
let activeStartIndex = null
let activeMaxResults = null
let bookInCart = localStorage.getItem('countBookinAPIGoogleBooks');
if(typeof(bookInCart)=='string'){
    bookInCart = JSON.parse(bookInCart) 
    if (!Array.isArray(bookInCart)) {
        bookInCart = []
    }
}  else {
    bookInCart = []
}

function showCountBooksInCart() {
    const count = document.querySelector('.countBooks')
    count.innerHTML = bookInCart.length
    count.style.display = (bookInCart.length==0) ? 'none' : 'flex'  //если в корзине нет покупок, счетчик скрываем
//    console.log(bookInCart)
}

// for(let i=0; i<localStorage.length; i++) {
//     let key = localStorage.key(i);
//     console.log(`${key}: ${localStorage.getItem(key)}`);
// }

const apiKey = "AIzaSyAiuUhLVW-vNRMRAudFm1L6HKCpGgNjvXg"

function displayCategories() {
    const categoriesList = document.querySelector(".catalog-navigation")
    categories.forEach(function (category, index) {
        categoriesList.innerHTML += `<li><a href="#" onclick="window.fetchCategoryBooks(${index})">${category.title}</a></li>`
    })
    showCountBooksInCart()    
}

function renderBook(book) {
//console.log(book)

    let description = ""
    if ("description" in book.volumeInfo) {
        description = book.volumeInfo.description
        description = description.substring(0, 80) + "..."
    }

    let rating = ''
    if ("ratingsCount" in book.volumeInfo) {
        rating = book.volumeInfo.ratingsCount + " review"
    }

    let price = ''
    if ("listPrice" in book.saleInfo) {
        price = book.saleInfo.listPrice.amount + ' ₽'
    }

    let bookImage = "images/book1.png"
    if ("imageLinks" in book.volumeInfo) {
        bookImage = book.volumeInfo.imageLinks.thumbnail
    }

    let authors = ""
    if ("authors"in book.volumeInfo) {
        book.volumeInfo.authors.forEach(function (author, index) {
            authors = authors + author
            if (index < book.volumeInfo.authors.length - 1) {
                authors = authors + ", "
            }
        })
    }

    let stars = ""
    if ("averageRating" in book.volumeInfo) {
        for (let i = 0; i < 5; i++) {
            if (i > book.volumeInfo.averageRating) {
                stars = stars + '<img src="img/star_empty.png">'
            } else {
                stars = stars + '<img src="img/star.png">'
            }
        }
    }

    let buttonClass = ''
    let buttonText = ''


    if(!bookInCart.includes(book.id)){
        buttonClass = 'book-btn'
        buttonText = 'buy now'
    } else {
        buttonClass = 'book-btn in-cart' //<--- добавить стиль цвет в css и html
        buttonText =  'in the cart'

    }

    let bookHtml =  // <--- добавить стиль для book-rating
        `<div class="box">
                            <div class="box-one">
                                <img src="${bookImage}">
                            </div>
                            <div class="box-two">
                                <h5 class="book-author">
                                    ${authors}
                                </h5>
                                <h2 class="book-title">
                                   ${book.volumeInfo.title}
                                </h2>
                                <div class="book-rating">   
                                    <div class="rating-stars">
                                        ${stars}
                                    </div>
                                    <span class="book-reviews">${rating}</span>
                                </div>
                                <p class="book-description">
                                    ${description}
                                </p>
                                <h3 class="book-price">
                                    ${price}
                                </h3>
                                <a class="${buttonClass}" onclick="window.addToCart(this,'${book.id}')">${buttonText}</a>
                            </div>
                        </div>`
    return bookHtml
}

function fetchBooks(subject, startIndex, maxResults) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${subject}&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`
//    console.log(url)

    activeSubject = subject
    activeStartIndex = startIndex
    activeMaxResults = maxResults

    fetch(url).then(function (response) {
        return response.json()
    }).then(function (data) {
        const catalogContent = document.querySelector('.conteiner__book')
//        console.log(data.items)
        data.items.forEach(function (book, index){
            catalogContent.innerHTML = catalogContent.innerHTML + renderBook(book)
        })
    })

}

 function fetchCategoryBooks(index){
    const categoryList = document.querySelectorAll('.catalog-navigation li')
    categoryList.forEach(function (categoryLi){
        categoryLi.classList.remove("item-active")
    })
    const categoryLi = categoryList[index]
    categoryLi.classList.add("item-active")

    const category = categories[index]
    //console.log(category)

    const catalogContent = document.querySelector('.conteiner__book')
    catalogContent.innerHTML = ''

    fetchBooks(category.url, 0, 6)
}

function loadMore (){
    fetchBooks(activeSubject, activeStartIndex +6, activeMaxResults)
}
function addToCart(button, bookId){
    if (!bookInCart.includes(bookId)) {
        bookInCart.push(bookId);
        button.innerHTML = 'in the cart'
        button.classList.add('in-cart')
    } else {
        bookInCart.splice(bookInCart.indexOf(bookId),1);
        button.innerHTML = 'buy now'
        button.classList.remove('in-cart')
    }
    localStorage.setItem('countBookinAPIGoogleBooks', JSON.stringify(bookInCart))
    showCountBooksInCart()
}

function main(){
    displayCategories()
    fetchCategoryBooks(0)
}

document.addEventListener('DOMContentLoaded', main())
document.querySelector('.book-btn').addEventListener('click', loadMore)