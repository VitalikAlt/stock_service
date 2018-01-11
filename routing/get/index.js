const fs = require('fs');
const BaseRoute = require(appRoot + '/routing/BaseRoute');

class IndexRoute extends BaseRoute{
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    handle() {
        let file, path = (this.req.url === '/')? '/index.html' : this.req.url;

        if (path.indexOf('?') !== -1)
          path = path.slice(0, path.indexOf('?'));

        try {
            file = fs.readFileSync(`./frontend/dist/${path}`);
        } catch (err) {
            return this.sendNoResponse();
        }

        this.res.writeHeader(200);
        this.res.write(file);
        this.res.end();
    }

    sendNoResponse() {
        this.res.writeHeader(404, {"Content-Type": "text/html"});
        this.res.write('');
        return this.res.end();
    }
}

module.exports = IndexRoute;
