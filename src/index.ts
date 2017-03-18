import { TestRunnerFactory } from 'stryker-api/test_runner';
import { TestFrameworkFactory } from 'stryker-api/test_framework';
import LabTestRunner from './LabTestRunner';
import LabTestFramework from './LabTestFramework';

TestRunnerFactory.instance().register('lab', LabTestRunner);
TestFrameworkFactory.instance().register('lab', LabTestFramework);