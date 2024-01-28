import { OpenAPI } from '../generated/client/';
import { APIClient } from '../generated/client/APIClient';
const c = new APIClient()

const getToken = async () => {
    // TODO: (@jasonappah) implement this. should pull from whatever state management solution i set up
    return 'SOME_TOKEN';
};



OpenAPI.TOKEN = getToken;

