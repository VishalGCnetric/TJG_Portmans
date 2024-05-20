import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

const MobileNumberInput = ({num}) => {
  const [countryCode, setCountryCode] = React.useState('+61');
  const [mobileNumber, setMobileNumber] = React.useState(num || '');

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  return (
    <Box display="flex" alignItems="center" width="100%">
      <TextField
        label="Mobile Number"
        variant="outlined"
        fullWidth
        value={num}
        onChange={handleMobileNumberChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Select
                value={countryCode}
                onChange={handleCountryCodeChange}
                displayEmpty
                variant="standard"
                disableUnderline
                renderValue={(selected) => selected}
                sx={{
                  '.MuiSelect-select': {
                    padding: '0 8px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              >
                <MenuItem value="+1">+1 (USA)</MenuItem>
                <MenuItem value="+91">+91 (India)</MenuItem>
                <MenuItem value="+44">+44 (UK)</MenuItem>
                <MenuItem value="+61">+61 (Australia)</MenuItem>
                {/* Add more countries as needed */}
              </Select>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};

export default MobileNumberInput;
