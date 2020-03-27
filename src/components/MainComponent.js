import React from 'react';


import MainLayout from '../components/UI/MainLayout';
import SyncLoader from 'react-spinners/SyncLoader';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import Header from '../components/UI/Header';


const MainComponent = (props) => {
    if (props.hasData) {
        return (
          <div>
            <Grid container>
              <Grid item sm={12}>
                <Header
                  devices={props.devices}
                />
              </Grid>
            </Grid>
            <MainLayout
              metric={props.metric}
              history={props.history}
              devices={props.devices}
            />
          </div>
        );
      } else {
        return (
          <React.Fragment>
              <Box>
                <Typography variant="h4">
                  En attente d'une mesure
                </Typography>
              </Box>
              <SyncLoader 
                color='#ef702b'
                size={30}
                margin={5}
              />
          </React.Fragment>
        )
       }
}

export default MainComponent
