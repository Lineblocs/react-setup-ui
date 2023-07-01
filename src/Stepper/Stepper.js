import React from 'react';
import BeginStep from './Begin';
import Steps from './Steps';
import EndStep from './End';
import logo from './../images/new-logo-blue.png';
import { apiService } from './Stepper.service';

import './Stepper.css';


function Stepper() {

    const [currentStep, setCurrentStep] = React.useState('begin');

    function startStep() {
        apiService.getSettings().then((response) => {
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
                {currentStep && currentStep === 'begin' && <BeginStep startStep={startStep}/>}
                {currentStep && currentStep === 'step' && <Steps endStep={endStep}/>}
                {currentStep && currentStep === 'end' && <EndStep />}
            </div>
        </>
    )
}

export default Stepper;