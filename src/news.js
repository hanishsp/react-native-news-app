
const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=3cd9157fd14244a0934b9dd3399767a3";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}
