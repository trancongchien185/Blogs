const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type == 'CommentCreared') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postID: data.postId,
                status,
                content: data.content
            }
        });
    }

    res.send({});
});

app.prependOnceListener(4003, () => {
    console.log('Listening on 4003')
});