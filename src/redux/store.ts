import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootDepartuerSaga from './actionCreators';
import reducers from './reducers/compbine';

const sageMiddleware = createSagaMiddleware();
const store = createStore(reducers, {}, applyMiddleware(sageMiddleware));
sageMiddleware.run(rootDepartuerSaga)

export default store;