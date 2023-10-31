import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const AutocompleteComponent = React.forwardRef((props, ref) => {

  const { variants, name, handleChange, onBlur, selectValue, disabled } = props;
  const [idValue, setIdValue] = useState(selectValue ? selectValue : false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (variants) {
      let items = variants.map((item, index) => {
        return { id: index, name: item.name }
      });
      let itemsOrder = items.sort((a, b) => {
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1;
        else  return 0;
      })
      setItems(itemsOrder);
    }
  }, [variants]);

  const handleOnSearch = (string, results) => {
    handleChange(string)
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
    // setItems(items);
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
      onSearch={handleOnSearch}
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
      showClear={false}
      placeholder={value || 'Buscar...'}
      autoFocus={false}
      showItemsOnFocus={true}
    />
  )
})
export default AutocompleteComponent;