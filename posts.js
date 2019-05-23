module.exports = {
    getPosts(req, res) {
        res.status(200).send(req.store.posts)
    },
    addPost(req, res) {
        let id = req.store.posts.length
        let newPost = {
                name: req.body.name,
                url: req.body.url,
                text: req.body.text,
                comments: []
            }
        req.store.posts.push(newPost)
        res.status(201).send({id: id})
    },
    updatePost(req, res) {
        if (req.body.name) req.store.posts[req.params.postId].name = req.body.name
        if (req.body.url) req.store.posts[req.params.postId].url = req.body.url
        if (req.body.text) req.store.posts[req.params.postId].text = req.body.text
        res.status(200).send(req.store.posts[req.params.postId])
    },
    removePost(req, res) {
        req.store.posts.splice(req.params.postId, 1)
        res.status(204).send()
    }
}




