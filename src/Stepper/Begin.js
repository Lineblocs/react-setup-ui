
function BeginStep(props) {
    return (
        <div className="begin-steps">
            {!props.loading && <p className="description">To start using Lineblocs, Please configure your settings</p>}
            {!props.loading && <button className="configure" disabled={props.loading} onClick={props.startStep}>Get Started</button>}
            {props.loading && <p style={{
                'fontSize': '1.5rem'
            }}>Please wait...</p>}
        </div>
    )
}

export default BeginStep;