const BaseRoute = require(appRoot + '/routing/BaseRoute');
const formidable = require('formidable');
const fs = require('fs');

class UserPhotoUploadRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }

    async handle() {
        try {
            const form = new formidable.IncomingForm();

            form.parse(this.req, (err, fields, files) => {
                this.params.id = fields.id;
                this.params.role = fields.role;

                const fileName = files['uploads[]'].name;
                this.onFileUploaded(files['uploads[]'].path, fileName.slice(fileName.indexOf('.'), fileName.length));
            });
        } catch (err) {
            this.core.log.error('UserPhotoUploadRoute error', err);
            this.complete(null, err, 'UserPhotoUploadRoute error');
        }
    }

    onFileUploaded(path, extension, fields) {
        if (!this.params.id || !this.params.role)
            return this.complete(null, {error: 'Params', message: 'Not all fields!'}, 'UserPhotoUploadRoute error')

        console.log(this.params, extension);
        const filePath = `${this.params.id}${extension}`;

        fs.createReadStream(path)
            .pipe(fs.createWriteStream(`./frontend/dist/assets/data/photo/${this.params.role}/` + filePath));

        fs.createReadStream(path)
            .pipe(fs.createWriteStream(`./frontend/src/assets/data/photo/${this.params.role}/` + filePath));

        this.complete(true);
    }
}

module.exports = UserPhotoUploadRoute;
