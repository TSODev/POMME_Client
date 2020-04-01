import React ,{useEffect} from 'react'

const Widget = (props) => {

 useEffect(() => {
    console.log('[DEVICELAYOUT]-[CAPABILITY]', props.device,props.capability)

 }, [props.device, props.capability])

    const TempWidget = (props) => {
        return(
            <React.Fragment>
                <p>TEMPERATURE</p>
            </React.Fragment>
        )
    }
    const HumWidget = (props) => {
        return(
            <React.Fragment>
                <p>HUMIDITY</p>
            </React.Fragment>
        )
    }
    const PresWidget = (props) => {
        return(
            <React.Fragment>
                <p>PRESSURE</p>
            </React.Fragment>
        )
    }

    return (
        <div>
            {
            (props.capability.name === 'temperature' ? <TempWidget /> :
            (props.capability.name === 'humidity' ? <HumWidget /> :
            (props.capability.name === 'pressure' ? <PresWidget /> :
            null)))
            }
        </div>
    )
}

export default Widget
