import React, { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

const LocationProvider = (props) => {

  const [location, setLocation] = useState([]);
  const [isallowed, setIsAllowed] = useState("prompt");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (
        (position.coords.longitude < 0 && position.coords.latitude < 0) ||
        (position.coords.longitude > 0 && position.coords.latitude < 0)
      ) {
        setLocation('america');
      } else {
        setLocation('rest');
      }
    });
  };

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((res) => {
      console.log(res.state);
      res.state === "granted" && setIsAllowed("granted");
      res.state === "denied" && setIsAllowed("denied");
    });
  }, [getLocation]);

  return (
    <LocationContext.Provider value={{isallowed, location, getLocation}}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
