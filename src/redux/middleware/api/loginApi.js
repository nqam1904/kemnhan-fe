import { API_URL } from '../../../config/setting';

export function loginApi(input) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(input),
        // redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => {
            // console.log('ApiNew:', result);
            return result;
        }).catch(error => console.log('error', error));

}
