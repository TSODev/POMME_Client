import React, {useState, useEffect} from 'react'

import SENSORS from '../../utilities/sensors';

import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const SensorCapabilities = (props) => {

    const [capabilities, setcapabilities] = useState({})
    useEffect(() => {
        console.log('[CAPABILITIES]', props.sensor.type)
        setcapabilities(SENSORS.models.filter(s => s.id === props.sensor.type)[0])
    },[props.sensor.type])

    return (

        SENSORS.capabilities.map((c, index) => {
            return (
                <React.Fragment key={index}>

                    <FormControlLabel control={
                    <Switch
                        checked={capabilities[c] || false}
                        disabled={!capabilities[c]}
                        name={c}
                        color="primary"
                    />
                    }
                    label={c}
                    >
                    </FormControlLabel>
               
            </React.Fragment>
        )       
        })
    )


}

export default SensorCapabilities
