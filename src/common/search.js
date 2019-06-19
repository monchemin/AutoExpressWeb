import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Config from '../config';
import GetMessage from '../messages';
import LoadingOverlay from 'react-loading-overlay';

import {DefaultRoutes, SearchRoutes} from '../customer/model';
import {RouteDisplay} from './formComponent';
import { InternalRoutes } from './entities';
import {InputIcone} from './formComponent';
import {ChangePropertyValue} from './functionRepositoy';
import SliderShow from './slider';


import '../css/slider.css';
import RouteNotice from '../customer/RouteNotice';


class RouteSearch extends Component{

    constructor(props){
        super(props);
        this.instance = InternalRoutes()
        this.state = {
            selected: this.instance,
            mainRoutes: [],
            zoneRoutes: [],
            stations: [],
            loading: false }
        this.hours = [];
    }

    componentWillMount(){
        this.setState({loading: true});
        DefaultRoutes().then(data => {
            this.setState({mainRoutes: data.maindata.response,
            loading: false}); }
        )
        axios.get(Config.API_HOST + "pickup-hour.php").then(result => {this.hours =  result.data.response;}); 
        axios.get(Config.API_HOST + "route-station.php").then(result => {this.setState({stations: result.data.response }) });
       
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
        this.setState({loading: true})
        SearchRoutes(this.instance).then(data => {
            this.setState({
                mainRoutes: data.maindata.response,
                zoneRoutes: data.zonedata !== undefined ? data.zonedata.response : [],
                loading: false
            })
        })
    }

    MyRender() {
        return (
            <div className="containerbox">
                <div><SliderShow></SliderShow></div>
                <div className="search-settings-box">
                    <div className="d-flex">
                        <div className="mx-3 my-3 col find-carpooling"> Trouver votre covoiturage </div>
                        <div className="mx-3 my-3 text-black col make-departure"><NavLink  activeClassName="active" to="#" onClick={() => this.props.setSideBarOpen(true, <RouteNotice  />)}>Annoncer un depart</NavLink> </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mx-2 my-2"> {this.stationData('fromStation', 'depart', 'De')} </div> 
                        <div className="mx-2 my-2" >{this.stationData('toStation', 'arrivee', 'A')} </div>
                        <div className="mx-2 my-2"> <InputIcone  id="startDate" type="date" labelName="Le" placeholder="date depart" onChange={(property, value) => this.onPropertyValueChange(property, value) } /></div>
                        <div className="mx-2 my-2"> {this.hourList('fromHour', 'Entre')} </div> 
                        <div className="mx-2 my-2"> {this.hourList('toHour', 'Et')} </div>
                        <div className="mx-2 my-2"><button className="btn float-right search-btn" onClick={() => this.onToSubmit()} >Rechercher </button></div>
                    </div>
                </div>
                <div className="d-flex text-black">
                    <div className="mx-3 my-3col search-result-title"> Les dernieres annonces </div>
                </div>
                <div className="justify-content-center">

                    <div className="justify-content-center search-box">
                       <div className="mx-4 my-4">{this.state.mainRoutes.length !== 0 ? <RouteDisplay routes={this.state.mainRoutes}/> : "Pas de correspondance"}</div>
                    </div>
                    {this.state.zoneRoutes.length !== 0 ?
                        <div>
                        <div className="d-flex  text-black">
                            <div className="mx-3 my-3col search-result-title"> correspondance de la zone de depart  </div>
                        </div>
                        <div className="d-flex justify-content-center search-box">
                            <div className="mx-4 my-4"><RouteDisplay routes={this.state.zoneRoutes}/> </div>
                        </div>
                        </div>
                    : null}
                    
                </div>
               
                    
                </div>
        );
    }
    render(){
        return(
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text={GetMessage("LOADING")} >
                    {this.MyRender()}
            </LoadingOverlay>
            )
    }
      
}

export default RouteSearch