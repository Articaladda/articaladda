const API_KEY = 'c14e8b52103341c9a59f07d709efff13'; // Replace with your News API key
const BASE_URL = 'https://newsapi.org/v2/';
const newsContainer = document.getElementById('news-container');
const searchBar = document.getElementById('search-bar');
const categorySelect = document.getElementById('category-select');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const header = document.getElementById('header');

// Fetch news by category or query
async function fetchNews(category = 'general', query = '') {
  const url = query
    ? `${BASE_URL}everything?q=${query}&apiKey=${API_KEY}`
    : `${BASE_URL}top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "ok") {
      displayNews(data.articles);
    } else {
      console.error('API Error:', data.message);
      newsContainer.innerHTML = `<p class="text-center">Error: ${data.message}</p>`;
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    newsContainer.innerHTML = `<p class="text-center">Failed to fetch news. Please try again later.</p>`;
  }
}

// Display news articles
function displayNews(articles) {
  newsContainer.innerHTML = '';
  if (articles.length > 0) {
    articles.forEach(article => {
      const newsCard = `
        <div class="col-md-4 mb-4">
          <div class="news-card">
            <img class="news-image" src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
            <div class="news-content">
              <h2 class="news-title">${article.title}</h2>
              <p class="news-description">${article.description || 'No description available.'}</p>
              <a href="${article.url}" target="_blank" class="news-link">Read More</a>
            </div>
          </div>
        </div>
      `;
      newsContainer.innerHTML += newsCard;
    });
  } else {
    newsContainer.innerHTML = '<p class="text-center">No news articles found.</p>';
  }
}

// Event Listeners
searchBar.addEventListener('input', () => fetchNews('general', searchBar.value));
categorySelect.addEventListener('change', () => fetchNews(categorySelect.value));
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  header.classList.toggle('dark-mode');
});

// Initial Fetch
fetchNews();