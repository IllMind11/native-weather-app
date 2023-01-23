export default async function fetchWithHeaders(
  url,
  options,
  type = "forecast"
) {
  let urlString = "";

  if (type === "forecast") {
    urlString = `http://api.weatherapi.com/v1/forecast.json?key=764af9b31aaf49d2865155027231901&${url}&days=6&aqi=yes&alerts=no`;
  }

  if (type === "search") {
    urlString = `http://api.weatherapi.com/v1/search.json?key=764af9b31aaf49d2865155027231901&q=${url}`;
  }

  const response = await fetch(urlString, options);

  if (response.status === 200) {
    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  }

  throw new Error(`Error ${response.status}: ${response.statusText}`);
}
