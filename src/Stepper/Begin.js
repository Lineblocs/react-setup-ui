
function BeginStep(props) {
    return (
        <div className="begin-steps">
            <p className="description">To start using Lineblocs, Please configure your settings</p>
            <button className="configure" onClick={props.startStep}>Get Started</button>
        </div>
    )
}

export default BeginStep;