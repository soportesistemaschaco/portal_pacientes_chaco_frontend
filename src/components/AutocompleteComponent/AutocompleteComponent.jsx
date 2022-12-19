import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const AutocompleteComponent = React.forwardRef((props, ref) => {

    const { variants, name, handleChange, onBlur, selectValue, disabled } = props;
    const [idValue, setIdValue] = useState(selectValue ? selectValue : false)
    const [items, setItems] = useState([]);


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
        handleChange(item)
        setIdValue(item.id)
      }
    
      const handleOnFocus = () => {
      }

      const formatResult = (item) => {
        // return (
        //   <>
        //     <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        //     <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name.split(' - ')[1]}</span>
        //   </>
        // )
      }


    return (
        <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
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
        />
    )
})
export default AutocompleteComponent;