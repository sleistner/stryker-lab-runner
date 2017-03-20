const { EventEmitter } = require('events');
const {
  TestRunner,
  RunResult,
  RunStatus,
  RunnerOptions
} = require('stryker-api/test_runner');
const { InputFile } = require('stryker-api/core');

const { execute } = require('lab');
const StrykerLabReporter = require('./lab-reporter');

module.exports = class LabTestRunner extends EventEmitter {

  constructor(runnerOptions) {
    super();
    this.files = runnerOptions.files;
  }

  purgeFiles() {
    this.files.forEach(f => delete require.cache[f.path]);
  }

  scripts(options) {
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

  run() {
    return new Promise((resolve, fail) => {
      try {
        this.purgeFiles();

        const options = {};
        const scripts = this.scripts(options);
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
      } catch (err) {
        fail(err);
      }
    });

  }
}
