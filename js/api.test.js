global.fetch = require("node-fetch");
import postAPI from "./postsAPI";

test('get all posts', () => {
    return postAPI.get().then( (posts) => {
        console.log({posts});
        expect(posts.length).toBeGreaterThan(0);
    });
});