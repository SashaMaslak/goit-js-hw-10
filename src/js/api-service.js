const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
   return fetch(`${BASE_URL}/name/${name}`)
      .then(response => {
         if (!response.ok) {
            return;
         }
         return response.json();
      },
      );
      // .then(data => {
      //    return data.articles;
      // });
}

export default { fetchCountries };