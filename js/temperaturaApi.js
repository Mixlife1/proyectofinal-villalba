const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4165690200mshc4acc77c2be862ap1f9597jsn19b70a99bb39',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

const container = document.getElementById('temperatura');


fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Paris', options)
    .then(response => response.json())
    .then(response => {
        const p = document.createElement('p');
        p.textContent = `Paris: ${response.current.temp_c} °C`;
        container.appendChild(p);
    })
    .catch(err => console.error(err));

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=London', options)
    .then(response => response.json())
    .then(response => {
        const p = document.createElement('p');
        p.textContent = `London: ${response.current.temp_c} °C`;
        container.appendChild(p);
    })
    .catch(err => console.error(err));

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Amsterdam', options)
    .then(response => response.json())
    .then(response => {
        const p = document.createElement('p');
        p.textContent = `Amsterdam: ${response.current.temp_c} °C`;
        container.appendChild(p);
    })
    .catch(err => console.error(err));

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Rome', options)
    .then(response => response.json())
    .then(response => {
        const p = document.createElement('p');
        p.textContent = `Rome: ${response.current.temp_c} °C`;
        container.appendChild(p);
    })
    .catch(err => console.error(err));

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Berlin', options)
    .then(response => response.json())
    .then(response => {
        const p = document.createElement('p');
        p.textContent = `Berlin: ${response.current.temp_c} °C`;
        container.appendChild(p);
    })
    .catch(err => console.error(err));

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Barcelona', options)
    .then(response => response.json())
    .then(response => {
        const p = document.createElement('p');
        p.textContent = `Barcelona: ${response.current.temp_c} °C`;
        container.appendChild(p);
    })
    .catch(err => console.error(err));
