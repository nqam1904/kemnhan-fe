import { API_URL } from '../../../config/setting';

export function categoryApi(data) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    return fetch(`${API_URL}/categories`, {
        method: 'GET',
        headers: myHeaders,
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            
            return result;
        })
        .catch((_error) => {});
}
