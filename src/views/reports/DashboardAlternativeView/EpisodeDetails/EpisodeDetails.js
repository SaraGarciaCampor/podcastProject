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
  CardContent,
  CardMedia,
  Divider,
  makeStyles,
  Typography,
  CardActionArea,
} from '@material-ui/core';
import AudioPlayer from 'src/components/AudioPlayer';
import { itunesService } from 'src/services/itunesService';
import { useHistory, useLocation, Link } from 'react-router-dom';

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
  const location = useLocation();
  const history = useHistory();
  const podData = location.state.podcastData;
  const episodeData = location.state.ep;
  console.log(podData);
  const [podcast, setPodcast] = useState(null);

  const getPodcastDetails = useCallback(async () => {
    await itunesService.GetPodcast(setPodcast, podData.someData.id.attributes['im:id']);
  }, [podData]);


  useEffect(() => {
    if (podcast === null) {
      getPodcastDetails();
    }
  }, [getPodcastDetails]);

  useEffect(() => {
    console.log(podcast);
  }, [podcast]);

  if (!podcast) {
    return null;
  }

  const handleClickOpenPodcast = () => {
    const id = podData.someData.id.attributes['im:id'];
    console.log('id');
    history.push({ pathname: `/app/podcast/${id}`, state: podData });
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <Card
        className={clsx(classes.root)}
        style={{ maxWidth: '25vw' }}
      >
        <CardHeader
          title="Podcast"
        />
        <Divider />
        <Box>
          <Card onClick={handleClickOpenPodcast}>
            <CardActionArea>
              <CardMedia
                component="img"
                className={classes.media}
                style={{
                  padding: 5,
                  width: 'auto',
                  maxHeight: '500px'
                }}
                image={podcast.results[0].artworkUrl100}
                alt="Image"
              />
              <CardContent>
                <Typography
                  variant="h4"
                  color="textPrimary"
                  key={podData.someData['im:name'].label}
                >
                  {podData.someData['im:name'].label}
                </Typography>
                <br />
                <Typography
                  variant="h5"
                  color="textSecondary"
                  key={podData.someData.id.attributes['im:id']}
                >
                  by
                  {' '}
                  {podData.someData['im:artist'].label}
                </Typography>
                <br />
                <Typography
                  variant="h5"
                  color="textSecondary"
                  key={podData.someData.summary.label}
                >
                  Description:
                  {' '}
                  {podData.someData.summary.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        <Divider />
      </Card>
      <Card
        className={clsx(classes.root)}
        style={{ width: '75vw' }}
      >
        <Box>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                color="textPrimary"
                key={episodeData.someData.trackName}
              >
                {episodeData.someData.trackName}
              </Typography>
              <br />
              <br />
              <Typography
                variant="h5"
                color="textSecondary"
                key={podData.someData.summary.label}
              >
                {episodeData.someData.shortDescription}
              </Typography>
            </CardContent>
          </Card>
          <AudioPlayer src={episodeData.someData.trackViewUrl} />
        </Box>
        <Divider />
      </Card>
    </Box>
  );
}

PodcastDetails.propTypes = {
};

export default PodcastDetails;
