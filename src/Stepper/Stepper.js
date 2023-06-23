import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Stepper.css';
import stepsData from'./form.json';
import logo from './../images/new-logo-blue.png';
import { ReactComponent as RightChevron } from './../icons/right-chevron.svg';
import { ReactComponent as LeftChevron } from './../icons/left-chevron.svg';
import { ReactComponent as EditIcon } from './../icons/edit-icon.svg';

function Step({ step, currentStep, form, register, errors, handleSubmit, onSubmit }) {
  return step === currentStep ? (
    <>
      <h2 className='title-center'>{form.title}</h2>
      <p className='title-center'>{form.description}</p>
      {form.note && <p className='note-storage'>{form.note}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {form.forms && form.forms.map(({ label, name, type, required, validation, defaultValue, options }) => {
          switch (type) {
            case 'text':
            return (
                <div key={name}>
                    <label>{label}{required && <span style={{ color: 'red' }}>*</span>}</label>
                    <input
                        name={name}
                        type={type}
                        defaultValue={defaultValue}
                        {...register(name, { required })}
                    />
                    {errors && errors[name] && <p className='error-msg'>This field is required</p>}
                </div>
            );
            case 'email':
              return (
                <div key={name}>
                  <label>{label}{required && <span style={{ color: 'red' }}>*</span>}</label>
                  <input
                    name={name}
                    type={type}
                    defaultValue={defaultValue}
                    {...register(name, { required, ...validation, pattern: validation.pattern && {
                      value: new RegExp(validation.pattern.value),
                      message: validation.pattern.message
                    }
                  })}
                  />
                  {errors && errors[name] && <p className='error-msg'>{errors[name].message}</p>}
                </div>
              );
            case 'password':
              return (
                  <div key={name}>
                      <label>{label}{required && <span style={{ color: 'red' }}>*</span>}</label>
                      <input
                          name={name}
                          type={type}
                          defaultValue={defaultValue}
                          {...register(name, { required, minLength: validation.min, maxLength: validation.max })}
                      />
                      {errors && errors[name] && <p className='error-msg'>This field is required with min {validation.min} and max {validation.max} characters</p>}
                  </div>
              );
            case 'dropdown':
              return (
                <div key={name}>
                  <label>{label}{required && <span style={{ color: 'red' }}>*</span>}</label>
                  <select name={name} {...register(name, { required })}>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors && errors[name] && <p className='error-msg'>This field is required</p>}
                </div>
              );
            case 'textarea':
              return (
                  <div key={name}>
                      <label>{label}{required && <span style={{ color: 'red' }}>*</span>}</label>
                      <textarea
                          name={name}
                          defaultValue={defaultValue}
                          {...register(name, { required, minLength: validation.min, maxLength: validation.max })}
                      />
                      {errors && errors[name] && <p className='error-msg'>This field is required with min {validation.min} and max {validation.max} characters</p>}
                  </div>
              );
            default:
              return null;
          }
        })}
      </form>
    </>
  ) : null;
}


function Stepper() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = stepsData.length;

  const nextStep = () => {
    if (Object.keys(errors).length === 0 && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (Object.keys(errors).length === 0 && (step === currentStep + 1 || step < currentStep)) {
      setCurrentStep(step);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="stepper-container">
      <header className="setup-header"><img className='logo-src' src={logo} alt='Lineblocs' /></header>
      <div>
        <div className="step-container">
          {[...Array(totalSteps)].map((_, index) => (
            <div key={index} className="step-item">
              <div className={`step-circle ${index + 1 <= currentStep ? 'active' : ''}`} onClick={() => goToStep(index + 1)}>
                    {index + 1 === currentStep ? <EditIcon /> : index + 1}
              </div>
              {index + 1 !== totalSteps && <div className="step-line" onClick={(e) => e.stopPropagation()} />}
            </div>
          ))}
        </div>
        {stepsData.map((step) => (
          <Step key={step.id} step={step.id} currentStep={currentStep} form={step} register={register} errors={errors} handleSubmit={handleSubmit}  onSubmit={onSubmit}/>
        ))}
      </div>
      <div className='button-setup'>
        <button disabled={currentStep === 1} className='next-button-color' onClick={prevStep}><LeftChevron /></button>
        {currentStep < totalSteps ? 
          <button className='next-button-color' onClick={handleSubmit(nextStep)}><RightChevron /></button> 
          : 
          <button className='next-button-color' type="submit">Submit</button>
        }
      </div>
    </div>
  );
}

export default Stepper;
