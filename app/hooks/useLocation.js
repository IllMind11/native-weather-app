import { useState, useEffect } from "react";
import * as Location from "expo-location";

import cache from "../utility/cache";

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    // await cache.clear();
    const cachedLocation = await cache.get("location");

    if (cachedLocation === null) {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      await cache.store("location", location);
    } else {
      setLocation(cachedLocation);
    }
  }

  return { location, errorMsg };
}
