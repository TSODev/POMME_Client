import * as actions from '../actionTypes'

const getHistory = (device) => {
    console.log('[ACTION]-GetHistory', device)
    return {
        type: actions.GET_HISTORY_DATA,
        data: device
    }
}

export const getHistoryByDevice = (device) => {
    return(dispatch => {
        dispatch(getHistory(device))
    })
}