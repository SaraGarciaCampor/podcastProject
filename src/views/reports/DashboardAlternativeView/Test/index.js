import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActionArea,
  Divider,
  Typography,
  makeStyles,
  Grid,
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
  const history = useHistory();
  const [podcasts, setPodcasts] = useState(null);

  const handleClickOpen = (id) => {
    history.push(`/podcast/${id}`);
    console.log(`id:${id}`);
  };

  const getPodcasts = useCallback(async () => {
    await itunesService.GetPodcasts(setPodcasts);
  }, []);

  useEffect(() => {
    if (podcasts === null) {
      getPodcasts();
    }
  }, [getPodcasts, podcasts]);

  if (!podcasts) {
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
      <Box
        display="flex"
        flex-wrap="wrap"
        flexDirection="row"
        p={3}
        minHeight={320}
        width="100%"
      >
        <>
          <Grid
            container
            spacing={2}
          >
            {podcasts.feed.entry.map((label, i) => (
              <Grid item xs={2} sm={2} md={2} xl={2} justify="center" alignItems="center">
                <Card>
                  <CardActionArea onClick={() => handleClickOpen(podcasts.feed.entry[i].id.attributes['im:id'])}>
                    <CardMedia
                      component="img"
                      className={classes.media}
                      style={{
                        width: 'auto',
                        maxHeight: '500px'
                      }}
                      image={podcasts.feed.entry[i]['im:image'][2].label}
                      alt="Image"
                    />
                    <CardContent>
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        key={podcasts.feed.entry[i].id.label}
                      >
                        {podcasts.feed.entry[i]['im:name'].label}
                      </Typography>
                      <br />
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        key={podcasts.feed.entry[i].id.label}
                      >
                        Author:
                        {' '}
                        {podcasts.feed.entry[i]['im:artist'].label}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      </Box>
    </Card>
  );
}

Test.propTypes = {
  className: PropTypes.string
};

export default Test;
