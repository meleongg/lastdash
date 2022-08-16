const apiServices = (() => {
    const fetchGeocodeParams = {
        mode: 'cors',
    }
    
    const fetchTransitParams = {
        mode: 'cors',
        headers: {
            'Accept': 'application/JSON',
        },
    }

    const getGeoCode = async (address) => {
        try {
            const geocodeResponse = await fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEOCODE_API_KEY}&query=${address}`, fetchGeocodeParams);
            const geocodeResponseData = await geocodeResponse.json();
            const lat = geocodeResponseData.data[0].latitude;
            const long = geocodeResponseData.data[0].longitude;
            return [lat, long];
        } catch (e) {
            console.log('Error getting data', e);
        }
    }
    
    const getStops = async (radius, lat, long) => {
        try {
            const stopsResponse = await fetch(`https://api.translink.ca/rttiapi/v1/stops?apikey=${process.env.REACT_APP_TRANSIT_API_KEY}&lat=${lat}&long=${long}&radius=${radius}`, fetchTransitParams);
            const stopsResponseData = await stopsResponse.json();
            return stopsResponseData;
        } catch (e) {
            console.log('Error getting data', e);
        }
    }
    
    const getRoute = async (route) => {
        try {
            const busResponse = await fetch(`https://api.translink.ca/rttiapi/v1/routes/${route}?apikey=${process.env.REACT_APP_TRANSIT_API_KEY}`, fetchTransitParams);
            const busResponseData = await busResponse.json();
            console.log(busResponseData);
        } catch (e) {
            console.log('Error getting data', e);
        }
    }

    const getStopTimes = async (routeNum, stopNum) => {
        try {
            const res = await fetch(`https://api.translink.ca/rttiapi/v1/stops/${stopNum}/estimates?apikey=${process.env.REACT_APP_TRANSIT_API_KEY}&routeNo=${routeNum}`, fetchTransitParams);
            const json = res.json();
            return json; 
        } catch (e) {
            console.log('Error getting data', e);
        }
    }

    return {
        getGeoCode,
        getStops,
        getRoute,
        getStopTimes
    }
})();

export default apiServices;