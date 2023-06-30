import { location_input, geoLocationBtn, result } from './modules/selectors';
import { getWeatherData,byGeoLocation } from './modules/getWeatherData';
import { search } from './modules/searchCity';

export let search_input:string;

location_input?.focus();

// event handlers

// debounce 

const debounce = <T extends unknown[]>(func: (...args: T) => Promise<void>, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function (...args:T) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}

const debounceLimit = debounce(search,500);

// event handlers

location_input?.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  search_input = target.value;
  debounceLimit();
});

location_input?.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    const target = e.target as HTMLInputElement;
    const locationInfo: string = target.value;
    const hasComma = locationInfo.indexOf(",") !== -1;
    
    let cityName = hasComma?locationInfo?.split(',')[0]:locationInfo;
    let stateCountryInfo = hasComma?locationInfo?.split(',')[1].trim():'';

    getWeatherData(cityName, stateCountryInfo)
      .then(() => {
        location_input!.value = "";
        result!.innerHTML = '';
      })
      .catch((error) => {
        console.log(error);
      });
   }
  }
);

result?.addEventListener('click', (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement;
  let cityName: string | undefined | null;
  let stateCountryInfo: string | undefined | null;

  if (clickedElement.tagName === 'H3') {
    cityName = clickedElement.textContent;
    stateCountryInfo = clickedElement.nextElementSibling?.textContent;
  } else if (clickedElement.tagName === 'P') {
    cityName = clickedElement.previousElementSibling?.textContent;
    stateCountryInfo = clickedElement.textContent;
  }
   
  
  if (cityName && stateCountryInfo) {
    getWeatherData(cityName, stateCountryInfo)
      .then(() => {
        location_input!.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  }
});


geoLocationBtn?.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(byGeoLocation);
  } else {
    alert("Your browser does not support geolocation API.");
  }
});
