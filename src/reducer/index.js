import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';


//reducer imports
import tokenReducer from './tokenreducer';
import userReducer from './userreducer';
import balanceReducer from './balancereducer';



const config = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['token', 'user']
}


const reducers = combineReducers({
    token: tokenReducer,
    user: userReducer,
    balance: balanceReducer
})

const persisted = persistReducer(config, reducers)

export default persisted