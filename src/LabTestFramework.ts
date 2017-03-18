import {
  TestFramework,
  TestFrameworkSettings
} from 'stryker-api/test_framework';

export default class LabTestFramework implements TestFramework {

  constructor(settings: TestFrameworkSettings) { }

  beforeEach(codeFragment: string): string {
    return '';
  }

  afterEach(codeFragment: string): string {
    return '';
  }

  filter(ids: number[]): string {
    return '';
  }
}