import React, { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { efectoresServices } from '../../../services/institutionsServices';
import { documentTypeServices } from '../../../services/parametricServices';
import AutocompleteComponent from '../../AutocompleteComponent';
import { variantsDependencies, variantsGender, variantsTimeAvaialability, variantsTypologies, variantsTypologyCategories } from '../../ComponentsData';
import DatePickerComponent from '../../DatePickerComponent';
import SelectType from '../../SelectType';
import { establecimientosDataHardcode } from '../../EstablecimientosDataHardcode';

const FormGroup = React.forwardRef((props, ref) => {

  const {
    inputType,
    label,
    name,
    type,
    value,
    disabled,
    onChange,
    onBlur,
    variants,
    selectValue,
    handleChange,
    maxDate } = props

  const vaGender = variantsGender
  const [options, setOptions] = useState([]);

  const getInstitutionsVariants = useCallback(
    () => {
      const institutions = establecimientosDataHardcode;
      setOptions(institutions);
      // efectoresServices()
      //   .then((res) => {
      //     const inst = res
      //     return inst;
      //   })
      //   .then((res) => {
      //     if (res?.length > 0) {
      //       setOptions(res);
      //       return options
      //     }
      //   })
      //   .catch((err) => { console.log(err) })
    },
    [],
  )

  const getDNIVariants = useCallback(
    () => {
      setOptions([{id: 1, name: '1'}]);
      documentTypeServices()
        .then((res) => {
          const types = res
          return types;
        })
        .then((res) => {
          if (res?.length > 0) {
            setOptions(res);
            return options
          }
        })
        .catch((err) => { console.log(err) })
    },
    [],
  )

  const getGenderVariants = () => {
    setOptions(vaGender);
    return options
  }

  const getDependenciesVariants = () =>{
    setOptions(variantsDependencies);
    return options
  }

  const getTypologiesVariants = () =>{
    setOptions(variantsTypologies);
    return options
  }
  
  const getTypologyCategoriesVariants = () =>{
    setOptions(variantsTypologyCategories);
    return options
  }

  const getTimeAvailabilityVariants = () => {
    setOptions(variantsTimeAvaialability);
    return options
  }
 
  useEffect(() => {
    if (variants === "variantsInstitutions") {
      getInstitutionsVariants();
    }
    if (variants === "variantsDNI") {
      getDNIVariants();
    }
    if (variants === "variantsGender") {
      getGenderVariants();
    }
    if (variants === "dependency") {
      getDependenciesVariants();
    }
    if (variants === "tipology") {
      getTypologiesVariants();
    }
    if (variants === "tipology_category") {
      getTypologyCategoriesVariants();
    }
    if (variants === "time_availability") {
      getTimeAvailabilityVariants();
    }
    if (typeof variants === 'object') {
      setOptions(variants.data)
    }
  }, [variants])

  return (
    <Form.Group className="mt-2">
      <Form.Label className="mb-0">{label}</Form.Label>
      {inputType === 'input' &&
        <Form.Control
          name={name}
          value={value ?? ''}
          type={type ? type : 'text'}
          className="form-control"
          disabled={disabled ? disabled : false}
          onChange={onChange}
          onBlur={onBlur}
          onPaste={(e) => {
            e.preventDefault();
            return false
          }}
        />
      }
      {inputType === 'select' &&
        <SelectType
          name={name}
          variants={options}
          selectValue={selectValue}
          disabled={disabled ? disabled : false}
          handleChange={handleChange}
        />
      }
       {inputType === 'autocomplete' &&
        <AutocompleteComponent
          name={name}
          variants={options}
          selectValue={selectValue}
          disabled={disabled ? disabled : false}
          handleChange={handleChange}
        />
      }
      {inputType === 'datePicker' &&
        <DatePickerComponent
          name={name}
          selectValue={selectValue}
          disabled={disabled ? disabled : false}
          handleChange={handleChange}
          maxDate={maxDate}
        />
      }
      {
        inputType === 'radio' &&
        <>
          <br />
          <input
            type={type}
            name={name}
            className="form-check-input"
            disabled={disabled ? disabled : false}
            value={true}
            checked={value && value.toString() === 'true' ? true : false}
            onChange={onChange}
          /> <label className="form-label me-3">
            Sí
          </label>
          <input
            type={type}
            name={name}
            disabled={disabled ? disabled : false}
            className="form-check-input"
            value={false}
            checked={value && value.toString() === 'true' ? false : true}
            onChange={onChange}
          /> <label className="form-label">
            No
          </label>
        </>
      }
      {
        inputType === 'file' &&
        <>
          <input
            className="form-control border mb-3"
            type="file"
            name={name}
            disabled={disabled ? disabled : false}
            onChange={onChange}
            onBlur={onBlur}
            accept="image/png, image/jpeg, .image/jpg" />
          <br />
        </>
      }

    </Form.Group>
  )
});

export default FormGroup