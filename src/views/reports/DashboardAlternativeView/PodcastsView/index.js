import React, { useEffect, useCallback, useState } from 'react';
import {
  Box,
  Container,
  // makeStyles
} from '@material-ui/core';
import { itunesService } from 'src/services/itunesService';
import Typography from 'src/theme/typography';
import LoadingScreen from 'src/components/LoadingScreen';

/* const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
})); */

const PodcastsView = () => {
  // const classes = useStyles();
  const [loading] = useState(null);
  const [podcasts, setPodcasts] = useState(null);

  const getPodcasts = useCallback(async () => {
    await itunesService.GetPodcasts(setPodcasts);
  }, []);

  useEffect(() => {
    if (podcasts === null) {
      getPodcasts();
    }
  }, [podcasts, getPodcasts]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={false}>
          <Box mt={3}>
            <Typography>Hola</Typography>
          </Box>
        </Container>
      )}
    </>
  );
};

PodcastsView.propTypes = {
};

export default PodcastsView;
