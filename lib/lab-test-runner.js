const { EventEmitter } = require('events');
const { RunStatus } = require('stryker-api/test_runner');
const { execute } = require('lab');

const StrykerLabReporter = require('./lab-reporter');

module.exports = class LabTestRunner extends EventEmitter {

    constructor(runnerOptions) {
        super();
        this.files = runnerOptions.files;
    }

    run() {
        return new Promise((resolve, reject) => {
            try {
                this.purgeFiles();
                this.report(resolve);
            } catch (err) {
                reject(err);
            }
        });
    }

    report(resolve) {

        const options = {};
        const scripts = this.scripts;
        const reporter = new StrykerLabReporter();

        try {
            execute(scripts, options, reporter, (err, notebook) => {
                if (err) {
                    throw err;
                }
                const result = reporter.finalize(notebook);
                resolve(result);
            });
        } catch (err) {
            resolve({
                status: RunStatus.Error,
                tests: [],
                errorMessages: [err]
            });
        }
    }

    purgeFiles() {
        this.files.forEach(f => delete require.cache[f.path]);
    }

    get scripts() {
        const files = this.files.filter(file => file.included).map(f => f.path);
        const scripts = [];

        files.forEach((file) => {

            const pkg = require(file);
            if (pkg.lab && pkg.lab._root) {
                scripts.push(pkg.lab);
            }
        });

        return scripts;
    }

};
