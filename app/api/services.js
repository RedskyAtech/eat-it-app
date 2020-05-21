import * as Url from '../constants/urls'
import { alert, Alert, } from 'react-native';


export const get = async (url, token) => {
    var headers

    if (token == '' || token == null || token == undefined) {
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json"

        }
    }
    else {
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-AUTHTOKEN": token
        }
    }
    const completeUrl = Url.BASE_URL + url
    console.log('completeUrl', completeUrl)
    try {
        const response = await fetch(completeUrl, {
            method: 'GET',
            headers
        })

        let res = await response.json();

        if (res !== null) {
            if (res !== null && Object.keys(res).length !== 0) {
                if (res.success === true) {
                    return res;
                }
            }
            console.log('get::res', res)
            Alert.alert('', res.error)
        }
    } catch (err) {
        Alert.alert('', " Somthing Went Wrong")
        console.log('err', err.message);
        // return err
    }
};
export const upLoad = async (url, token, body) => {
    var headers

    if (token == '' || token == null || token == undefined) {
        headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',

        }
    }
    else {
        headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            "X-AUTHTOKEN": token
        }
    }


    const completeUrl = Url.BASE_URL + url
    console.log('completeUrl', completeUrl)
    try {

        const response = await fetch(completeUrl, {
            method: 'POST',
            headers,
            body: body
        });

        let res = await response.json();

        if (res !== null) {
            if (res !== null && Object.keys(res).length !== 0) {
                if (res.statusCode === 200) {
                    console.log('res', res)
                    return res;
                }
            }
            console.log('res', res)
            Alert.alert('', res.error)
        }
    } catch (err) {
        Alert.alert('', " Somthing Went Wrong")
        console.log('err', err.message);

    }

};

export const post = async (url, token, body) => {
    var headers
    const completeUrl = Url.BASE_URL + url
    if (token == '' || token == null || token == undefined) {
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json"

        }
    }
    else {
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-AUTHTOKEN": token
        }
    }
    let data = JSON.stringify(body)
    try {
        const response = await fetch(completeUrl, {
            method: 'POST',
            headers,
            body: data
        });

        let res = await response.json();
        if (res !== null) {
            if (res !== null && Object.keys(res).length !== 0) {

                if (res.success === true) {
                    return res;
                } else if (res.success === false) {
                    if (res.non_field_errors && res.non_field_errors.length) {
                        Alert.alert('', res.non_field_errors[0])
                        console.log('post::res.non_field_errors[0]', res.non_field_errors[0])
                        return err = {
                            err: res.non_field_errors[0]
                        }
                    } else if (res.id_number && res.id_number.length) {
                        Alert.alert('', res.id_number[0])
                        console.log('post::res.id_number[0]', res.id_number[0])
                        return err = {
                            err: res.id_number[0]
                        }
                    } 
                    else if (res.policy_number && res.policy_number.length) {
                        Alert.alert('ERROR','Policy number should be unique.')
                        console.log('post::res.policy_number[0]', res.policy_number[0])
                        return err = {
                            err: res.policy_number[0]
                        }
                    }
                    else if (res.username && res.username.length) {
                        Alert.alert('INVALID',res.username[0])
                        console.log('post::res.username[0]', res.username[0])
                        return err = {
                            err: res.username[0]
                        }
                    }
                    else {
                        return res

                    }
                }
            }
        }
    }

    catch (err) {
        Alert.alert('', " Somthing Went Wrong")
        console.log("post::errerrerrerrerrerrerrerrerrerr", err)
    }
};

export const put = async (url, token, body) => {
    var headers

    if (token == '' || token == null || token == undefined) {
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json"

        }
    }
    else {
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-AUTHTOKEN": token
        }
    }
    const completeUrl = Url.BASE_URL + url
    console.log('completeUrl', completeUrl)
    let data = JSON.stringify(body)
    try {
        const response = await fetch(completeUrl, {
            method: 'PUT',
            headers,
            body: data
        });

        let res = await response.json();

        if (res !== null) {
            if (res !== null && Object.keys(res).length !== 0) {
                if (res.statusCode === 200) {
                    console.log('res', res)
                    return res;
                }
            }
            console.log('res', res)
            Alert.alert('', res.error)
        }
    } catch (err) {
        Alert.alert('', " Somthing Went Wrong")
        console.log('err', err.message);

    }
}