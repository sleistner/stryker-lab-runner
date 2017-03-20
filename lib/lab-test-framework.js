const {
    TestFramework,
    TestFrameworkSettings
} = require('stryker-api/test_framework');

module.exports = class LabTestFramework {

    constructor(settings) {
        this.settings = settings;
    }

    beforeEach(codeFragment) {
        return '';
    }

    afterEach(codeFragment) {
        return '';
    }

    filter(ids) {
        return '';
    }
}
