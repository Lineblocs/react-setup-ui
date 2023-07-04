import React from 'react';
import BeginStep from './Begin';
import Steps from './Steps';
import EndStep from './End';
import logo from './../images/new-logo-blue.png';
import { apiService } from './Stepper.service';

import './Stepper.css';


function Stepper() {

    const [currentStep, setCurrentStep] = React.useState('begin');
    const [settings, setSettings]       = React.useState({});
    const [loading, setLoading]         = React.useState(false);

    function startStep() {
        if (loading) return;
        setLoading(true);
        apiService.getSettings().then((response) => {
            console.log(response);
            setSettings(response);
            setCurrentStep('step');
        });
    }

    function endStep() {
        setCurrentStep('end')
    }

    return (
        <>
            <header className="setup-header">
                <img className='logo-src' src={logo} alt='Lineblocs' />
            </header>
            <div className='stepper-blocks'>
                {currentStep && currentStep === 'begin' && <BeginStep loading={loading} startStep={startStep}/>}
                {currentStep && currentStep === 'step' && <Steps endStep={endStep} settings={settings}/>}
                {currentStep && currentStep === 'end' && <EndStep />}
            </div>
        </>
    )
}

export default Stepper;