import { cityType, getDataServerless } from "../api/weatherAPI";
import { search_input } from "../main";
import { showError } from "./displayData";
import { result} from './selectors';

const fetchCountry = async(cityTitle:string):Promise<cityType> => {
  try {
    const data:cityType = await getDataServerless('get_city',cityTitle) as cityType;
    return data;
  } catch (error) {
    showError(`Please enter correct city or country name.`);
    throw new Error(`${error}`);
  }
}

export const search = async (): Promise<void> => {
  const ul = document.createElement('ul');
  const dataList: cityType = await fetchCountry(search_input);

  dataList
    .filter((city) => city?.name?.toLowerCase().includes(search_input.toLowerCase().trim()))
    .forEach((city) => {
      console.log(city);
      if (city) {
        const div:HTMLDivElement = document.createElement('div');
        const li:HTMLElement = document.createElement("li");
        const cityName:HTMLElement = document.createElement("h3");
        const stateCountryInfo:HTMLElement = document.createElement("p");
        cityName.textContent = city.name;
        stateCountryInfo.textContent = city.state!==undefined?`${city?.state}, ${city.country}`:`${city.country}`;
        
        li.appendChild(cityName);
        li.appendChild(stateCountryInfo);
        div.innerHTML = `<i class="fa-solid fa-location-dot fa-xl"></i>`;
        div.appendChild(li);
        ul.appendChild(div);
      }
    });
  result!.innerHTML = '';
    result!.appendChild(ul);
  result!.classList.add('location_list');
}