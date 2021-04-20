'use strict';
global.fetch = require("node-fetch");
import postAPI from "./postsAPI";

let testPost;

beforeAll(() => {
    // TODO: Check for timeouts, the api goes to sleep after being idle for a while
    postAPI.create('test-title', 'test-body').then( (createdPost) => {
        testPost = createdPost;
    });
});

test('create a post', () => {
    return postAPI.create('newest-test-title', 'newest-test-body').then( (createdPost) => {
        expect(createdPost).not.toBeNull();
        expect(createdPost.id).toBeGreaterThan(0);
        expect(createdPost.title).toMatch('newest-test-title');
        expect(createdPost.text).toMatch('newest-test-body');
    });
});

test('get all posts', () => {
    return postAPI.get().then( (posts) => {
        expect(posts.length).toBeGreaterThan(0);
    });
});

test('get a post', () => {
    return postAPI.get(testPost.id).then( retrievedPost => {
        expect(retrievedPost).toBeDefined();
        expect(retrievedPost.id).toBe(testPost.id);
    });
});

test('edit a post', () => {
    return postAPI.update(testPost.id,'edited-test-title', 'edited-test-body').then( (updatedPostPost) => {
        expect(updatedPostPost).not.toBeNull();
        expect(updatedPostPost.id).toBe(testPost.id);
        expect(updatedPostPost.title).toMatch('edited-test-title');
        expect(updatedPostPost.text).toMatch('edited-test-body');
    });
});