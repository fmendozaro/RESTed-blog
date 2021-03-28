'use strict';

import postsAPI from './postsAPI.js';
import loading from "./loading.js";

const postsBody = document.querySelector("#posts-list");
const pastPosts = document.querySelector("#past-posts");
const addFormBtn = document.querySelector("#show-add-form");
const deleteAllBtn = document.querySelector("#delete-all-btn");
const saveBtn = document.querySelector("#add-post-btn");
const editBtn = document.querySelector("#edit-post-btn");
const modalTitle = document.querySelector("#modal-title");
const postForm = document.querySelector("#add-blog-form");
const modals = document.querySelectorAll(".modal")[0];
const postsListDiv = document.querySelector('#posts-list');
let instances;

// initializes all the components used from MaterializeCSS
document.addEventListener('DOMContentLoaded', () => {
    instances = M.Modal.init(modals, {"opacity": 0.85});
    renderPosts();
});
// Start with this function to render the available posts


function renderPosts() {
    modalAction('close');
    loading.show();
    postsAPI.get().then((posts) => {
        postsBody.innerHTML = "";
        pastPosts.innerHTML = "";
        let postsHTML = "";
        let pastPostsHTML = "";

        if(posts.length === 0){
            M.toast({html: 'No posts to show', classes: 'rounded red'})
            loading.hide();
            return;
        }

        M.toast({html: 'Posts loaded successfully', classes: 'rounded green'})
        posts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);

        posts.reverse().forEach(({title, text, timestamp, id}) => {
            let formattedDate = new Date(timestamp).toLocaleDateString(
                'en-us',
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }
            );
            pastPostsHTML += `<tr><td>${formattedDate}</td><td>${title}</td></tr>`;
            postsHTML += `
                        <div class="post" class="row">
                           <h5 class="col s6 left">${title}</h5>
                           <h5 class="col s6 right-align">${formattedDate}</h5>
                           <img width="200" src="https://picsum.photos/200?uuid=${new Date().getTime() + id}" alt="placeholder image" class="hoverable">
                           <div class="col s12">${text}</div>      
                           <div class="action-buttons right-align">
                                <a href="#form-modal" class="edit-btns btn yellow black-text waves-effect modal-trigger" data-dbid=${id}>Edit</a>
                                <a class="delete-btns btn red black-text waves-effect" data-dbid=${id}>Delete</a>
                            </div>
                        </div>`;
            loading.hide();
        });
        postsBody.innerHTML = postsHTML;
        pastPosts.innerHTML = pastPostsHTML;
    }).catch((error) => {
        console.error(error);
        loading.hide();
    });
}

function addOrEdit(e, action) {
    e.preventDefault();
    loading.show();
    let title = document.querySelector("#title").value;
    let blogText = document.querySelector("#blog-text").value;
    let id = document.querySelector("#dbid").value;

    // Creates a new blog post
    if (action === "add") {
        postsAPI.create(title, blogText).then(() => {
            loading.hide();
            renderPosts();
        }).catch((error) => {
            console.error(error);
        });
    } else {
        // Edits an existing post
        postsAPI.update(id, title, blogText).then(() => {
            loading.hide();
            renderPosts();
        }).catch((error) => {
            console.error(error);
        });
    }
}

function modalAction(action){
    let instance = M.Modal.getInstance(document.querySelectorAll(".modal")[0]);
    if(action === 'close'){
        instance.close();
    }else{
        instance.open();
    }
}

function validateForm(){
    let valid = false;
    let message = '';
    document.querySelectorAll('.validate').forEach((el) => {
        valid = el.value.trim() !== '';
        if (valid === false){
            message = 'Fields can\'t be empty';
            return {valid, message};
        }
    })

    return {valid, message};
}

/* Event Listeners */

addFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    postForm.reset();
    modalTitle.innerHTML = "Add a Blog Post";
    saveBtn.classList.remove('hide');
    editBtn.classList.add('hide');
});

saveBtn.addEventListener('click', (e) => {
    addOrEdit(e, "add");
});

editBtn.addEventListener('click', (e) => {
    addOrEdit(e, "edit");
});

deleteAllBtn.addEventListener('click', e => {
    if (confirm('Are you sure?')) {
        postsAPI.destroy().then((response) => {
            console.log(response);
            renderPosts();
        });
    }
});

postsListDiv.addEventListener('click', e => {
    let id = e.target.dataset.dbid;
    if (e.target.classList.contains('edit-btns')) {
        // modals.open();
        modalTitle.innerHTML = "Edit Blog Post";
        saveBtn.classList.add('hide');
        editBtn.classList.remove('hide');
        postsAPI.get(id).then((data) => {
            document.querySelector("#title").value = data.title;
            document.querySelector("#dbid").value = data.id;
            document.querySelector("#blog-text").value = (data.text);
            M.updateTextFields();
        });
    } else if (e.target.classList.contains('delete-btns')) {
        if (confirm('Are you sure?')) {
            postsAPI.destroy(id).then((response) => {
                console.log(response);
                renderPosts();
            });
        }
    }
});