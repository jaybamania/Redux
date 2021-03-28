const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers

const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake(){
    return {
        type: BUY_CAKE,
        info:'First redux action'
    }
}

function buyIceCream(){
    return {
        type: BUY_ICECREAM,
        info:'Second redux action'
    }
}

const initialCakeState = {
    numOfCakes : 10
}
const initialIceCreamState = {
    numOfIceCreams : 20
}

const CakeReducer = (state = initialCakeState, action) =>{
    switch(action.type){
        case BUY_CAKE:
            return{
                ...state,
                numOfCakes: state.numOfCakes-1
            }
        default:
            return state
    }
}
const IceCreamReducer = (state = initialIceCreamState, action) =>{
    switch(action.type){
        case BUY_ICECREAM:
            return{
                ...state,
                numOfIceCreams: state.numOfIceCreams-1
            }
        default:
            return state
    }
}
//COmbine Reducers
const rootReducer = combineReducers({
    cake : CakeReducer,
    iceCream : IceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State ',store.getState())
const unsubscribe = store.subscribe(()=> {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()