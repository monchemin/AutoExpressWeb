import React, {Component} from 'react';
import axios from 'axios';
import Config from '../config';

import {DefaultRoutes, SearchRoutes} from '../customer/model';
import {RouteDisplay} from './formComponent';
import { InternalRoutes } from '../common/entities';
import {InputIcone, AlertError, AlertSuccess} from '../common/formComponent';
import {ChangePropertyValue, isObjectComplete} from '../common/functionRepositoy';


class RouteSearch extends Component{

    constructor(props){
        super(props);
        this.instance = InternalRoutes()
        this.state = {
            selected: this.instance,
            mainRoutes: [],
            zoneRoutes: [],
            stations: [] }
        this.hours = [];
    }

    componentWillMount(){
        DefaultRoutes().then(data => {
            this.setState({mainRoutes: data.maindata.response}); }
        )
        axios.get(Config.API_HOST + "pickuphour.php").then(result => {this.hours =  result.data.response;}); 
        axios.get(Config.API_HOST + "routestation.php").then(result => {this.setState({stations: result.data.response }) });
       
    }

    handleStationChange(property, value){
        let station = this.state.stations.find(station => { return station.stationName === value});
        if(station !== undefined) this.onPropertyValueChange(property, station.PK);
    }

    onPropertyValueChange(property, value){
       
        ChangePropertyValue(this.instance, property, value)
        this.setState({
            "selected": this.instance
        })
        
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
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id={id}>
                    <i className="prefix">{label}</i>
                </span>
            </div>  
            <select className="browser-default custom-select" id={id} onChange={(event) => this.onPropertyValueChange(id, event.target.value)} placeholder="Heure de depart">
                <option>Heure</option>
                    {this.hours.map((h) => {
                            return <option key={h.PK} value={h.PK}>{h.hour}</option>
                        })}
            </select>
        </div>
        )
    }

    onToSubmit() {
        SearchRoutes(this.instance).then(data => {
            this.setState({
                mainRoutes: data.maindata.response,
                zoneRoutes: data.zonedata !== undefined ? data.zonedata.response : []
            })
        })
    }


    render(){
        return(
            <div className="container">
                <div className="d-flex justify-content-center  text-black">
                    <div className="mx-3 my-3 bg-warning col"> Filter la recherche </div>
                </div>
                <div className="justify-content-center">
                    <div className="d-flex justify-content-center">
                        <div className="mx-2 my-2"> {this.stationData('fromStation', 'depart', 'De')} </div> 
                        <div className="mx-2 my-2" >{this.stationData('toStation', 'arrivee', 'A')} </div>
                    </div>
                    
                    
                    <div className="d-flex justify-content-center">
                        <div className="mx-2 my-2"> <InputIcone  id="startDate" type="date" labelName="Le" placeholder="date depart" onChange={(property, value) => this.onPropertyValueChange(property, value) } /></div>
                        <div className="mx-2 my-2"> {this.hourList('fromHour', 'Entre')} </div> 
                        <div className="mx-2 my-2"> {this.hourList('toHour', 'Et')} </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mx-4 my-4"><button className="btn float-right login_btn" onClick={() => this.onToSubmit()} >Rechercher </button></div>
                    </div>
                    <div className="d-flex justify-content-center">
                       <div className="mx-4 my-4">{this.state.mainRoutes.length !== 0 ? <RouteDisplay routes={this.state.mainRoutes}/> : "Pas de correspondance"}</div>
                    </div>
                    {this.state.zoneRoutes.length !== 0 ?
                        <div>
                        <div className="d-flex justify-content-center  text-black">
                            <div className="mx-3 my-3 bg-warning col"> correspondance de la zone  </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="mx-4 my-4"><RouteDisplay routes={this.state.zoneRoutes}/> </div>
                        </div>
                        </div>
                    : null}
                    
                </div>
               
                    
                </div>
            
        )
    }
        
    
}

export default RouteSearch