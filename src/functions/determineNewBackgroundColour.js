export const determineNewBackgroundColour = (condition) =>{
    const conditionColoursDict = {
        "Clear": "#80d0ff",
        "Clouds": "#e4f0f7",
        "Rain": "#96aab5",
        "Thunderstorm": "#43496b",
        "Snow": "#ebfffe",
        "Mist": "#f2f7f7",
        "Smoke": "#737373",
        "Haze": "#dedede",
        "Fog": "#dedede",
        "Sand": "#ffc226",
        "Dust": "#ffe9c7",
        "Ash": "#6e6a64",
        "Squall": "#aba9a7",
        "Tornado": "#ff4747"
    }

    return conditionColoursDict[condition]
}