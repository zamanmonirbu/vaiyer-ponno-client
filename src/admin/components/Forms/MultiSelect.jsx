import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // For prop validation

const MultiSelect = ({ id }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    const loadOptions = () => {
      const select = document.getElementById(id);
      if (select) {
        const newOptions = [];
        for (let i = 0; i < select.options.length; i++) {
          newOptions.push({
            value: select.options[i].value,
            text: select.options[i].innerText,
            selected: select.options[i].hasAttribute('selected'),
          });
        }
        setOptions(newOptions);
      }
    };
    loadOptions();
  }, [id]);

  const open = () => setShow(true);

  const select = (index, event) => {
    const newOptions = [...options];
    if (!newOptions[index].selected) {
      newOptions[index].selected = true;
      newOptions[index].element = event.currentTarget;
      setSelected([...selected, index]);
    } else {
      const selectedIndex = selected.indexOf(index);
      if (selectedIndex !== -1) {
        newOptions[index].selected = false;
        setSelected(selected.filter((i) => i !== index));
      }
    }
    setOptions(newOptions);
  };

  const remove = (index) => {
    const newOptions = [...options];
    const selectedIndex = selected.indexOf(index);
    if (selectedIndex !== -1) {
      newOptions[index].selected = false;
      setSelected(selected.filter((i) => i !== index));
      setOptions(newOptions);
    }
  };

  const selectedValues = () => selected.map((option) => options[option].value);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownRef.current) return;
      if (!show || dropdownRef.current.contains(target) || trigger.current.contains(target)) return;
      setShow(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <div className="relative z-50">
      {/* Rest of your component remains the same */}
    </div>
  );
};

// PropTypes for validation
MultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MultiSelect;
