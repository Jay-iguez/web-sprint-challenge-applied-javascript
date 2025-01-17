import axios from "axios"

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const divCardContainer = document.createElement("div")
  const divCardHeadline = document.createElement("div")
  const divCardAuthorParent = document.createElement("div")
  const divCardImageParent = document.createElement("div")
  const imgCard = document.createElement("img")
  const spanCardAuthor = document.createElement("span")
  //
  divCardContainer.classList.add("card")
  divCardHeadline.classList.add("headline")
  divCardAuthorParent.classList.add("author")
  divCardImageParent.classList.add("img-container")
  //
  divCardHeadline.textContent = article.headline
  imgCard.src = article.authorPhoto
  spanCardAuthor.textContent = `By  ${article.authorName}`
  //
  divCardContainer.append(divCardHeadline, divCardAuthorParent)
  divCardAuthorParent.append(divCardImageParent, spanCardAuthor)
  divCardImageParent.append(imgCard)
  //
  divCardContainer.addEventListener("click", event => {
    console.log(article.headline)
  })
  //
  return divCardContainer
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get(`http://localhost:5001/api/articles`)
  .then((result) => {
    console.log(result.data.articles)

    const dataObject = result.data.articles
    const cardDomSelector = document.querySelector(selector)

    for (const key of Object.keys(dataObject)) {
      const innerValue = [...dataObject[key]]
      for (const innerKey of innerValue){
        const newCard = Card(innerKey)
        cardDomSelector.append(newCard)
      }
    }

  })
  .catch((error) => {
    console.error(error)
  })
}

export { Card, cardAppender }
