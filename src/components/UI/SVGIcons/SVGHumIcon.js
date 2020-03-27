import React from 'react'

import { ReactComponent as Humidity } from "./SVGImages/Humidity.svg";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

      iconRoot: {
        textAlign: 'center',
        maxWidth: 40,
        maxHeight: 40,
        color: theme.palette.primary,
      }
  }),'SVGHumIcon');

const SVGHumIcon = (props) => {

    const classes = useStyles();

    return (
      <React.Fragment>
          <Humidity className={classes.iconRoot}/>
      </React.Fragment>
    );
}

export default SVGHumIcon