import React from 'react';
import PropTypes from 'prop-types';
import { Grid, ListItem, ListItemText } from '@material-ui/core';
import formatRelative from 'date-fns/formatRelative';

const Message = ({ message }) => {
  const createdAt = new Date(message.created_at);
  return (
    <ListItem key='1'>
      <Grid container>
        <Grid item={true} xs={12}>
          <ListItemText
            align={message.from_human ? 'right' : 'left'}
            primary={message.body}></ListItemText>
        </Grid>
        <Grid item={true} xs={12}>
          <ListItemText
            align={message.from_human ? 'right' : 'left'}
            secondary={formatRelative(createdAt, Date.now())}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
