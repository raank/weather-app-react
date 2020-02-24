import axios from "axios";
import {convertTemperature, convertToDayName, getIcon, getParse, rowItemDates} from "../../helpers";
import {toast} from "react-toastify";

export const weatherLoading = (loading = true) => {
    return {
        type: 'WEATHER_LOADING',
        loading: loading
    }
};

export const weatherList = (list = []) => {
    return {
        type: 'WEATHER_LIST',
        list: list
    }
};

export const weatherCurrent = (current = {}) => {
    return {
        type: 'WEATHER_CURRENT',
        current: current
    }
};

export const weatherCity = (city = {}) => {
    return {
        type: 'WEATHER_CITY',
        city: city
    }
};

export const weatherErrors = (errors = {}) => {
    return {
        type: 'WEATHER_ERRORS',
        errors: errors
    }
};

export const mountCurrent = (item = {}) => {
    let date = new Date(item.dt * 1000);
    let localeTime = getParse(date.toLocaleTimeString());
    let dates = rowItemDates(item.sunrise, item.sunset, item.dt);

    return {
        temp: convertTemperature(item.temp.day),
        dayWeek: convertToDayName(date.getDay()),
        day: date.getDate(),
        speed: item.speed,
        clouds: item.clouds,
        deg: item.deg,
        pressure: item.pressure,
        humidity: item.humidity,
        icon: getIcon(item.weather[0]),
        description: item.weather[0].description,
        dates: {
            dtInfo: localeTime.hour + ':' + localeTime.minute + ' ' + date.toDateString(),
            sunriseInfo: dates.sunrise.toLocaleTimeString(),
            sunsetInfo: dates.sunset.toLocaleTimeString()
        }
    }
};

export const getForecast = (city) => {
    return dispatch => {
        dispatch(weatherLoading(true));

        let url = process.env.REACT_APP_API_URL;
        let appKey = process.env.REACT_APP_API_KEY;

        axios
            .get(`${url}/data/2.5/forecast/daily?q=${city}&appid=${appKey}`)
            .then((data) => {
                dispatch(weatherCity(data.data.city));
                dispatch(weatherCurrent(data.data.list[0]));
                dispatch(weatherList(data.data.list));
                dispatch(weatherLoading(false));
            })
            .catch((err) => {
                toast.error(`Cidade "${city}" não foi encontrada`, {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: 'error-city'
                });
                dispatch(weatherErrors(err.response))
            })
    };
};