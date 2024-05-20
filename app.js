const API_KEY = `ece985488c982715535011849742081f`;
const imagePath = `http://image.tmbd.org/t/p/w1280`;

const input = document.querySelector(".search input");
const btn = document.querySelector(".search button");

const mainGridTitle = document.querySelector(".favorites h1");
const mainGrid = document.querySelector(".favorites .movies-grid");
const trendingGrid = document.querySelector("trending.movies-grid");
const popupContainer = document.querySelector(".popup-container");

async function getMovieBySearch(search_term) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search_term}`
  );

  let respData = await resp.json();
  console.log(respData);
  return respData.results;
}

async function addSearchMoviestoDOM() {
  alert("done");

  const search_term = input.value;
  const data = await getMovieBySearch(search_term);
  mainGridTitle.innerHTMLText = "Search Result.....";
  let resultArr = data.map((m) => {
    return `
    <div class="card" data-id="${m.id}">
            <div class="img">
              <img src="${imagePath + m.Poster_path}" alt />
            </div>
            <div class="info">
              <h2>${m.title}</h2>
              <div class="single-info">
                <span>Rating</span>
                <span>10/10</span>
              </div>
              <div class="single-info">
                <span>${m.vote_average}</span>
                <span>${m.released_date}</span>
              </div>
            </div>
          </div>
    `;
  });
  mainGrid.innerHTML = resultArr.join(" ");
  const cards = document.querySelectorAll(".card");
  addClickEffectToCards(cards);
}
btn.addEventListener("click", addSearchMoviestoDOM);

function addClickEffectToCards(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      showPopup(card);
    });
  });
}
async function getMovieId(movieId) {
  const response = await fetch(
    `https://api.themoviedb./org/3/movie/${MovieId}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
}

async function getMovieTrailerById(movieId) {
  const response = await fetch(
    `https://api.themoviedb./org/3/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.result[0].key;
}
async function showPopup(card) {
  popupContainer.classList.add("show-popup");
  const movieId = card.getAttribute("data-id");
  const movie = await getMovieId(movieId);
  const key = await getMovieTrailerById(movieId);
  popupContainer.style.background = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1)),
  url(${imagePath + movie.Poster_path})`;

  popupContainer.innerHTML = `<span class="x-icon">&#10006;</span>
  <div class="content">
    <!--left content start here -->
    <div class="left">
      <div class="poster-img">
        <img src="${imagePath + movie.Poster_path}" alt="" />
      </div>
      <div class="single-info">
        <span>Add to favorite:</span>
        <span class="heart-icon">&#9829;</span>
      </div>
    </div>
    
    <div class="right">
      <h1>${movie.title}</h1>
      <h3>${movie.tagline}</h3>
      <!--single info container star here-->
      <div class="single-info-container">
        <div class="single-info">
          <span>Language </span>
          <span>${movie.spoken_languages[0].name} </span>
        </div>
        <div class="single-info">
          <span>Length</span>
          <span>${movie.runtime}</span>
        </div>
        <div class="single-info">
          <span>Rating</span>
          <span>${movie.vote_average}/10</span>
        </div>
        <div class="single-info">
          <span>Budget</span>
          <span>${movie.budget}</span>
        </div>
        <div class="single-info">
          <span>Released date</span>
          <span>${movie.released_date}</span>
        </div>
      </div>
      
      <div class="genres">
        <h2>Genres</h2>
        <ul>
          ${movie.genres
            .map((e) => {
              return `<li>${e.name}</li>`;
            })
            .join(" ")}
        </ul>
      </div>
      
      <div class="overview">
        <h2>overview</h2>
        <p>
        ${movie.overview}
        </p>
      </div>
      

      
      <div class="trailer">
        <h2>Trailer</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      
    </div>
    
  </div>`;
  const x_icon = document.querySelector(".x_icon");

  x_icon.addEventListener("click", () => {
    popupContainer.classList.remove(show - Popup);
  });
  const heart_icon = document.querySelector(".heart-icon");
  heart_icon.addEventListener("click", () => {
    if (heart_icon.classList.contains("change-color")) {
      heart_icon.classList.remove("change-color");
    } else {
      heart_icon.classList.add("change-color");
    }
  });
}

async function getTrendingMovies() {
  const resp = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );

  let respData = await resp.json();

  return respData;
}

async function addTrendingMoviestoDom() {
  const data = await getTrendingMovies();
  const displayMovies = data.slice(0, 5);
  let displaymovies = data.map((m) => {
    return `
  <div class="card" data-id="${m.id}">
          <div class="img">
            <img src="${imagePath + m.Poster_path}" alt />
          </div>
          <div class="info">
            <h2>${m.title}</h2>
            <div class="single-info">
              <span>Rating</span>
              <span>10/10</span>
            </div>
            <div class="single-info">
              <span>${m.vote_average}</span>
              <span>${m.released_date}</span>
            </div>
          </div>
        </div>
  `;
  });
  trendingGrid.innerHTML = resultArr.join(" ");
  const cards = document.querySelectorAll(".card");
  addClickEffectToCards(cards);
}
