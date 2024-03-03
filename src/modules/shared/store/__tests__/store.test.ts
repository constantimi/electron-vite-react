import { AppStore, storeManager } from '../store';

describe('Redux store', () => {
  let store: AppStore;

  beforeEach(() => {
    // reset the store before each test
    storeManager.resetStore();
    store = storeManager.store;
  });

  it('should create the store correctly', () => {
    // check that the store is defined and has a dispatch and getState function
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  //   it('should handle an action correctly', () => {
  //     // Replace 'SOME_ACTION' and 'somePayload' with an actual action type and payload
  //     const action: AnyAction = { type: 'SOME_ACTION', payload: 'somePayload' };

  //     // dispatch the action
  //     store.dispatch(action);

  //     // check that the state is updated correctly
  //     // Replace 'somePartOfTheState' with the actual part of the state that should be updated
  //     expect(store.getState()).toEqual('expectedValue');
  //   });
});
