const fetchButton = document.querySelector(".fetch-button");
const dataLoading = document.querySelector(".data-loading");
const welcomeText = document.querySelector(".welcome-text");
const moviesContainer = document.querySelector(".movies-container");

const getMovies = async() => {
    let allMovies = [];
    try {
        for (let i = 0; i < 2; i++) {
            const maxPage = 200;
            const page = Math.floor(Math.random() * maxPage);
            const url = `https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-random-movies&page=${page}`;
            const key = "e1dcb5d7cbmshc445456365e82a0p100c66jsn2509a5c9aec0";
            const host = "movies-tvshows-data-imdb.p.rapidapi.com";
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "x-rapidapi-key": key,
                    "x-rapidapi-host": host,
                },
            });
            const data = await response.json();
            const movieArray = data.movie_results;
            allMovies = allMovies.concat(movieArray);
        }
        moviesToPost(allMovies);
    } catch (e) {
        console.error(e.message);
    }
};

function extractCountry(countries) {
    if (countries === null) return "unkown";
    if (countries[0].toUpperCase() === "UNITED STATES OF AMERICA") return "USA";
    if (countries[0].toUpperCase() === "UNITED KINGDOM") return "UK";
    return countries[0];
}

function indexNormalisation(index) {
    if (index < 10) return `0${index}`;
    return `${index}`;
}

// <div class="movie-card">
//     <div class="card-top">
//         <div>Title</div>
//         <h1>Once Upon a Time in the West</h1>
//     </div>
//     <div class="card-middle">
//         <div class="movie-icon">
//             <img src="./assets/images/movie-icon-images-28.jpg" alt="genre avatar">
//         </div>
//         <div class="movie-country-and-year">
//             <div>Country</div>
//             <h3>Italy</h3>
//             <div>Year</div>
//             <h3>1968</h3>
//         </div>
//     </div>
//     <div class="card-bottom">
//         <div class="btn-primary add-to-fav round-pill">
//             <a href="#!">Add to Favorites</a>
//         </div>
//     </div>
// </div>

function createCard(twoSpaceIndex, title, year, country) {
    const div1 = document.createElement("div");
    div1.setAttribute("id", `card${twoSpaceIndex}`);
    div1.setAttribute("class", "movie-card");

    const div2 = document.createElement("div");
    div2.setAttribute("class", "card-top");

    const div3 = document.createElement("div");
    div3.innerHTML = `${twoSpaceIndex} Title`;

    const h1 = document.createElement("h1");
    h1.innerHTML = title;

    const div4 = document.createElement("div");
    div4.setAttribute("class", "card-middle");

    const div5 = document.createElement("div");
    div5.setAttribute("class", "movie-icon");

    const img = document.createElement("img");
    img.setAttribute("src", "./assets/images/movie-icon-images-28.jpg");
    img.setAttribute("alt", "genre avatar");

    const div6 = document.createElement("div");
    div6.setAttribute("class", "movie-country-and-year");

    const div7 = document.createElement("div");
    div7.innerHTML = "Country";

    const h3_1 = document.createElement("h3");
    h3_1.innerHTML = country;

    const div8 = document.createElement("div");
    div8.innerHTML = "Year";

    const h3_2 = document.createElement("h3");
    h3_2.innerHTML = year === "0" ? "-" : year;

    const div9 = document.createElement("div");
    div9.setAttribute("class", "card-bottom");

    div10 = document.createElement("div");
    div10.setAttribute("class", "btn-primary add-to-fav round-pill");

    a = document.createElement("a");
    a.setAttribute("href", "#!");
    a.innerHTML = "Add to Favorites";
    a.addEventListener("click", () => {
        const oldChild = moviesContainer.removeChild(div1);
    });

    div10.appendChild(a);
    div9.appendChild(div10);
    div6.appendChild(div7);
    div6.appendChild(h3_1);
    div6.appendChild(div8);
    div6.appendChild(h3_2);
    div5.appendChild(img);
    div4.appendChild(div5);
    div4.appendChild(div6);
    div2.appendChild(div3);
    div2.appendChild(h1);
    div1.appendChild(div2);
    div1.appendChild(div4);
    div1.appendChild(div9);
    moviesContainer.appendChild(div1);
}

const moviesToPost = (data) => {
    dataLoading.style.display = "none";
    const displayItems = 30;

    for (const [index, { title, year, countries }] of data.entries()) {
        const country = extractCountry(countries);
        const twoSpaceIndex = indexNormalisation(index + 1);
        createCard(twoSpaceIndex, title, year, country);
        if (index === displayItems - 1) break;
    }
};

fetchButton.addEventListener("click", () => {
    welcomeText.innerHTML = "Welcome to my movies API website.";
    fetchButton.style.display = "none";
    dataLoading.style.display = "block";
    // setTimeout(() => {
    //     dataLoading.style.display = "none";
    // }, 1000);
    getMovies();
});