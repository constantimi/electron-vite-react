export type StepList = {
  currentStep: Step;
  chain: Step;
};

export enum StepNames {
  AccountSetUp = 'Account setup',
  Welcome = 'Welcome',
}

export type Step = {
  title: StepNames;
  completed?: boolean;
  next?: Step;
  prev?: Step;
};
