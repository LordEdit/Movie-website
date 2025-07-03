let allMovies = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("movies.json")
    .then((res) => res.json())
    .then((data) => {
      allMovies = data;
      showMovies(allMovies);
      AOS.init();
    });

  document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    showMovies(filtered);
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
    document.getElementById("trailerFrame").src = "";
  });
});

function showMovies(movies) {
  const list = document.getElementById("movieList");
  list.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.setAttribute("data-aos", "fade-up");

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" />
      <div class="info">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      document.getElementById("modal").style.display = "flex";
      document.getElementById("trailerFrame").src = movie.trailer;
    });

    list.appendChild(card);
  });
}
