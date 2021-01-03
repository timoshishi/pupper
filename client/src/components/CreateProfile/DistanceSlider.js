import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box, Slider, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const marks = [
  {
    value: 0,
    label: 'Any',
  },
  {
    value: 25,
  },
  {
    value: 50,
    label: 'Miles Away',
  },
  {
    value: 75,
  },
  {
    value: 100,
  },
];

function valueText(value) {
  return `${value}`;
}

const DistanceSlider = ({ zip_code, handleFormData }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TextField
        id='standard-number'
        label='Zip Code'
        type='number'
        fullWidth
        max='99999'
        min='0'
        name='zip_code'
        value={zip_code}
        onChange={handleFormData}
        style={
          (zip_code === 0 && zeroStyle,
          { marginRight: '3rem', marginLeft: '.5rem' })
        }
      />
      <Slider
        defaultValue={25}
        getAriaValueText={valueText}
        aria-labelledby='discrete-slider-always'
        fullWidth
        step={25}
        marks={marks}
        valueLabelDisplay='on'
        style={{ marginTop: '2rem' }}
      />
    </Box>
  );
};
const zeroStyle = { color: 'white' };
const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  margin: {
    height: theme.spacing(2),
  },
}));

DistanceSlider.propTypes = {
  zip_code: PropTypes.number.isRequired,
  handleFormData: PropTypes.func.isRequired,
};

export default DistanceSlider;
