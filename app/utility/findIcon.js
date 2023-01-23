import dayjs from "dayjs";

export default function findIcon(
  condition,
  hour = new Date().getHours(),
  sunset,
  sunrise
) {
  const formattedSunrise = dayjs(`1/1/1 ${sunrise}`).format("HH:mm");
  const formattedSunset = dayjs(`1/1/1 ${sunset}`).format("HH:mm");

  if (!condition) return;

  function conditionIncludes(...strings) {
    return condition.toLowerCase().includes(...strings);
  }

  if (conditionIncludes("overcast"))
    return require("../assets/animated/overcast.json");

  if (conditionIncludes("sunny"))
    return require("../assets/animated/sunny.json");

  if (conditionIncludes("clear"))
    return require("../assets/animated/clear.json");

  if (conditionIncludes("rain with thunder"))
    return require("../assets/animated/rain-thunder.json");

  if (conditionIncludes("partly cloudy") || conditionIncludes("cloudy")) {
    if (hour <= formattedSunset && hour >= formattedSunrise)
      return require("../assets/animated/day-cloudy.json");
    else return require("../assets/animated/night-cloudy.json");
  }

  if (conditionIncludes("mist")) return require("../assets/animated/mist.json");

  if (
    conditionIncludes("patchy rain") ||
    conditionIncludes("light rain") ||
    conditionIncludes("light drizzle")
  )
    return require("../assets/animated/light-rain.json");

  if (conditionIncludes("moderate rain") || conditionIncludes("rain"))
    return require("../assets/animated/moderate-rain.json");

  if (conditionIncludes("heavy rain"))
    return require("../assets/animated/heavy-rain.json");

  if (
    conditionIncludes("freezing rain") ||
    conditionIncludes("freezing drizzle")
  )
    return require("../assets/animated/freezing-drizzle.json");

  if (conditionIncludes("sleet"))
    return require("../assets/animated/sleet.json");

  if (conditionIncludes("light snow") || conditionIncludes("patchy snow"))
    return require("../assets/animated/light-snow.json");

  if (conditionIncludes("moderate snow") || conditionIncludes("blowing snow"))
    return require("../assets/animated/moderate-snow.json");

  if (conditionIncludes("heavy snow") || conditionIncludes("blizzard"))
    return require("../assets/animated/heavy-snow.json");

  if (conditionIncludes("fog")) return require("../assets/animated/fog.json");

  if (conditionIncludes("ice pellets"))
    return require("../assets/animated/ice-pellets.json");

  if (conditionIncludes("thundery"))
    return require("../assets/animated/thunder.json");

  return require("../assets/animated/overcast.json");
}
