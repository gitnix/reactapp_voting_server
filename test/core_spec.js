import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('set entries', () => {

    it('adds entries to the state', () => {
      const state = Map();
      const nextState = setEntries(state,List.of('Trainspotting', '28 Days Later'));
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });//end it
  });//end describe set entries

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });

    it('puts the winner of the current vote back to entries', ()=>{
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine','Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting')
      }));
    });//end it

    it('puts both from tied vote back to entries', ()=>{
          const state = Map({
            vote: Map({
              pair: List.of('Trainspotting', '28 Days Later'),
              tally: Map({
                'Trainspotting': 4,
                '28 Days Later': 4
              })
            }),
            entries: List.of('Sunshine', 'Millions', '127 Hours')
          });
          const nextState = next(state);
          expect(nextState).to.equal(Map({
            vote: Map({
              pair: List.of('Sunshine','Millions')
            }),
            entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
          }));
        });//end it

    it('marks the winner when just one entry left', ()=> {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));
    });

  }); //end describe next


  describe('vote', () => {

    it('creates a tally for the voted entry', ()=> {
      const state = fromJS({
          pair: ['Trainspotting', '28 Days Later']
        });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting' : 1
          })
      }));
    });///end it

  it('adds to existing tally for the voted entry', ()=> {
    const state = Map({
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map({
        'Trainspotting': 3,
        '28 Days Later': 2
      })
    });
    const nextState = vote(state, 'Trainspotting');
    expect(nextState).to.equal(Map({
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map({
        'Trainspotting':4,
        '28 Days Later':2
      })
    }));
  })//end it


  })  //end describe vote

});
