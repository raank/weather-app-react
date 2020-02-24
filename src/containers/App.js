import React from "react";
import { Provider } from "react-redux";
import store from "./../store";

// styles
import 'bootstrap/scss/bootstrap.scss';
import './../assets/css/index.css';
import './../assets/scss/App.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'weather-icons/css/weather-icons.min.css';

import AppAside from "../components/AppAside";
import AppContent from "../components/AppContent";
import AppCurrent from "../components/AppCurrent";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="app full-height">
                    <div className="container-fluid full-height">
                        <div className="row full-height">
                            <AppAside />
                            <AppContent />
                            <AppCurrent />
                        </div>
                    </div>
                </div>
            </Provider>
        )
    }
}