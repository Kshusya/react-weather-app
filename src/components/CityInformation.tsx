export interface GeocodeResponse {
    latitude: number,
    longitude: number,
    city: string,
    countryName: string,
}

interface CityInformationProps {
    cityInfo: GeocodeResponse,
}

export default function CityInformation(props: CityInformationProps) {

    return (
        <div className='city-info text-center'>
            <h2>{props.cityInfo.city}, {props.cityInfo.countryName}</h2>
        </div>
    )
}