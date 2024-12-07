let nav = document.querySelectorAll('.nav');
let logo = document.querySelectorAll('.logo');
let type = document.querySelector('#type'); 
let search = document.querySelector('#search'); 

let APIKey = '19187503';

const getData = async (movie) => {
    try {
        let fetchData = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&t=${movie}`);
        let jsonData = await fetchData.json();

        if (jsonData.Response === "False") {
            document.querySelector(".card").innerHTML = `<h1>Movie not found</h1>`;
            return;
        }

        console.log(jsonData);

        document.querySelector(".card").innerHTML = '';
        type.value = '';

        let div = document.createElement('div');
        div.classList.add("movieCard");
        div.innerHTML = `
            <img src="${jsonData.Poster}" alt="${jsonData.Title}">
            <div class="cardText">
                <h1>${jsonData.Title}</h1> 
                <p class="rating">Rating: <span>${jsonData.Ratings?.[0]?.Value || 'N/A'}</span></p>
                <a href="#">${jsonData.Genre}</a> 
                <p>Released: <span>${jsonData.Released}</span></p>
                <p>Duration: <span>${jsonData.Runtime}</span></p>
                <p>Description: <span>${jsonData.Plot}</span></p>
            </div>
        `;
        document.querySelector(".card").appendChild(div);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.querySelector(".card").innerHTML = `<h1>Error fetching movie details</h1>`;
    }
};

search.addEventListener("click", function () {
    let movieName = type.value;
    if (movieName !== "") {
        getData(movieName);
    } else {
        document.querySelector(".card").innerHTML = "<h1>First search for a movie</h1>";
    }
});


