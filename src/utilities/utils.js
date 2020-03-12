import * as _ from 'lodash';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
     } ;
};

export const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1);

export const removeStringFromStart = (fullstring, remove) => fullstring.replace(remove,"");

export const fullname = (firstname, lastname) => {
    const first = capitalize(firstname);
    const last = capitalize(lastname);
    return first.concat(' ').concat(last)
    }


export const buildAxiosErrorMessage= (error) => {
    let message = error.message;
    if (error.message.response !== undefined) {
        message = message + ' : ' + error.message.response.data;
//        message.concat(" : ").concat(error.message.response.data);
    }
    return message;
}