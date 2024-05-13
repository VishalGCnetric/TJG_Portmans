import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const MobileNumberInput = () => {
  const [countryCode, setCountryCode] = React.useState('+1');

  const handleChange = (event) => {
    setCountryCode(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="country-code-label">Country Code</InputLabel>
      <Select
        labelId="country-code-label"
        id="country-code-select"
        value={countryCode}
        onChange={handleChange}
        label="Country Code"
      >
        <MenuItem value="+1">+1</MenuItem>
        <MenuItem value="+91">+91</MenuItem>
        {/* Add more countries as needed */}
      </Select>
      <TextField
        label="Mobile Number"
        InputProps={{
          startAdornment: <span>{countryCode}</span>,
        }}
      />
    </FormControl>
  );
};

export default MobileNumberInput;
