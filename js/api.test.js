global.fetch = require("node-fetch");
import postAPI from "./postsAPI";

test('create a post', () => {
    return postAPI.create('test-title', 'test-body').then( (createdPost) => {
        expect(createdPost).not.toBeNull();
        expect(createdPost.id).toBeGreaterThan(0);
        expect(createdPost.title).toMatch('test-title');
        expect(createdPost.text).toMatch('test-body');
    });
});

test('get all posts', () => {
    return postAPI.get().then( (posts) => {
        expect(posts.length).toBeGreaterThan(0);
    });
});