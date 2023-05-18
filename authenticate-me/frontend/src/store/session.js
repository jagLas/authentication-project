import { csrfFetch } from "./csrf";

const SET_SESSION = 'session/setSession';
const REMOVE_SESSION = 'session/removeSession';

//sets the user in the session store
export const setSession = (user) => {
    return {
        type: SET_SESSION,
        user
    }
}

//removes the user from the session store
export const removeSession = () => {
    return {
        type: REMOVE_SESSION
    }
}

//thunk to set the user in the session store
export const login = (login) => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(login)
    });

    if (res.ok) {
        const user = await res.json();

        dispatch(setSession(user));

        return user
    }
}

const initialState = {user: null}

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION: {
            const newState = {
                ...state,
                ...action.user
            }
            return newState;
        }
        case REMOVE_SESSION:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

export default sessionReducer;