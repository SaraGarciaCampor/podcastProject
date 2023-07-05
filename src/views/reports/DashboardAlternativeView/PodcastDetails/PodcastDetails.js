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
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { itunesService } from 'src/services/itunesService';
import { useHistory, useLocation } from 'react-router-dom';

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
  const podcastData = location.state;
  console.log(location.state);
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState(null);

  const getPodcastDetails = useCallback(async () => {
    await itunesService.GetPodcast(setPodcast, podcastData.someData.id.attributes['im:id']);
  }, [podcastData]);

  const getPodcastEpisodes = useCallback(async () => {
    await itunesService.GetEpisodes(setEpisodes, podcastData.someData.id.attributes['im:id']);
  }, [podcastData]);

  useEffect(() => {
    if (podcast === null) {
      getPodcastDetails();
      getPodcastEpisodes();
    }
  }, [getPodcastDetails, getPodcastEpisodes]);

  useEffect(() => {
    console.log(podcast);
    console.log(episodes);
  }, [podcast, episodes]);

  if (!podcast) {
    return null;
  }

  const handleClickOpen = (ep) => {
    const id = podcastData.someData.id.attributes['im:id'];
    const eid = ep.someData.trackId;
    history.push({ pathname: `/app/podcast/${id}/episode/${eid}`, state: { podcastData, ep } });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
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
          <Card>
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
                key={podcastData.someData.id.attributes['im:id']}
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
          </Card>
        </Box>
        <Divider />
      </Card>
      <Card
        className={clsx(classes.root)}
        style={{ width: '75vw' }}
      >
        <CardHeader
          title="Episodes"
        />
        <Divider />
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell variant="head">
                    <Typography variant="textPrimary" color="textPrimary">
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell variant="head">
                    <Typography variant="textPrimary" color="textPrimary">
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="textPrimary" color="textPrimary">
                      Duration
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {episodes && episodes.results.map((ep) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography onClick={() => handleClickOpen({ someData: ep })}>
                          {ep.trackName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {formatDate(ep.releaseDate)}
                      </TableCell>
                      <TableCell>
                        {formatTime(ep.trackTimeMillis)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Divider />
      </Card>
    </Box>
  );
}

PodcastDetails.propTypes = {
};

export default PodcastDetails;
