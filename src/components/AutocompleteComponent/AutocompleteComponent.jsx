import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const AutocompleteComponent = React.forwardRef((props, ref) => {

    const { variants, name, handleChange, onBlur, selectValue, disabled } = props;
    const [idValue, setIdValue] = useState(selectValue ? selectValue : false)
    const [items, setItems] = useState([]);
    const [value, setValue] = useState('');


    useEffect(() => {
        if (variants) {
           let items = variants.map((item) => {
            return {id: item.cuie, name: item.Servicio.split(' - ')[1]}
            });
            setItems(items);
        }

    }, [variants])

    const handleOnSearch = (string, results) => {
      }
    
      const handleOnHover = (result) => {
      }
    
      const handleOnSelect = (item) => {
        if (item && item.id) {
          handleChange(item)
          setIdValue(item.id)
        }
      }
    
      const handleOnFocus = () => {
      }

      const formatResult = (item) => {
      }

      useEffect(() => {
        //SETEA EL VALOR COMO PLACEHOLDER EN INPUT Y TMB SETEA EL VALOR EN EL FORMULARIO. 
        // LA LIBRERIA react-search-autocomplete NO PERMITE SETEAR UN VALOR POR DEFECTO EN EL INPUT
        if (idValue) {
          let item = items.find((ins) => ins.id === idValue);
          if (item) {
            handleOnSelect(item);
            setValue(item.name)
          }
        }
      }, [idValue, items])


    return (
        <ReactSearchAutocomplete
            items={items}
            onSelect={handleOnSelect}
            styling={{
                height: "34px",
                border: "1px solid gray",
                borderRadius: "4px",
                backgroundColor: "white",
                boxShadow: "none",
                fontSize: "12px",
                fontFamily: "Courier",
                clearIconMargin: "3px 8px 0 0",
                zIndex: 2,
              }}
            placeholder={value}
        />
    )
})
export default AutocompleteComponent;