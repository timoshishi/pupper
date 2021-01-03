import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DistanceSlider from './DistanceSlider';

const SpeciesDistanceSelectStep = ({ handleFormData, zip_code }) => {
  const classes = useStyles();
  const [seekingSpecies, setSeekingSpecies] = useState('puppy');
  const [userSpecies, setUserSpecies] = useState('human');

  return (
    <div>
      {' '}
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>I am a</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={userSpecies}
          onChange={(e) => setUserSpecies(e.target.value)}>
          <MenuItem name='human' value='human'>
            Human
          </MenuItem>
          <MenuItem name='puppy' value='puppy'>
            Puppy
          </MenuItem>
          <MenuItem name='cat' value='cat'>
            Cat
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>Seeking A</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={seekingSpecies}
          onChange={(e) => setSeekingSpecies(e.target.value)}>
          <MenuItem name='human' value='human'>
            Human
          </MenuItem>
          <MenuItem name='puppy' value='puppy'>
            Puppy
          </MenuItem>
          <MenuItem name='cat' value='cat'>
            Cat
          </MenuItem>
        </Select>
      </FormControl>
      <DistanceSlider zip_code={zip_code} handleFormData={handleFormData} />
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

SpeciesDistanceSelectStep.propTypes = {
  zip_code: PropTypes.number.isRequired,
  handleFormData: PropTypes.func.isRequired,
};

export default SpeciesDistanceSelectStep;
