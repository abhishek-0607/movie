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
function debounce(func, delay) {
  console.log("called");
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(function () {
    func();
  }, delay);
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

    div.addEventListener("click", function () {
      moviesSearch.innerHTML = null;
      showDetails(movie.id);
      localStorage.setItem("movie", JSON.stringify(movie));
      document.getElementById("movie").value = "";
    });
  });
}

let movie = JSON.parse(localStorage.getItem("movie"));
console.log(movie);
showDetails(movie.id);
async function showDetails(name) {
  let res = await fetch(
    `https://api.themoviedb.org/3/movie/${name}?api_key=fb8ba24f8e6b1c3f659d327c51575968&language=en-US`
  );
  let data = await res.json();
  console.log(data);
  //   let movie = [];
  //   movie.push(data);
  //   localStorage.setItem("movie", JSON.stringify(movie));
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
  year.innerText = "Release Date- " + d.release_date;
  let vote = document.createElement("p");
  vote.className = "title";
  vote.innerText = "Rating- " + d.vote_average.toFixed(1) + "/10";

  let details = document.createElement("div");
  details.classname = "info";

  let overv = document.createElement("p");
  overv.className = "title";
  overv.innerText = "Overview";
  let desc = document.createElement("p");
  desc.innerText = d.overview;

  details.append(name, year, overv, desc, vote);

  item.append(img, details);
  cont.append(item);
}
