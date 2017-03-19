import { TestRunnerFactory } from 'stryker-api/test_runner';
import { TestFrameworkFactory } from 'stryker-api/test_framework';
import LabTestRunner from './lab-test-runner';
import LabTestFramework from './lab-test-framework';

TestRunnerFactory.instance().register('lab', LabTestRunner);
TestFrameworkFactory.instance().register('lab', LabTestFramework);