import React from 'react';
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
import Page from 'src/components/Page';
import Test from './Test';
import Header from './Header';

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

function DashboardAlternativeView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
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
                placeholder="Search podcasts"
                variant="outlined"
              />
            </Box>
            <Test />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAlternativeView;
