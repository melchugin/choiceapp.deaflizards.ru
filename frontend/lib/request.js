import axios from 'axios';
import { app } from '../config';

const getData = async ( path ) => {
    try {
        const response = await axios.get( `${app.protocol}://${app.hostname}:${app.port}${path}` );
        return response.data;
    } catch(e) {
        console.error(e);
    }
};

const postData = async ( path, param ) => {
    try {
        const response = await axios.post( `${app.protocol}://${app.hostname}:${app.port}${path}`, {...param} );
        return response.data;
    } catch(e) {
        console.error(e);
    }
};

export {getData, postData};
