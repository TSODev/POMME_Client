import React, {useRef, useState, useEffect} from 'react'

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        height: 60,
        backgroundColor: theme.palette.background.paper,
        textAlign: 'left',
      },
    formControlinput: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
    input: {
        margin: theme.spacing(1),
    }
  }),'HistorySelector');

const HistorySelector = (props) => {

    const classes = useStyles();

//    const selectedHistory = 0;

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    const [len, setlen] = useState(props.history.len)
    const [nb, setnb] = useState(props.history.nb)
//    const [history, sethistory] = useState({nb: 1, len: 3600})

//     useEffect(() => {
//         console.log('[HISTORY]', props.history);
// //      setLabelWidth(inputLabel.current.offsetWidth);
//       setlen(props.history.len);
//       setnb(props.history.nb)
//     }, [props.history]);


    const changeHistoryNbHandler = (event) => {
        const selectednb = event.target.value;
        setnb(selectednb)
        if (selectednb !== '') props.onChange(selectednb, len)
    }
    const changeHistoryDurationHandler = (event) => {
//        console.log(event.target.value);
        setlen(event.target.value);
       props.onChange(nb, event.target.value)
    }

    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={1} >
            <Grid item xs={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                    id="outlined-number"
                    label="#"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={nb}
                    variant="outlined"
                    onChange={changeHistoryNbHandler}
                />
                </FormControl>
            </Grid>
            <Grid item xs={9}>
                <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    labelId="history-label"
                    id="history-select-outlined"
                    value={len}
                    onChange={changeHistoryDurationHandler}
                    labelWidth={labelWidth}
                >
                    <MenuItem value={60}>Minute(s)</MenuItem>
                    <MenuItem value={3600}>
                    <em>Heure(s)</em>
                    </MenuItem>
                    <MenuItem value={86400}>Jour(s)</MenuItem>
                    <MenuItem value={604800}>Semaine(s)</MenuItem>
                </Select>
                </FormControl>
            </Grid>
        </Grid>

      </div>
    );
}

export default HistorySelector
