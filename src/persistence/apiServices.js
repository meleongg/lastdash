const apiServices = (() => {
  const fetchGeocodeParams = {
    mode: "cors",
  };

  const fetchTransitParams = {
    mode: "cors",
    headers: {
      Accept: "application/JSON",
    },
  };

  const getGeoCode = async (address) => {
    try {
      const geocodeResponse = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${process.env.REACT_APP_GEOCODE_API_KEY}`,
        fetchGeocodeParams
      );
      const geocodeResponseData = await geocodeResponse.json();
      const lat = geocodeResponseData.features[0].geometry.coordinates[1];
      const long = geocodeResponseData.features[0].geometry.coordinates[0];
      return [lat, long];
    } catch (e) {
      console.log("Error getting data", e);
      alert("Sorry, address does not exist! Please try again!");
    }
  };

  const getStops = async (radius, lat, long) => {
    try {
      const stopsResponse = await fetch(
        `https://gtfsapi.translink.ca/v3/gtfsstops?apikey=${process.env.REACT_APP_TRANSIT_API_KEY}&lat=${lat}&long=${long}&radius=${radius}`,
        fetchTransitParams
      );
      const stopsResponseData = await stopsResponse.json();
      return stopsResponseData;
    } catch (e) {
      console.log("Error getting data", e);
      alert("Sorry, no nearby stops! Please try again!");
    }
  };

  const getRoute = async (route) => {
    try {
      const busResponse = await fetch(
        `https://gtfsapi.translink.ca/v3/gtfsroutes/${route}?apikey=${process.env.REACT_APP_TRANSIT_API_KEY}`,
        fetchTransitParams
      );
      const busResponseData = await busResponse.json();
      console.log(busResponseData);
    } catch (e) {
      console.log("Error getting data", e);
      alert("Sorry, route does not exist! Please try again!");
    }
  };

  const getStopTimes = async (routeNum, stopNum) => {
    try {
      const res = await fetch(
        `https://gtfsapi.translink.ca/v3/gtfsstops/${stopNum}/estimates?apikey=${process.env.REACT_APP_TRANSIT_API_KEY}&routeNo=${routeNum}`,
        fetchTransitParams
      );
      const json = res.json();
      return json;
    } catch (e) {
      console.log("Error getting data", e);
      alert("Sorry, unable to get stop information! Please try again!");
    }
  };

  return {
    getGeoCode,
    getStops,
    getRoute,
    getStopTimes,
  };
})();

export default apiServices;
