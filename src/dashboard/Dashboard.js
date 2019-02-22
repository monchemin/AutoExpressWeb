import React, {Component} from 'react';


class Dashboard extends Component {
    render(){
        console.log("auth " + sessionStorage.getItem("adminLog"));
        sessionStorage.clear();
        return(
            <div>Dashbord</div>
        )
    }
}

export default Dashboard