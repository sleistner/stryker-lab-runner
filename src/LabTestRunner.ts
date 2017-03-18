import { EventEmitter } from 'events';
import {
  TestRunner,
  RunResult,
  RunStatus,
  RunnerOptions
} from 'stryker-api/test_runner';
import { InputFile } from 'stryker-api/core';

const { execute } = require('lab');
import StrykerLabReporter from './StrykerLabReporter';

export default class LabTestRunner extends EventEmitter implements TestRunner {

  private files: InputFile[];

  constructor(runnerOptions: RunnerOptions) {
    super();
    this.files = runnerOptions.files;
  }

  private purgeFiles() {
    this.files.forEach(f => delete require.cache[f.path]);
  }

  private scripts(options: any): Array<any> {
    const files = this.files.filter(file => file.included).map(f => f.path);
    const scripts: any = [];
    
    files.forEach((file) => {

      const pkg = require(file);
      if (pkg.lab && pkg.lab._root) {
        scripts.push(pkg.lab);
      }
    });

    return scripts;
  }

  run(): Promise<RunResult> {
    return new Promise<RunResult>((resolve, fail) => {
      try {
        this.purgeFiles();

        const options = {};
        const scripts = this.scripts(options);
        const reporter = new StrykerLabReporter();

        try {
          execute(scripts, options, reporter, (err: Error, notebook: any) => {
            if (err) {
              throw err;
            }
            const result: RunResult = reporter.finalize(notebook);
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