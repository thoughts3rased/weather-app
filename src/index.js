import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import './index.css';
import SearchIcon from '@material-ui/icons/Search';
import { getWeatherDataForLocation } from './functions/getWeatherDataForLocation';
import { determineNewBackgroundColour } from './functions/determineNewBackgroundColour';
import { keyframes } from 'styled-components';

const Page = (props) => {
    
    const [currentLocation, setCurrentLocation] = useState("London")
    const [currentLocationCode, setCurrentLocationCode] = useState("")
    const [currentCondition, setCurrentCondition] = useState("")
    const [currentTemp, setCurrentTemp] = useState()
    const [currentFLTemp, setCurrentFLTemp] = useState()
    const [currentIcon, setCurrentIcon] = useState("")
    const [currentDescription, setCurrentDescription] = useState("")
    const [prevColour] = useState("#ffffff")


    const bgTransition = () => keyframes`
    from {
      background-color: ${prevColour};
    }
  
    to {
      background-color: ${determineNewBackgroundColour(currentCondition)};
    }
    `

    useEffect(() =>{   
      getWeatherDataForLocation(currentLocation)
      .then((result) =>{
        setCurrentLocation(result.locationName)
        setCurrentCondition(result.condition)
        setCurrentDescription(result.description)
        setCurrentTemp(result.temp)
        setCurrentFLTemp(result.FLTemp)
        setCurrentIcon(`http://openweathermap.org/img/wn/${result.iconId}@2x.png`)
        setCurrentLocationCode(result.locationCode)
      })
    }, [currentLocation])
    
    const handleChange = (e) =>{
      let targetLocation
      try{
        targetLocation = e.target[0].value
      } catch {
        targetLocation = currentLocation
      }
      e.preventDefault()
      getWeatherDataForLocation(targetLocation)
        .then((result) =>{
          setCurrentLocation(result.locationName)
          setCurrentCondition(result.condition)
          setCurrentTemp(result.temp)
          setCurrentFLTemp(result.FLTemp)
          setCurrentIcon(`http://openweathermap.org/img/wn/${result.iconId}@2x.png`)
          setCurrentLocationCode(result.locationCode)
        })
        .catch(() =>{
          setCurrentLocation("Location Not Found")
          setCurrentCondition(null)
          setCurrentTemp(null)
          setCurrentFLTemp(null)
          setCurrentIcon(null)
          setCurrentLocationCode(null)
        })
    }

    return(
        <div className = "pageBody" style={{animation: `${bgTransition} 1.2s ease-in-out`, backgroundColor: determineNewBackgroundColour(currentCondition)}}>
          <div className='searchBar'>
            <form onSubmit={e => handleChange(e)}>
              <input type="text" placeholder='Search for a location...'/>
              <button className = "mainSearchBarButton" type="submit"><SearchIcon/></button>
            </form>
          </div>
          <div className='locationName'>
            <p>{currentLocation}, {currentLocationCode}</p>
          </div>
          <div className = "weatherInfo">
              <div className = "mainWeatherInfo">
                <ul>
                  <li><p>{currentCondition}  {currentTemp}°C</p></li>
                  <li id="weatherIcon"><img alt="" src = {currentIcon}/></li>
                </ul>
              </div>
              <div className = "feelsLike">
                <p id = "conditionDescription">{currentDescription}</p>
                <p>Feels like {currentFLTemp}°C</p>
                <button onClick={e => handleChange(e)}>Refresh Data</button>
              </div>
          </div>
        </div>
    )
}
ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('root')
);