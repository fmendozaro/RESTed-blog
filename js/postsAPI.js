'use strict';
const apiUrl = 'http://restedblog.herokuapp.com/f_rodriguez/api/';

const get = (id) => {
  let url = (id) ? `${apiUrl}/${id}` : apiUrl;
  return fetch(url)
    .then(response => response.json())
};

const create = (title, text) => {
    return fetch(apiUrl, {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({title, text})
    }).then( (response) => {
        response.json();
    });
};

const update = (id, title, text) => {
    return fetch(`${apiUrl}/${id}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({id, title, text})
    }).then( (response) => {
        response.json();
    });
};

const generateImage = (title) => {
    return fetch(`https://i.picsum.photos/id/724/200/300`)
        .then(movie => movie.json())
};

/* Destroy
* CAUTION!!
* This will delete one blog post if the id is provided or all of them if not after a confirmation is given
*/
const destroy = (id) => {
    let url = (id) ? `${apiUrl}/${id}` : apiUrl;
    return fetch(url, {
        headers: {
            "content-type": "application/json"
        },
        method: "DELETE"
    }).then( (response) => {
        response.json();
    }).catch( (error) => console.log(error));
};

export default {create, update, destroy, get, generateImage};