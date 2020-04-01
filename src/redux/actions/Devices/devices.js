import * as actions from '../actionTypes'
import axios from '../../../axios'

const deviceAdd = (device) => {
    return {
        type: actions.NEW_DEVICE,
        data: device
    }
}

const deviceLoadStart = (device) => {
    return {
        type: actions.LOAD_DEVICE_START,
        data: device
    }
}
const deviceLoadSuccess = (data) => {
    return {
        type: actions.LOAD_DEVICE_SUCCESS,
        data: data
    }
}
const deviceLoadFail = (error) => {
    return {
        type: actions.LOAD_DEVICE_FAIL,
        data: error
    }
}

const deviceLoad = (deviceId) => {
    console.log('[ACTION]-LoadDevice', deviceId)
    return (dispatch => {
        dispatch(deviceLoadStart(deviceId))
        axios
          .get("/sensor?Id=" + deviceId)
          .then(function(response) {
            console.log(response);
            dispatch(deviceLoadSuccess(response.data))
          })
          .catch(function(error) {
            console.log(error);
            dispatch(deviceLoadFail(error))
          });
    })
}



const deviceUpdateStart = (device,alias) => {
    return {
        type: actions.UPDATE_DEVICE_START,
        data: {device, alias}
    }
}
const deviceUpdateSuccess = (id, data) => {
    return {
        type: actions.UPDATE_DEVICE_SUCCESS,
        data: {id, devices: data}
    }
}
const deviceUpdateFail = (error) => {
    return {
        type: actions.UPDATE_DEVICE_FAIL,
        data: error
    }
}

const deviceUpdate = (device, alias) => {
    console.log('[ACTION]-UpdateDevice', device, alias)
    return (dispatch => {
        dispatch(deviceUpdateStart(device, alias))
        axios
          .put("/update?Id=" + device.id, {
            isNew: false,
            id: device.id,
            alias: alias,
            connect: device.connect,
            type: device.type,
            sensor: device.capabilities
          })
          .then(function(response) {
            console.log(response);
            dispatch(deviceUpdateSuccess(device.id, response.data))
          })
          .catch(function(error) {
            console.log(error);
            dispatch(deviceUpdateFail(error))
          });
    })
}

export const addDevice = (device) => {
    return(dispatch => {
        dispatch(deviceAdd(device))
    })
}

export const updateDevice = (device, alias) => {
    return (dispatch => {
        dispatch(deviceUpdate(device, alias))
    })
}

export const loadDevice = (deviceId) => {
    return (dispatch => {
        dispatch(deviceLoad(deviceId))
    })
}