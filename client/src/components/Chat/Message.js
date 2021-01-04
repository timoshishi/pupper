import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Grid, ListItem, ListItemText } from '@material-ui/core';
import formatRelative from 'date-fns/formatRelative';

const Message = ({ message, dog, user }) => {
  const createdAt = new Date(message.created_at);
  return (
    <ListItem key='1'>
      <Grid container>
        {!message.from_human ? (
          <Grid item={true} xs={12}>
            <Box display='flex'>
              <Avatar
                alt={dog.name}
                src={dog.photos[0]}
                style={{ marginRight: '1rem' }}
              />
              <ListItemText
                align='left'
                primary={message.body}
                secondary={formatRelative(
                  createdAt,
                  Date.now()
                )}></ListItemText>
            </Box>
          </Grid>
        ) : (
          <Grid item={true} xs={12}>
            <Box display='flex'>
              <ListItemText
                align='right'
                secondary={formatRelative(createdAt, Date.now())}
                primary={message.body}></ListItemText>
              <Avatar
                alt={user.name}
                src={user.photos[0]}
                style={{ marginLeft: '1rem' }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </ListItem>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dog: PropTypes.object.isRequired,
};

export default Message;
