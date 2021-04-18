'use strict';
global.fetch = require("node-fetch");
import postAPI from "./postsAPI";

let tempId = 0;

test('create a post', () => {
    return postAPI.create('test-title', 'test-body').then( (createdPost) => {
        expect(createdPost).not.toBeNull();
        expect(createdPost.id).toBeGreaterThan(0);
        tempId = createdPost.id;
        expect(createdPost.title).toMatch('test-title');
        expect(createdPost.text).toMatch('test-body');
    });
});

test('get all posts', () => {
    return postAPI.get().then( (posts) => {
        expect(posts.length).toBeGreaterThan(0);
    });
});

test('get a post', () => {
    return postAPI.get(tempId).then( post => {
        expect(post).toBeDefined();
        expect(post.id).toBe(tempId);
    });
});