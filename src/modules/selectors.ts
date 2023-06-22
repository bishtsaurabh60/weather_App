type EleOrNull = HTMLElement | null;
type DomType = Document | HTMLElement | null;

const query = (ele: string, obj: DomType = document): HTMLElement | null => {
    if (!obj) return null;
    return obj.querySelector(ele);
}

export const header: EleOrNull = query("header");

export const weather_data: EleOrNull = query(".weather_data");
export const place: EleOrNull = query(".location_details .place",weather_data);
export const time: EleOrNull = query(".time", weather_data);
export const weatherConditionIcon: HTMLImageElement | null = query(".icon img", weather_data) as HTMLImageElement;
export const temperature: EleOrNull = query(".temp", weather_data);
export const minMaxTemp: EleOrNull = query(".min_max_temp", weather_data);
export const weather_description: EleOrNull = query(".description", weather_data);

export const formEle: EleOrNull = query("form");
export const location_input: HTMLInputElement | null = document.getElementById("location-input") as HTMLInputElement;

export const geoLocationBtn: EleOrNull = query(".geolocation_button");

export const displayError: EleOrNull = query(".display_error");