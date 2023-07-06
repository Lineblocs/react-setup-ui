import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Stepper.css';
import stepsData from './form.json';
import { ReactComponent as LeftChevron } from './../icons/left-chevron.svg';
import { ReactComponent as EditIcon } from './../icons/edit-icon.svg';
import { apiService } from './Stepper.service';

function Step({ step, currentStep, form, register, errors, handleSubmit, onSubmit, settings}) {
  return step === currentStep ? (
      <>
        <h2 className='title-center'>{form.title}</h2>
        <p className='title-center'>{form.description}</p>
        {form.note && <p className='note-storage'>{form.note}</p>}
        <form onSubmit={handleSubmit((data) => {onSubmit(data);})}>
          {form.forms.map((field, index) => {
            return (
              <div key={index}>
                <label>{field.label}{field.required && <span style={{ color: 'red' }}>*</span>}</label>
                <div style={field.fields.length > 1 ? { display: 'flex', gap: '12px' } : {}}>
                  {field.fields.map((nestedField, nestedIndex) => {
                    return (
                      <div key={nestedIndex} style={{ flexBasis: '50%' }}>
                        {GenerateFormField(nestedField, register, errors, nestedField.key, settings)}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </form>
      </>
  ) : null;
}

const GenerateFormField = (nestedField, register, errors, fieldName, settings) => {
  const matchedValue = findValueByKey(nestedField.key, settings);
  const initialValue = matchedValue || nestedField.value || nestedField.defaultValue;

  switch (nestedField.type) {
    case 'text':
    case 'password':
    case 'email':
      return (
        <div key={fieldName}>
          <input
            name={fieldName}
            type={nestedField.type}
            defaultValue={initialValue}
            {...register(fieldName, { required: nestedField.required })}
          />
          {errors && errors[fieldName] && <p className='error-msg'>This field is required</p>}
        </div>
      );
    case 'textarea':
      return (
        <div key={fieldName}>
          <textarea
            name={fieldName}
            defaultValue={initialValue}
            {...register(fieldName, { required: nestedField.required, minLength: nestedField.validation.min, maxLength: nestedField.validation.max })}
          />
          {errors && errors[fieldName] && <p className='error-msg'>This field is required with min {nestedField.validation.min} and max {nestedField.validation.max} characters</p>}
        </div>
      );
    case 'dropdown':
      return (
        <div key={fieldName}>
          <select name={fieldName} {...register(fieldName, nestedField.validation.required)} defaultValue={initialValue}>
            {nestedField.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors && errors[fieldName] && <p className='error-msg'>This field is required</p>}
        </div>
      );
    default:
      return null;
  }
};

function findValueByKey(key, settings) {
  return settings[key];
}

function Stepper(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = stepsData.length;

  const nextStep = (data) => {
    if (Object.keys(errors).length === 0 && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      saveSettings(data)
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

  const saveSettings = (data) => {
    const keysMatched = Object.keys(props.settings);
    const filteredData = Object.keys(data)
      .filter(key => keysMatched.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
    apiService.saveSettings(filteredData);
  }

  const onSubmit = (data) => {
    saveSettings(data)
    props.endStep();
  };

  return (
    <div className="stepper-container">
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
          <Step key={step.id} step={step.id} currentStep={currentStep} form={step} register={register} errors={errors} handleSubmit={handleSubmit}  onSubmit={onSubmit} settings={props.settings}/>
        ))}
      </div>
      <div className='button-setup'>
        <button disabled={currentStep === 1} className='next-button' onClick={prevStep}><LeftChevron /></button>
        {currentStep < totalSteps ? 
          <button className='next-button' onClick={handleSubmit(nextStep)}>Next</button> 
          : 
          <button className='next-button' onClick={handleSubmit(onSubmit)} type="button">Submit</button>
        }
      </div>
    </div>
  );
}

export default Stepper;
// module.exports = {
//   Stepper
// }
