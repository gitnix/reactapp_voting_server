import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', ()=> {

  it('can be used with reduce', () => {
    const actions = [
      
    ]
  });//end it

  it('has an initialState', ()=> {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });//end it


  it('handles SET_ENTRIES', ()=> {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });//end it

  it('handles NEXT', ()=> {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });
    const action = {type: 'NEXT'}
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }));
  });//end it

  it('handles VOTE', ()=> {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting:1}
      },
      entries: []
    }));
  });//end it

}); //end describe
