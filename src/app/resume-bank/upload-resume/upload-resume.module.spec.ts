import { UploadResumeModule } from './upload-resume.module';

describe('UploadResumeModule', () => {
  let uploadResumeModule: UploadResumeModule;

  beforeEach(() => {
    uploadResumeModule = new UploadResumeModule();
  });

  it('should create an instance', () => {
    expect(uploadResumeModule).toBeTruthy();
  });
});
