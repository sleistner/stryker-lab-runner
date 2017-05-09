const { TestRunnerFactory } = require('stryker-api/test_runner');
const LabTestRunner = require('./lab-test-runner');

TestRunnerFactory.instance().register('lab', LabTestRunner);
