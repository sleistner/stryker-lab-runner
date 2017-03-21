const { TestRunnerFactory } = require('stryker-api/test_runner');
const { TestFrameworkFactory } = require('stryker-api/test_framework');
const LabTestRunner = require('./lab-test-runner');
const LabTestFramework = require('./lab-test-framework');

TestRunnerFactory.instance().register('lab', LabTestRunner);
TestFrameworkFactory.instance().register('lab', LabTestFramework);
