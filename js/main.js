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
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": key,
                    "x-rapidapi-host": host
                }
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
    if (countries === null) return 'unkown';
    if (countries[0].toUpperCase() === 'UNITED STATES OF AMERICA') return 'USA';
    if (countries[0].toUpperCase() === 'UNITED KINGDOM') return 'UK';
    return countries[0];
}

function indexNormalisation(index) {
    if (index < 10) return `0${index}`;
    return `${index}`;
}

const moviesToPost = (data) => {
    const dataLoading = document.querySelector('.dataLoading');
    dataLoading.innerHTML = '';
    const ul = document.querySelector('.movies');
    const displayItems = 30;

    for (const [index, { title, year, countries }] of data.entries()) {
        const p = document.createElement('p');
        const country = extractCountry(countries);
        const twoSpaceIndex = indexNormalisation(index + 1);
        p.innerHTML = `${twoSpaceIndex} - ${title} - year: ${year} - country: ${country}`;
        ul.appendChild(p);
        if (index === displayItems - 1) break;
    }
};

// getMovies();