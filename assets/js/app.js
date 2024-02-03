const API_KEY = "54a4f22279564c539fc4b9e96642a710";
const url = "https://newsapi.org/v2/everything?q=";
let fetchedArticles = [];
window.addEventListener("load", () => fetchNews("all"));
async function fetchNews(query) {
  const result = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await result.json();
  fetchedArticles = data.articles; // Store fetched articles globally
  addData();
}
let startPoint = 0;
let endPoint = 20;
function addData(articles = fetchedArticles) {
  const newsContainer = document.getElementById("news-container");
  const newsTemplate = document.getElementById("news-card");

  newsContainer.innerHTML = "";

  articles.slice(startPoint, endPoint).forEach((element) => {
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
  startPoint = 0;
  endPoint = 20;
}

function search() {
  const inputText = document.getElementById("search-text");
  if (!inputText.value) return;
  fetchNews(inputText.value);
  selectElem.classList.remove("active");
  startPoint = 0;
  endPoint = 20;
}
function nextPage(a, b) {
  startPoint = a;
  endPoint = b;
  addData();
  scrollTo(0, 0);
}
