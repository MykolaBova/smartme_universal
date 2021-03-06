import {applyMiddleware, createStore, compose} from 'redux'
import middlewares from 'redux/middlewares'

export default (initialState) => {
    const reducer = require('../reducers')
    let cutomCreateStore

    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
        const { devTools, persistState } = require('redux-devtools');
        cutomCreateStore = compose(
            applyMiddleware.apply(null, middlewares),
            devTools(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(createStore);
    } else cutomCreateStore = applyMiddleware.apply(null, middlewares)(createStore)

    const store = cutomCreateStore(reducer, initialState)

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers'));
        });
    }

    return store
}