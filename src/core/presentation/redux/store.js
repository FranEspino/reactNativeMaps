import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import locationReducer from './reducers'
import { persistStore,persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    locations : locationReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const Store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(Store)

