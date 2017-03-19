import {
  RunResult,
  TestStatus,
  RunStatus
} from 'stryker-api/test_runner';

export default class StrykerLabReporter {

  private runResult: RunResult;
  private passedCount: number;

  start(notebook: any) {
    this.runResult = {
      status: RunStatus.Error,
      tests: [],
      errorMessages: []
    };
  }

  test(test: any) {}

  finalize(notebook: any): RunResult {
    this.runResult.status = RunStatus.Complete;
   
    notebook.tests.forEach((test: any) => {

        const testResult: any = {
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