import React from 'react';
import PropTypes from 'prop-types';
import { Grid, ListItem, ListItemText } from '@material-ui/core';
const Message = (props) => {
  return (
    <ListItem key='1'>
      <Grid container>
        <Grid item={true} xs={12}>
          <ListItemText
            align='right'
            primary="Hey man, What's up ?"></ListItemText>
        </Grid>
        <Grid item={true} xs={12}>
          <ListItemText align='right' secondary='09:30'></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};

Message.propTypes = {};

export default Message;
