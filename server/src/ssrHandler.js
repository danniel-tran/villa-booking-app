const path = require('path');
const fs = require('fs');

// Import hàm render từ server bundle (đã được build)
const serverBundle = require('../../client/dist/server.js');
const render = serverBundle.render;

const indexFile = path.resolve(__dirname, '../../client/dist/index.html');

module.exports = (req, res) => {
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        const context = {};
        const appHtml = render(req.url, context);

        if (context.url) {
            return res.redirect(301, context.url);
        }

        const html = data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
        res.send(html);
    });
};