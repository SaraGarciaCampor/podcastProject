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
import { itunesService } from 'src/services/itunesService';
import { useLocation } from 'react-router-dom';

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
  const podcastData = location.state;
  console.log(podcastData.someData.id.attributes['im:id']);
  const [podcast, setPodcast] = useState(null);

  const getPodcastDetails = useCallback(async () => {
    await itunesService.GetPodcast(setPodcast, podcastData.someData.id.attributes['im:id']);
  }, [podcast]);

  useEffect(() => {
    if (podcast === null) {
      getPodcastDetails();
    }
  }, []);

  useEffect(() => {
    console.log(podcast);
  }, [podcast]);

  if (!podcast) {
    return null;
  }

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
          <Card>
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
                  key={podcastData.someData['im:name'].label}
                >
                  {podcastData.someData['im:name'].label}
                </Typography>
                <br />
                <Typography
                  variant="h5"
                  color="textSecondary"
                  key={podcastData.someData['im:artist'].label}
                >
                  by
                  {' '}
                  {podcastData.someData['im:artist'].label}
                </Typography>
                <br />
                <Typography
                  variant="h5"
                  color="textSecondary"
                  key={podcastData.someData.summary.label}
                >
                  Description:
                  {' '}
                  {podcastData.someData.summary.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        <Divider />
      </Card>
      <Card
        className={clsx(classes.root)}
        style={{ maxWidth: '25vw' }}
      >
        <CardHeader
          title="Episodes"
        />
        <Divider />
        <Box>
          <Card>
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
                  key={podcastData.someData['im:name'].label}
                >
                  {podcastData.someData['im:name'].label}
                </Typography>
                <br />
                <Typography
                  variant="h5"
                  color="textSecondary"
                  key={podcastData.someData['im:artist'].label}
                >
                  by
                  {' '}
                  {podcastData.someData['im:artist'].label}
                </Typography>
                <br />
                <Typography
                  variant="h5"
                  color="textSecondary"
                  key={podcastData.someData.summary.label}
                >
                  Description:
                  {' '}
                  {podcastData.someData.summary.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        <Divider />
      </Card>
    </Box>
  );
}

PodcastDetails.propTypes = {
};

export default PodcastDetails;
