const API_KEY = "54a4f22279564c539fc4b9e96642a710";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("all"));
async function fetchNews(query) {
  const result = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await result.json();
  //   console.log(data.articles);
  addData(data.articles);
}

function addData(articles) {
  const newsContainer = document.getElementById("news-container");
  const newsTemplate = document.getElementById("news-card");

  newsContainer.innerHTML = "";

  articles.forEach((element) => {
    if (!element.urlToImage) return;
    const cardClone = newsTemplate.content.cloneNode(true);
    fillDataInCards(cardClone, element);

    newsContainer.appendChild(cardClone);
  });
}
function fillDataInCards(cardClone, element) {
  const newsImg = cardClone.querySelector("#title-img");
  const title = cardClone.querySelector("#news-title");
  const disc = cardClone.querySelector("#news-disc");
  const publishedDate = cardClone.querySelector("#news-date");

  newsImg.src = element.urlToImage;
  title.innerHTML = element.title;
  disc.innerHTML = element.description;
  const date = new Date(element.publishedAt).toLocaleString("en-Us", {
    timeZone: "Asia/Jakarta",
  });
  publishedDate.innerHTML = `${element.source.name} ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(element.url, "_blank");
  });
}
let selectElem = null;
function selectCategory(cate) {
  fetchNews(cate);
  document.getElementById("search-text").value = "";
  const currElem = document.getElementById(cate);
  selectElem?.classList.remove("active");
  selectElem = currElem;
  selectElem.classList.add("active");
}

function search() {
  const inputText = document.getElementById("search-text");
  if (!inputText.value) return;
  fetchNews(inputText.value);
  selectElem.classList.remove("active");
}
