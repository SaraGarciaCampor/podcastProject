import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import { itunesService } from 'src/services/itunesService';
import Header from './Header';
import PodcastDetails from './EpisodeDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function DetailsView() {
  const classes = useStyles();
  const [podcasts, setPodcasts] = useState(null);


  const getPodcasts = useCallback(async () => {
    await itunesService.GetPodcasts(setPodcasts);
  }, []);

  useEffect(() => {
    if (podcasts === null) {
      getPodcasts();
    }
  }, [getPodcasts, podcasts]);

  return (
    <Page
      className={classes.root}
      title="Podcast Details"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header />
        <br />
        <Grid
          container
          spacing={3}
        >
          <PodcastDetails />
        </Grid>
      </Container>
    </Page>
  );
}

DetailsView.propTypes = {
};

export default DetailsView;
