import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  makeStyles,
  Typography
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { itunesService } from 'src/services/itunesService';
import { useParams } from 'react-router-dom';

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

function PodcastDetails() {
  const classes = useStyles();
  const { podId } = useParams();
  console.log('holi');
  console.log(podId);
  const [podcast, setPodcast] = useState(null);

  const getPodcastDetails = useCallback(async () => {
    await itunesService.GetPodcast(setPodcast, '1535809341');
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
      className={clsx(classes.root)}
    >
      <Box>
        
      </Box>
      <CardHeader
        action={<GenericMoreButton />}
        title="Podcast"
      />
      <Divider />
      <Divider />
    </Card>
  );
}

PodcastDetails.propTypes = {
};

export default PodcastDetails;
