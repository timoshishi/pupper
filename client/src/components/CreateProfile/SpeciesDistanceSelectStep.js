import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Box,
} from '@material-ui/core';
import DistanceSlider from './DistanceSlider';

const SpeciesDistanceSelectStep = ({ handleFormData, zip_code }) => {
  const classes = useStyles();
  const [seekingSpecies, setSeekingSpecies] = useState('puppy');
  const [userSpecies, setUserSpecies] = useState('human');

  return (
    <Box>
      <Box my={4}>
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
      </Box>
      <DistanceSlider zip_code={zip_code} handleFormData={handleFormData} />
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '30vh',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

SpeciesDistanceSelectStep.propTypes = {
  zip_code: PropTypes.string.isRequired,
  handleFormData: PropTypes.func.isRequired,
};

export default SpeciesDistanceSelectStep;
