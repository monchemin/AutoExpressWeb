import React, {Component} from 'react';
import axios from 'axios';
import Config from '../config';

import {DefaultRoutes} from '../customer/model';
import {RouteDisplay} from './formComponent';
import {InputIcone, AlertError, AlertSuccess} from '../common/formComponent';


class RouteSearch extends Component{

    constructor(props){
        super(props);
        this.state = {routes: [],
            stations: [] }
        this.hours = [];
    }

    componentWillMount(){
        DefaultRoutes().then(data => {
            this.setState({routes: data.maindata.response}); }
        )
        axios.get(Config.API_HOST + "pickuphour.php").then(result => {this.hours =  result.data.response;}); 
        axios.get(Config.API_HOST + "routestation.php").then(result => {this.setState({stations: result.data.response }) });
       
    }

    stationData(id, placeholder, label) {
        return(
            <div>
       <datalist id="list-station">
            {this.state.stations.map((station) => {
                            return <option key={station.PK} value={station.stationName}></option>
                        })}
       </datalist>
       <InputIcone  id={id} list="list-station" labelName={label} type="search" placeholder={placeholder} onChange={(property, value) => this.handleStationChange(property, value) } />
        </div>)
    }

    hourList(id, label){
        console.log(this.hours);
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id={id}>
                    <i className="prefix">{label}</i>
                </span>
            </div>  
            <select className="browser-default custom-select" id={id} onChange={(event) => this.onPropertyValueChange("FK_Hour", event.target.value)} placeholder="Heure de depart">
                <option>Heure</option>
                    {this.hours.map((h) => {
                            return <option key={h.PK} value={h.PK}>{h.hour}</option>
                        })}
            </select>
        </div>
        )
    }


    render(){
        return(
            <div className="container">
                <div className="justify-content-center">
                    <div className="d-flex justify-content-center">   
                        <div className="mx-2 my-2">  <InputIcone  id="startDate" type="date" labelName="Du" placeholder="date depart" onChange={(property, value) => this.onPropertyValueChange(property, value) } /></div>
                        <div className="mx-2 my-2"> <InputIcone  id="endDate" type="date" labelName="Au" placeholder="date depart" onChange={(property, value) => this.onPropertyValueChange(property, value) } /> </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mx-2 my-2"> {this.stationData('FK_DepartureStage', 'depart', 'De')} </div> 
                        <div className="mx-2 my-2" >{this.stationData('FK_ArrivalStage', 'arrivee', 'A')} </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mx-2 my-2"> {this.hourList('FK_DepartureH', 'Entre')} </div> 
                        <div className="mx-2 my-2"> {this.hourList('FK_ArrivalH', 'Et')} </div>
                    </div>
                    <div className="d-flex justify-content-center">
                       <div className="mx-4 my-4"><RouteDisplay routes={this.state.routes}/></div>
                    </div>
                </div>
                
                    
                </div>
            
        )
    }
        
    
}

export default RouteSearch