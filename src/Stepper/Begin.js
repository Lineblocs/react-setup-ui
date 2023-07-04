
function BeginStep(props) {
    return (
        <div className="begin-steps">
            <p className="description">To start using Lineblocs, Please configure your settings</p>
            <button className="configure" disabled={props.loading} onClick={props.startStep}>Get Started</button>
            {props.loading && <p>Fetching data from server please wait...</p>}
        </div>
    )
}

export default BeginStep;