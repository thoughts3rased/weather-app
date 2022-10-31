export const getWeatherDataForLocation = (locationString) => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locationString}&appid=2b6cf1cd9218d6b59aeb1f4d79637576&units=metric`, {'Content-Type': 'application/json', 'Accept': 'application/json'})
        .then(res => res.json())
        .catch(error =>{
            throw new Error(error)
        })
        .then(json => {
            return {"locationName": json.name, 
            "condition": json.weather[0].main, 
            "temp": json.main.temp, 
            "FLTemp": json.main.feels_like, 
            "iconId": json.weather[0].icon, 
            "locationCode": json.sys.country,
            "description": json.weather[0].description}
        })
}