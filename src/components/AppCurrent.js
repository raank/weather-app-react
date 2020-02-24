import React from "react";
import {getForecast, mountCurrent} from "../store/actions/forecast";
import {connect} from "react-redux";

class AppCurrent extends React.Component
{
    constructor(props) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderTemperature = this.renderTemperature.bind(this);
    }

    renderHeader(current = {}, city = {})
    {
        return (
            <header className="d-block w-100">
                <div className="d-flex justify-content-between app-weather-header">
                    <div className="p-4 app-weather-infos-header-data">
                        <span className="d-block w-100 app-weather-header-title text-left">{current.dayWeek !== undefined ? current.dayWeek.normal : 'today'}</span>
                        <span className="d-block w-100 app-weather-header-subtitle text-left">{city.name}</span>
                    </div>
                    <div className="p-4 d-flex align-items-center app-weather-header-icon">
                        <i className={current.icon ?? 'fas fa-spinner fa-spin'} />
                    </div>
                </div>
            </header>
        )
    }

    renderTemperature(current)
    {
        return (
            <div className="d-block w-100 app-weather-infos-temperature">
                <div className="full-height d-flex align-items-center flex-wrap">
                    <div className="d-block w-100">
                        <div className="px-2 d-flex-justify-content-center app-weather-infos-temperature-number">
                            <h2>{current.temp ?? 0}<sup>ºc</sup></h2>
                        </div>
                        <div className="px-4 d-block app-weather-infos-temperature-description">
                            <span className="px-2 w-100 d-block">{current.description !== undefined ? current.description : null}</span>
                            <span className="px-2 w-100">{current.dates !== undefined ? current.dates.dtInfo : null}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderInformation(current = {}, city = {})
    {
        return (
            <div className="d-block w-100 app-weather-infos-data">
                <div className="p-4 w-100 d-flex align-items-end full-height">
                    <ul className="p-0 w-100 mb-0 app-weather-infos-list">
                        <li className="d-flex justify-content-between">
                            <span className="data-name font-weight-bold">Wind</span>
                            <span className="data-attr font-weight-bold">{current.speed !== undefined ? current.speed : 0}m/s, East ({current.deg !== undefined ? current.deg : 0})</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span className="data-name font-weight-bold">Cloudiness</span>
                            <span className="data-attr font-weight-bold">{current.description !== undefined ? current.description : 'N/A'}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span className="data-name font-weight-bold">Pressure</span>
                            <span className="data-attr font-weight-bold">{current.pressure !== undefined ? current.pressure : 0} hpa</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span className="data-name font-weight-bold">Humidity</span>
                            <span className="data-attr font-weight-bold">{current.humidity !== undefined ? current.humidity : 0}%</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span className="data-name font-weight-bold">Sunrise</span>
                            <span className="data-attr font-weight-bold">{current.dates !== undefined ? current.dates.sunriseInfo : null}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span className="data-name font-weight-bold">Sunset</span>
                            <span className="data-attr font-weight-bold">{current.dates !== undefined ? current.dates.sunsetInfo : null}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span className="data-name font-weight-bold">Geo Coords</span>
                            {city.coord !== undefined ? (
                                <span className="data-attr font-weight-bold">[{city.coord !== undefined ? city.coord.lat : 0}, {city.coord !== undefined ? city.coord.lon : 0}]</span>
                            ) : null}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    render()
    {
        let current = {}, city = {};

        if (this.props.current.temp !== undefined && this.props.city.name !== undefined) {
            current = mountCurrent(this.props.current);
            city = this.props.city;
        }

        return (
            <div className="col col-md-4">
                <div className="app-weather-infos full-height d-flex align-items-around flex-wrap mb-3">
                    { this.renderHeader(current, city) }
                    { this.renderTemperature(current) }
                    { this.renderInformation(current, city) }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getForecast: (city) => dispatch(getForecast(city))
    }
};

const mapStateToProps = (state) => {
    return {
        list: state.forecast.list,
        current: state.forecast.current,
        city: state.forecast.city,
        notfound: state.forecast.notfound,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppCurrent);