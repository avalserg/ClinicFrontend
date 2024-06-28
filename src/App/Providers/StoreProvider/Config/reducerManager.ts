import {
    type ReducersMapObject,
    combineReducers,
    type AnyAction,
    type Reducer,
} from '@reduxjs/toolkit';
import {
    type StateSchemaKey,
    type StateSchema,
    type ReducerManager,
    MountedReducers,
} from './StateSchema';
// manage reducers in runtime
export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    // Create an object which maps keys to reducers
    const reducers = { ...initialReducers };

    // Create the initial combinedReducer
    // корневой редюсер
    let combinedReducer = combineReducers(reducers);

    // An array which is used to delete state keys when reducers are removed
    // название редюсеров для удвления
    let keysToRemove: StateSchemaKey[] = [];

    const mountedReducers: MountedReducers = {};
    return {
        // возвращает все редюсеры
        getReducerMap: () => reducers,
        // the same as getReducerMap
        getMountedReducers: () => mountedReducers,

        // The root reducer function exposed by this object
        // This will be passed to the store
        // функция редюсер если есть ключи для стэйта то удаляем их
        reduce: (state: StateSchema, action: AnyAction) => {
            // If any reducers have been removed, clean up their state first
            // если есть ключи для удаления то удаляем их из стейта
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });

                keysToRemove = [];
            }

            // Delegate to the combined reducer
            // возвращаем редюсер без лишних ключей
            return combinedReducer(state, action);
        },

        // Adds a new reducer with the specified key
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            // Add the reducer to the reducer mapping
            // @ts-ignore
            reducers[key] = reducer;
            mountedReducers[key] = true;
            // Generate a new combined reducer
            combinedReducer = combineReducers(reducers);
        },

        // Removes a reducer with the specified key
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            // Remove it from the reducer mapping
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete reducers[key];

            // Add the key to the list of keys to clean up
            keysToRemove.push(key);
            mountedReducers[key] = false;

            // Generate a new combined reducer
            combinedReducer = combineReducers(reducers);
        },
    };
}
