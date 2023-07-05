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
  TextField,
  makeStyles,
  InputAdornment,
  SvgIcon,
  Grid,
} from '@material-ui/core';
import {
  Search as SearchIcon,
} from 'react-feather';
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

function PodcastView({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const [podcasts, setPodcasts] = useState(null);
  const [query, setQuery] = useState('');

  const handleClickOpen = (data) => {
    console.log(data);
    const id = data.someData.id.attributes['im:id'];
    history.push({ pathname: `/app/podcast/${id}`, state: data });
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

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredPodcasts = podcasts.feed.entry.filter((entry) => entry['im:name'].label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
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
          placeholder="Search podcasts"
          variant="outlined"
          value={query}
          onChange={handleQueryChange}
        />
      </Box>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Podcasts" />
        <Divider />
        <Box display="flex" flexWrap="wrap" flexDirection="row" p={3} minHeight={320} width="100%">
          <Grid container spacing={2}>
            {filteredPodcasts.map((entry) => (
              <Grid item xs={2} sm={2} md={2} xl={2} justify="center" alignItems="center" key={entry.id.label}>
                <Card>
                  <CardActionArea onClick={() => handleClickOpen({ someData: entry })}>
                    <CardMedia
                      component="img"
                      className={classes.media}
                      style={{
                        width: 'auto',
                        maxHeight: '500px',
                      }}
                      image={entry['im:image'][2].label}
                      alt="Image"
                    />
                    <CardContent>
                      <Typography variant="h4" color="textPrimary">
                        {entry['im:name'].label}
                      </Typography>
                      <br />
                      <Typography variant="h6" color="textSecondary">
                        Author:
                        {' '}
                        {entry['im:artist'].label}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
    </>
  );
}

PodcastView.propTypes = {
  className: PropTypes.string
};

export default PodcastView;