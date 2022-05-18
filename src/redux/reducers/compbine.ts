import { combineReducers } from 'redux';
import { commentReducer } from '.';


const reducers = combineReducers({
    departures: commentReducer
});

export default reducers;
//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;