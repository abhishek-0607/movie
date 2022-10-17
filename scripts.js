var timerId;
let moviesDiv = document.getElementById("moviesSearch");
let container = document.getElementById("container");
let cont = document.getElementById("cont");

async function searchMovies() {
  try {
    let movieName = document.getElementById("movie").value;
    let res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=fb8ba24f8e6b1c3f659d327c51575968&query=${movieName}`
    );
    let data = await res.json();
    return data.results;
  } catch (e) {
    console.log(e);
  }
}

function appendMovies(movies) {
  if (movies === undefined) {
    return false;
  }

  moviesDiv.innerHTML = null;
  movies.forEach(function (movie) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.innerText = movie.title;
    div.append(p);
    moviesDiv.append(div);
    let movies_id = document.createElement("p");
    movies_id.innerText = movie.id;
    div.addEventListener("click", function () {
      moviesSearch.innerHTML = null;

      let movieName = movies_id.innerText;
      showDetails(movieName);
    });
  });
}

async function main() {
  let name = document.getElementById("movie").value;
  if (name.length < 3) {
    list();
    return false;
  }
  let res = await searchMovies();
  appendMovies(res);
  console.log(res);
}

function debounce(func, delay) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(function () {
    func();
  }, delay);
}
async function showDetails(name) {
  let res = await fetch(
    `https://api.themoviedb.org/3/movie/${name}?api_key=fb8ba24f8e6b1c3f659d327c51575968&language=en-US`
  );
  let data = await res.json();
  console.log(data);
  let movie = [];
  movie.push(data);
  localStorage.setItem("movie", JSON.stringify(movie));
  showData(data);
}
function showData(d) {
  cont.innerHTML = null;

  container.innerHTML = null;
  let item = document.createElement("div");
  item.className = "mov";
  let detail = document.createElement("div");
  detail.className = "detail";

  let img = document.createElement("img");
  const img_url = "https://image.tmdb.org/t/p/w500";
  img.src = img_url + d.poster_path;
  let name = document.createElement("p");
  name.className = "title";
  name.innerText = d.title;
  let year = document.createElement("p");
  year.innerText = "Release Date-" + d.release_date;
  let vote = document.createElement("p");
  vote.className = "title";
  vote.innerText = "Vote- " + d.vote_average + "/10";

  let details = document.createElement("div");
  details.classname = "info";

  let overview = document.createElement("div");
  let overv = document.createElement("p");
  overv.className = "title";
  overv.innerText = "Overview";
  let desc = document.createElement("p");
  desc.innerText = d.overview;

  details.append(name, year, overv, desc, vote);

  item.append(img, details);
  cont.append(item);
}
async function list() {
  let res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=fb8ba24f8e6b1c3f659d327c51575968&language=en-US&page=1`
  );
  let data = await res.json();
  console.log(data.results);
  showMovie(data.results);
}
list();

function showMovie(d) {
  container.innerHTML = null;
  cont.innerHTML = null;
  d.forEach(function (film) {
    let item = document.createElement("div");
    item.className = "movies";

    let img = document.createElement("img");
    const img_url = "https://image.tmdb.org/t/p/w500";
    img.src = img_url + film.poster_path;
    let name = document.createElement("p");
    name.className = "title";
    name.innerText = film.title;
    let movies_id = document.createElement("p");
    movies_id.innerText = film.id;
    item.addEventListener("click", function () {
      let id = movies_id.innerText;
      showDetails(id);
    });
    let year = document.createElement("p");
    year.innerText = "Release Date-" + film.release_date;
    let vote = document.createElement("p");
    vote.innerText = "Vote- " + film.vote_average + "/10";

    let details = document.createElement("div");
    details.classname = "info";

    let overview = document.createElement("div");
    let overv = document.createElement("h3");
    overv.innerText = "Overview";
    let desc = document.createElement("p");
    desc.innerText = film.overview;

    details.append(name, year, vote);
    item.append(img, details);
    container.append(item);
  });
}

async function searchMovie() {
  let movieName = document.getElementById("movie").value;
  let res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=fb8ba24f8e6b1c3f659d327c51575968&query=${movieName}`
  );
  let data = await res.json();
  console.log(data.results);
  showMovie(data.results);
}
