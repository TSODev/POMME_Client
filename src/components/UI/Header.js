import React, {useEffect, useState} from 'react'

import socket from '../../utilities/socketConnection';

import HistorySelector from './HistorySelector';
import Heart from './Heart';
import Sensor from './Sensor'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        height: 40,
        backgroundColor: theme.palette.background.paper,
        textAlign: 'left',
      },
  }),'Header');


const Header = (props) => {

    const classes = useStyles()

    const [len, setlen] = useState(3600)    
    const [nb, setnb] = useState(1)

    useEffect(() => {
        console.log('[HEADER]');
        const id =localStorage.getItem('deviceId')
        socket.emit('historyRequest', {len: nb * len, id: id});  //      console.log('History Changed !',value);
    }, [nb, len])

    const onHistoryChange = (nb, len) => {
        setlen(len);
        setnb(nb);
//        socket.emit('historyRequest', {len: nb * len});  //      console.log('History Changed !',value);
    }


    return (
        <React.Fragment>
        <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={1}>

              <Grid item xs={8} sm={10}>
                <HistorySelector onChange={onHistoryChange} history={{nb, len}}/>
              </Grid>
              {/* <Grid item xs={1} sm={1}>
                <Heart show={props.pulse} />
              </Grid>               */}
              <Grid item xs={2} sm={1}>
                <Sensor value={props.sensor}/>
              </Grid>

        </Grid>
    </React.Fragment>
    )
}

export default Header
