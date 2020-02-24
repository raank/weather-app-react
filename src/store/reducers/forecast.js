const INITIAL_STATE = {
    list: [],
    current: {},
    city: {},
    errors: {}
};

export default function forecast(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'WEATHER_LOADING':
            return {
                ...state,
                loading: false
            };

        case 'WEATHER_LIST':
            return {
                ...state,
                list: action.list
            };

        case 'WEATHER_CURRENT':
            return {
                ...state,
                current: action.current
            };

        case 'WEATHER_CITY':
            return {
                ...state,
                city: action.city
            };

        case 'WEATHER_ERRORS':
            return {
                ...state,
                errors: action.errors
            };

        default:
            return state;
    }
}