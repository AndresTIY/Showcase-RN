import axios from 'axios';

const endpoint =
  'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1';
const getItemEndpoint =
  'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

const endPointWithImage =
  'https://collectionapi.metmuseum.org/public/collection/v1/search?departmentIds=3|9&hasImages=true&q=%22%22';

const getEndpointData = async () => {
  const result = await axios.get(endpoint);
  return result;
};

const getListOfObjectIds = async () => {
  const result = await axios.get(endPointWithImage);
  return result;
};
const getItemWithObjectId = async (objectId: number) => {
  const result = await axios.get(`${getItemEndpoint}${objectId}`);
  return result;
};

export {getEndpointData, endpoint, getListOfObjectIds, getItemWithObjectId};
