import React, { createContext, useState } from "react";

export const LocationContext = createContext();

const LocationProvider = (props) => {

  const [location, setLocation] = useState([]);

  window.onload = () => {
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

  return (
    <LocationContext.Provider value={{location}}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
