let countriesData = [];
let startIndex = 0;

function getCountries(continent) {
    if (continent.toLowerCase() === 'all') {
        getAllCountries();
    } else {
        const apiUrl = `https://restcountries.com/v3.1/region/${continent}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.sort((a, b) => a.name.common.localeCompare(b.name.common));

                countriesData = data;
                startIndex = 0;
                renderCountries();
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }
}

function getAllCountries() {
    const apiUrl = 'https://restcountries.com/v3.1/all';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));

            countriesData = data;
            startIndex = 0;
            renderCountries();
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}

function renderCountries() {
    const container = document.getElementById('country-list');
    container.innerHTML = '';

    const endIndex = startIndex + 5;
    const countriesToShow = countriesData.slice(startIndex, endIndex);

    countriesToShow.forEach(country => {
        const item = document.createElement('div');
        item.classList.add('country-item');
        item.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.common}" /><p>${country.name.common}</p>`; // Incluye la imagen y el nombre del país
        container.appendChild(item);
    });
}


function nextCountries() {
    if (startIndex + 5 < countriesData.length) {
        startIndex += 5;
        renderCountries();
    }
}

function prevCountries() {
    if (startIndex - 5 >= 0) {
        startIndex -= 5;
        renderCountries();
    }
}

getCountries('all');

