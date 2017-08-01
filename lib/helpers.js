exports.imagePath = function () {
    return '/assets/images/' + this.pageTitle.replace(/\s/g, '').toLowerCase();
};

exports.guidelines = function () {
    return 'guidelines' + '/' + this.pageTitle.replace(/\s/g, '').toLowerCase();
},
exports.screenshots = function (screenshots) {
        return 'screenshots' + '/' + this.pageTitle.replace(/\s/g, '').toLowerCase();
},
exports.examples = function (examples) {
        return 'examples' + '/' + this.pageTitle.replace(/\s/g, '').toLowerCase();
}