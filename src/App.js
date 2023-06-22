import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import stepsData from'./form.json';

function Step({ step, currentStep, form, register, errors, handleSubmit, onSubmit }) {
  return step === currentStep ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      {form.forms && form.forms.map(({ label, name, type, required, validation, defaultValue, options }) => {
        switch (type) {
          case 'text':
          case 'email':
            return (
              <div key={name}>
                <label>{label}</label>
                <input
                  name={name}
                  type={type}
                  placeholder={defaultValue}
                  {...register(name, { required, minLength: validation.min, maxLength: validation.max })}
                />
                {errors && errors[name] && <p>This field is required with min {validation.min} and max {validation.max} characters</p>}
              </div>
            );
          case 'password':
            return (
                <div key={name}>
                    <label>{label}</label>
                    <input
                        name={name}
                        type={type}
                        defaultValue={defaultValue}
                        {...register(name, { required, minLength: validation.min, maxLength: validation.max })}
                    />
                    {errors && errors[name] && <p>This field is required with min {validation.min} and max {validation.max} characters</p>}
                </div>
            );
          case 'dropdown':
            return (
              <div key={name}>
                <label>{label}</label>
                <select name={name} {...register(name, { required })}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          case 'textarea':
            return (
                <div key={name}>
                    <label>{label}</label>
                    <textarea
                        name={name}
                        defaultValue={defaultValue}
                        {...register(name, { required, minLength: validation.min, maxLength: validation.max })}
                    />
                    {errors && errors[name] && <p>This field is required with min {validation.min} and max {validation.max} characters</p>}
                </div>
            );
          default:
            return null;
        }
      })}
      {/* <button type="submit">Submit</button> */}
    </form>
  ) : null;
}


function App() {
  const { register, errors, handleSubmit } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = stepsData.length;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="App">
      <header className="Setup-header">Setup</header>
      <div>
        <div className="step-container">
          {[...Array(totalSteps)].map((_, index) => (
            <div key={index} className="step-item">
              <div className={`step-circle ${index + 1 <= currentStep ? 'active' : ''}`}>
                {index + 1}
              </div>
              {<div className="step-line" />}
            </div>
          ))}
        </div>
        {stepsData.map((step) => (
          <Step key={step.id} step={step.id} currentStep={currentStep} form={step} register={register} errors={errors} handleSubmit={handleSubmit}  onSubmit={onSubmit}/>
        ))}
      </div>
      <div className='button-setup'>
        <button className='next-button-color' onClick={prevStep}>Previous</button>
        <button className='next-button-color' onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}

export default App;
