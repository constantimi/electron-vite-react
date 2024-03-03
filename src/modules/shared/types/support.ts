export interface SupportUIOptions {
  theme: 'light' | 'dark';
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  watermark: boolean;
  defaultButton: {
    icon: 'brand' | 'exclamation';
  };
  recordingControls: boolean;
  previewScreen: {
    visualProof: 'optional' | 'required' | false;
    visualProofButtons: {
      screenshot: boolean;
      screenRecording: boolean;
    };
    email: 'optional' | 'required' | boolean;
    title: 'optional' | 'required';
    description: 'optional' | 'required';
  };
  submitConfirmationScreen: {
    sessionLink: boolean;
  };
  text: {
    defaultButton: string;
    dismissButton: string;
    recordingControls: {
      starting: string;
      recording: string;
      recordingProgress: string;
      stopRecordingButton: string;
    };
    previewScreen: {
      title: string;
      visualProofMissingErrorMessage: string;
      startScreenRecordingButton: string;
      takeScreenshotButton: string;
      replaceVisualProofButton: string;
      removeVisualProofButton: string;
      confirmVisualProofRemovalButton: string;
      cancelButton: string;
      emailInputPlaceholder: string;
      titleInputPlaceholder: string;
      descriptionInputPlaceholder: string;
      collectionInputPlaceholder: string;
      labelInputPlaceholder: string;
      inputOptional: string;
      submitButton: string;
      uploadError: string;
    };
    submitConfirmationScreen: {
      title: string;
      message: string;
      copyLink: string;
      copiedLink: string;
      confirmationButton: string;
    };
  };
}
