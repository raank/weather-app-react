import React from "react";
import Clock from 'react-live-clock';

export default class AppAside extends React.Component {
    currentDay() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');

        return dd + '/' + mm;
    }

    logo() {
        return process.env.PUBLIC_URL + '/images/logo.png';
    }

    render() {
        return (
            <div className="col col-sm-2 col-md-2 col-lg-1">
                <aside className="app-aside full-height d-flex align-items-around flex-wrap mb-3">
                    <div className="p-2 app-aside-logo">
                        <div className="d-flex align-content-start flex-wrap full-height justify-content-center">
                            <img src={this.logo()} alt="logo" />
                        </div>
                    </div>
                    <div className="p-2 app-aside-menu">
                    </div>
                    <div className="p-2 bd-highlight app-aside-date">
                        <div className="d-flex align-content-end flex-wrap full-height justify-content-center">
                            <span className="day">{this.currentDay()}</span>
                            <span className="clock">
                            <Clock format={'HH:mm a'} ticking={true} timezone={'America/Sao_Paulo'} />
                        </span>
                        </div>
                    </div>
                </aside>
            </div>
        );
    }
}
