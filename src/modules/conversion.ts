
// Format date and time using timezone
const formatDateTime = (timestamp:number, timezoneOffset:number): string => {
  const localDate = new Date((timestamp + timezoneOffset) * 1000);

    const options: { [key: string]: string } = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return localDate.toLocaleString("en-US", options);
};

// convert country code to name using Intl Object
const convertCountryCode = (country:string) : string | undefined=> {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}

export { formatDateTime, convertCountryCode };