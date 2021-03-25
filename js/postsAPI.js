const apiUrl = 'http://restedblog.herokuapp.com/f_rodriguez/api/';

const get = (id) => {
  let url = (id) ? `${apiUrl}/${id}` : apiUrl;
  return fetch(url)
    .then(response => response.json())
};

const create = (title, rating) => {
    return fetch("/api/movies", {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({title, rating})
    }).then( (response) => {
        response.json();
    });
};

const update = (id, title, rating) => {
    return fetch(`/api/movies/${id}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({title, rating})
    }).then( (response) => {
        response.json();
    });
};

const generateImage = (title) => {
    return fetch(`https://i.picsum.photos/id/724/200/300`)
        .then(movie => movie.json())
};

const destroy = (id) => {
    return fetch(`/api/movies/${id}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "DELETE"
    }).then( (response) => {
        response.json();
    }).catch( (error) => console.log(error));
};

export default {create, update, destroy, get, generateImage};