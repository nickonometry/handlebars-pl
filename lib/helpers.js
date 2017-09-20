exports.imagePath = function () {
    return '/assets/images/' + this.partialVar.replace(/\s/g, '').toLowerCase();
};

exports.guidelines = function () {
    return 'guidelines' + '/' + this.partialVar.replace(/\s/g, '').toLowerCase();
},
exports.screenshots = function (screenshots) {
        return 'screenshots' + '/' + this.partialVar.replace(/\s/g, '').toLowerCase();
},
exports.examples = function (examples) {
        return 'examples' + '/' + this.partialVar.replace(/\s/g, '').toLowerCase();
}