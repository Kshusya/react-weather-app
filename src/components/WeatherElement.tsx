export default function (props: { title: string, icon: string, }) {
    return (
        <div className="weather__element">
            <img width={40} height={40} src={props.icon} alt={props.title} />
            <div>{props.title}</div>
        </div>
    )
}