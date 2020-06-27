import * as Url from '../constants/urls';

export const postDataApi = (url, body, token) => {
  let headers;
  let completeUrl = Url.BASE_URL + url;

  if (token == null || token == undefined || token == '') {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  } else {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    };
  }
  let data = JSON.stringify(body);
  return new Promise((resolve, reject) => {
    fetch(completeUrl, {
      method: 'POST',
      headers,
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        console.log('Post response:', response);
        if (response != null) {
          if (response != null && Object.keys(response).length !== 0) {
            if (response.statusCode === 200) {
              resolve(response);
            } else {
              reject(response);
            }
          }
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
        console.log('postAPIError', error);
      });
  });
};

export const getDataApi = (url, token) => {
  let headers;
  let completeUrl = Url.BASE_URL + url;

  if (token == null || token == undefined || token == '') {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  } else {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    };
  }
  return new Promise((resolve, reject) => {
    fetch(completeUrl, {
      method: 'GET',
      headers,
    })
      .then(response => response.json())
      .then(response => {
        // console.log('Get Api data response', response);
        if (response !== null) {
          let data = response;
          if (data !== null && Object.keys(data).length !== 0) {
            if (data.statusCode === 200) {
              resolve(data);
            }
          }
        } else {
          reject(data);
        }
      })
      .catch(error => {
        reject(error);
        console.log('GEt Api data error', error);
      });
  });
};

export const putDataApi = (url, body, authToken) => {
  let completeUrl = Url.BASE_URL + url;
  let data = JSON.stringify(body);

  return new Promise((resolve, reject) => {
    fetch(completeUrl, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': authToken,
      },
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        console.log('Put Api data response', response);
        if (response !== null) {
          let data = response;
          if (data !== null && Object.keys(data).length !== 0) {
            if (data.statusCode === 200 || data.statusCode === 303) {
              resolve(data);
            } else {
              reject(response);
            }
          }
        } else {
          reject(data);
        }
      })
      .catch(error => {
        reject(error);
        console.log('putAPIerror', error);
      });
  });
};

export const uploadImageApi = (url, body, headers) => {
  let completeUrl = Url.BASE_URL + url;

  return new Promise((resolve, reject) => {
    fetch(completeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      body: body,
    })
      .then(response => response.json())
      .then(response => {
        console.log('Post Api data response', response);
        if (response !== null) {
          let data = response;
          if (data !== null && Object.keys(data).length !== 0) {
            if (data.statusCode === 200 || data.statusCode === 303) {
              console.log('in');
              resolve(data);
            }
          }
        } else {
          reject(data);
        }
      })
      .catch(error => {
        reject(error);
        console.log('imageUploadAPIError', error);
      });
  });
};

export const loginApi = async (url, body) => {
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const completeUrl = Url.BASE_URL + url;
  let data = JSON.stringify(body);
  try {
    const response = await fetch(completeUrl, {
      method: 'POST',
      headers,
      body: data,
    });
    let res = await response.json();
    if (res !== null) {
      if (res !== null && Object.keys(res).length !== 0) {
        if (res.success === true) {
          return res;
        } else if (res.success === false) {
          console.log('ressss', res);
          return res;
        } else {
          console.log('ressss lastttt', res);
          return res;
        }
      }
    }
  } catch (err) {
    alert('', ' Somthing Went Wrong');
    console.log('post::errerrerrerrerrerrerrerrerrerr', err);
  }
};
