import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from "notiflix/build/notiflix-notify-aio";
import API from './js/api-service';
import getRefs from './js/get-refs';
const DEBOUNCE_DELAY = 300;
// import articlesTPL from "./templates/articles.hbs";


const refs = getRefs();

refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e) {
   const searchCountry = (e.target.value).trim();
   console.log(searchCountry);
   
   // const searchCountry = e.target.value;
   if (!searchCountry) {
      onFetchError(searchCountry);
      return refs.countryList.innerHTML = '';
   }

   API.fetchCountries(searchCountry)
      .then(renderCountryCard)
      .catch(onFetchError);
};

function countryLengthOne() {

}

function renderCountryCard(country) {
   console.log('its - THEN');
   if (country) {
      if (country.length === 1) {
         if (country[0].name.official === 'Russian Federation') {
            return Notify.failure('Sorry, This country does not exist on the world map', {
         ID: 'MKA',
         timeout: 10000,
         width: '380px',
         position: 'center-top',
      });
      }
         
         const markUpOneCountries = country.map(({ name, flags, capital, population, languages }) => {
            const languagesThisCountry = Object.values(languages).join(', ');
         refs.countryList.innerHTML = '';
            return `<article class="item-info">
                  <div class="item">
                     <img src="${flags.svg}" alt="" width="60" height="40" />
                     <span>${name.official}</span>
                  </div>
                  <p>Capital: ${capital}</p>
                  <p>Polupation: ${population}</p>
                  <p>languages: ${languagesThisCountry}</p>
               </article>`;
      }).join('');
      return refs.countryInfo.innerHTML = markUpOneCountries;
      }
      if (country.length > 10) {
         refs.countryInfo.innerHTML = '';
         refs.countryList.innerHTML = '';
         return Notify.info('Too many matches found. Please enter a more specific name.', {
         ID: 'MKA',
         timeout: 2500,
         width: '380px',
         position: 'center-top',
      });
      }

      const markUpArrayCountries = country.map(({ name, flags }) => {
      refs.countryInfo.innerHTML = '';
      return `<li>
               <article class="item">
                  <img src="${flags.svg}" alt="" width="60" height="40">
                  <span>${name.official}</span>
               </article>
            </li>`;
      }).join('');
      return refs.countryList.innerHTML = markUpArrayCountries;
   }
   onFetchError();
}

function onFetchError(searchCountry) {
   console.log('its - CATCH');
   refs.countryList.innerHTML = '';
   refs.countryInfo.innerHTML = '';
   if (searchCountry === '') {
      return Notify.failure('Field in input is empty', {
         ID: 'MKA',
         timeout: 2500,
         width: '380px',
         position: 'center-top',
      });
   }
      return Notify.failure('Oops, there is no country with that name', {
         ID: 'MKA',
         timeout: 2500,
         width: '380px',
         position: 'center-top',
      });
}