import React, {Component} from 'react';

import {DefaultRoutes} from '../customer/model';
import {RouteDisplay} from '../common/formComponent';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {routes: [] }
        sessionStorage.clear();
    }

    componentWillMount(){
        DefaultRoutes().then(data => {
            this.setState({routes: data.maindata.response}); }
        )
    }
    render(){
        
        return(
            <RouteDisplay routes={this.state.routes}/>
        )
    }
}

export default Dashboard