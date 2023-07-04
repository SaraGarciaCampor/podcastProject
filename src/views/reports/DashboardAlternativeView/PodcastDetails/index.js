import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import {
  Search as SearchIcon,
} from 'react-feather';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import { itunesService } from 'src/services/itunesService';
import Header from './Header';
import PodcastDetails from './PodcastDetails';

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
        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            lg={12}
            xs={12}
          >
            <Box mb={2} minHeight={56} display="flex" alignItems="center">
              <TextField
                className={classes.queryField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search episodes"
                variant="outlined"
              />
            </Box>
            <PodcastDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

DetailsView.propTypes = {
  className: PropTypes.string
};

export default DetailsView;
