class BaseMethod {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    
    getPathToHandler() {
        let url = this.req.url;

        let last = url.substr(url.lastIndexOf('/') + 1);
        last = last.charAt(0).toUpperCase() + last.substr(1);
        url = url.substr(0, url.lastIndexOf('/') + 1) + last;
        url = (url === '/' || url.indexOf('.') !== -1)? '/index' : url;

        return `/${this.req.method.toLowerCase()}` + url;
    }
}

module.exports = BaseMethod;