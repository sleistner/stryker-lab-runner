const {
  RunResult,
  TestStatus,
  RunStatus
} = require('stryker-api/test_runner');

module.exports = class StrykerLabReporter {

  start(notebook) {
    this.runResult = {
      status: RunStatus.Error,
      tests: [],
      errorMessages: []
    };
  }

  test(test) {}

  finalize(notebook) {
    this.runResult.status = RunStatus.Complete;

    notebook.tests.forEach((test) => {

        const testResult = {
            name: test.relativeTitle,
            timeSpentMs: test.duration
        };

        if (test.err) {
          testResult.status = TestStatus.Failed;
          testResult.failureMessages = [test.err.message];

          if (this.runResult.errorMessages) {
            this.runResult.errorMessages.push(test.err.message);
          }
        } else {
          testResult.status = TestStatus.Success;

          this.passedCount++;
        }

        this.runResult.tests.push(testResult);
    });

    return this.runResult;
  }
}
