import axios from 'axios';

import {
  FETCH_JOBS,
} from './types';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import results from './results';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUERY_PARAMS =  {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  // 1 latlong each job
  latlong: 1,
  // in miles
  radius: 10,
  // query
  q: 'javascript',
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`
};

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    // let zip = await reverseGeocode(region);
    // const url = buildJobsUrl(zip);
    // let { data } = await axios.get(url);
    // will use this mock data since indeed api didn't allow us access
    let data = {};
    data["results"] = results;
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (err) {
    console.log(err);
  }
};
