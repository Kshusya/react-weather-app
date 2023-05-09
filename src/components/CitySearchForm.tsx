import { Autocomplete, TextField } from "@mui/material"
import axios from "axios"
import React, { useEffect } from "react"

interface CitySearchResponse {
    results: {
        id: number,
        name: string,
        latitude: number,
        longitude: number,
        elevation: number,
        feature_code: string,
        country_code: string,
        admin1_id: number,
        timezone: string,
        population: number,
        country_id: number,
        country: string,
        admin1: string,
    }[],
}

async function SearchApiForCity(city: string) {
    const response = await axios.get<CitySearchResponse>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    return response.data
}

export default function ({ onCoordsChange }: { onCoordsChange: (coords: [number, number]) => void}) {
    const [cityUserInput, setCityUserInput] = React.useState("")

    const [citySearchApiSuggestion, setCitySearchApiSuggestion] = React.useState<any[]>([])

    useEffect(function () {
        if (cityUserInput.length > 0) {
            console.log(cityUserInput)
            SearchApiForCity(cityUserInput).then(function (response) {
                console.log(response)
                if (response.results === undefined) {
                    return
                }
                setCitySearchApiSuggestion(response.results.map(function (city) {
                    return { label: city.name, id: city.id, latitude: city.latitude, longitude: city.longitude }

                }))
            })
        }
    }, [cityUserInput])

    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={citySearchApiSuggestion}
                sx={{ width: 300 }}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            {option.label}
                        </li>
                    );
                }}
                onChange={(event, value) => {
                    console.log("final value", value)
                    if (value === null) {
                        return
                    }
                    onCoordsChange([value.latitude, value.longitude])
                }}
                renderInput={(params) => <TextField
                    {...params}
                    label="City"
                    value={cityUserInput}
                    onChange={event => setCityUserInput(event.target.value)}
                />}
            />
        </div>
    )
}