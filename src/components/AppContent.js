import React from "react";

import '../assets/scss/search.scss';
import {getForecast, mountCurrent, weatherCurrent} from "../store/actions/forecast";
import {connect} from "react-redux";
import {ToastContainer} from "react-toastify";

import 'react-toastify/scss/main.scss';

class AppContent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.renderSearch = this.renderSearch.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this._handleSearchCity = this._handleSearchCity.bind(this);
    }

    componentDidMount()
    {
        this.props.getForecast(process.env.REACT_APP_API_CITY_DEFAULT);
    }

    _handleSearchCity(e)
    {
        if (e.keyCode === 13) {
            if (e.target.value.length > 0) {
                this.props.getForecast(e.target.value);
            }

            e.target.value = '';
        }
    }

    _handleSetCurrent(e, i)
    {
        this.props.setCurrent(this.props.list[i]);
    }

    renderSearch()
    {
        return (
            <div className="my-3 app-search-form">
                <div className="d-flex p-3">
                    <input className="w-100" type="text" placeholder="Busque uma cidade" onKeyDown={(e) => this._handleSearchCity(e)}/>
                    <button className="flex-shrink-1">
                        <i className="fa fa-search" />
                    </button>
                </div>
            </div>
        )
    }

    renderResults()
    {
        let rows;

        if (this.props.list !== undefined && this.props.current.temp !== undefined) {
            let currentItem = mountCurrent(this.props.current);

            rows = this.props.list
                .map((row, i) => {
                    let item = mountCurrent(row);

                    let classItem = 'weather-item px-4 pt-4 pb-0 mt-4';

                    if (currentItem.day === item.day) {
                        classItem += ' active';
                    }

                    return (
                        <div className="col col-md-3">
                            <div className={classItem} onClick={(e) => this._handleSetCurrent(e, i)} data-item={i}>
                                <header className="weather-item-header pb-4 d-flex justify-content-between align-items-start">
                                    <i className={item.icon ?? 'fas fa-spinner fa-spin'} />
                                    <span>{item.dayWeek.small}</span>
                                </header>
                                <div className="weather-item-content pb-4 text-left">
                                    <h4 className="d-block font-weight-bold">{item.temp ?? 0} ºC</h4>
                                    <span className="d-block">{item.speed ?? 0} m/s</span>
                                    <span className="d-block">clouds: {item.clouds ?? 0}%</span>
                                </div>
                            </div>
                        </div>
                    )
                })
        }

        return (
            <div className="w-100">
                <div className="row">
                    {rows}
                </div>
            </div>
        )
    }

    render()
    {
        return (
            <div className="col col-sm-7 col-md-7 col-lg-7">
                <div className="app-search">
                    <header className="text-left text-white">
                        <h2 className="mb-0 font-weight-light">Seja bem vindo</h2>
                        <h3 className="mb-0 font-weight-bold">Selecione uma cidade</h3>
                    </header>
                    {this.renderSearch()}

                    <div className="w-100 mt-4 app-search-results text-white">
                        <h5 className="font-weight-bold text-left mb-0">Previsão para a semana:</h5>

                        <div className="app-search-results-list">
                            {this.renderResults()}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getForecast: (city) => dispatch(getForecast(city)),
        setCurrent: (current) => dispatch(weatherCurrent(current))
    }
};

const mapStateToProps = (state) => {
    return {
        list: state.forecast.list,
        current: state.forecast.current,
        city: state.forecast.city,
        errors: state.forecast.errors,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);