const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

const posts = require("./routes/posts")
const comments = require("./routes/comments")

const port = 3000

let store = {
  posts: [
    {name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    comments: [
      'Cruel…..var { house, mouse} = No type optimization at all',
      'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
      '(p1,p2)=>{ … } ,i understand this ,thank you !'
    ]
    }
  ]
}

const storeMiddleware = (request, response, next) => {
    request.store = store
    next()
}

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(storeMiddleware)

app.get('/posts', posts.getPosts)
app.post('/posts', posts.addPost)
app.put('/posts/:postId', posts.updatePost)
app.delete('/posts/:postId', posts.removePost)
app.get('/posts/:postId/comments', comments.getComments)
app.post('/posts/:postId/comments', comments.addComment)
app.put('/posts/:postId/comments/:commentId', comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', comments.removeComment)

app.listen(port)


// {"name": "title1", "url": "www.jax.com", "text": "khdfksdhkf"}
//{"name": "title1", "url": "www.jax.com", "text": "khdfksdhkf", "comments": ['', '', '']}
// {"comment": "test comment1"}




