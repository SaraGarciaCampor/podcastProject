import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import { itunesService } from 'src/services/itunesService';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}));

function Test({ className, ...rest }) {
  const classes = useStyles();
  const [podcast, setPodcast] = useState(null);

  const getPodcastDetails = useCallback(async () => {
    await itunesService.GetPodcast(setPodcast);
  }, []);

  useEffect(() => {
    if (podcast === null) {
      getPodcastDetails();
    }
  }, [getPodcastDetails, podcast]);

  if (!podcast) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Podcasts"
      />
      <Divider />
    </Card>
  );
}

Test.propTypes = {
  className: PropTypes.string
};

export default Test;
