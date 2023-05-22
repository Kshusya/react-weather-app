export default function (props: { value: string, icon: string, title: string }) {
    return (
        <div className="weather-element">
            <div className="weather-element__wrapper">
                <p className="weather-element__title">{props.title}</p>
                <img width={40} height={40} src={props.icon} alt={props.title} />
                <h3>{props.value}</h3>
            </div>
        </div>
    )
}