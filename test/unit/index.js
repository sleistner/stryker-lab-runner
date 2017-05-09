const sinon = require('sinon');
const path = require('path');

const { TestRunnerFactory } = require('stryker-api/test_runner');
const { ConfigWriterFactory } = require('stryker-api/config');
const { ReporterFactory } = require('stryker-api/report');

const LabTestRunner = require('../../lib/lab-test-runner');

const Lab = require('lab');
const lab = exports.lab = Lab.script();

const {
    describe,
    it,
    beforeEach,
    afterEach
} = lab;

describe('index', () => {

    const suite = {};

    const mockFactory = () => ({ register: sinon.stub() });

    beforeEach((done) => {
        suite.sandbox = sinon.sandbox.create();
        suite.testRunnerFactoryMock = mockFactory();
        suite.reporterFactoryMock = mockFactory();
        suite.configWriterFactoryMock = mockFactory();

        suite.sandbox.stub(TestRunnerFactory, 'instance').returns(suite.testRunnerFactoryMock);
        suite.sandbox.stub(ReporterFactory, 'instance').returns(suite.reporterFactoryMock);
        suite.sandbox.stub(ConfigWriterFactory, 'instance').returns(suite.configWriterFactoryMock);

        const indexPath = path.resolve('./lib/index.js');
        delete require.cache[indexPath];
        require('../../lib/index');

        done();
    });

    afterEach((done) => {
        suite.sandbox.restore();
        done();
    });

    it('registers the LabTestRunner', (done) => {
        sinon.assert.calledWith(suite.testRunnerFactoryMock.register, 'lab', LabTestRunner);
        done();
    });
});
