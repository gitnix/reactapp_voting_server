import makeStore from './src/store';
import {startServer} from './src/server';
//use brackets maybe when the function doesn't return anything?
//update: seems to not need brackets when default export

export const store = makeStore();
startServer(store);

console.log('Server Started')
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
