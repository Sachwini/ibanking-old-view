import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Content from './components/Content';
import Header from './components/static/Header';
import SideBar from './components/static/SideBar';

const DefaultLayout: React.SFC<RouteComponentProps<{}>> = (props) => {
    const gotUrl = (url: string) => {
        props.history.push(url);
    };

    return <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
        <div style={{ width: "7%" }}>
            <SideBar goto={gotUrl} />
        </div>
        <div style={{ width: "93%" }}>
            <Header />
            <div className="main-content">
                {props.children}
            </div>
        </div>
    </div>
}

export default withRouter(DefaultLayout)