import React, { Component } from 'react'
import {onFetchData as fetchCities} from '../models/cities';
import {onFetchData as fetchZones} from '../models/zones';
import {onFetchData, toSubmit} from '../models/stations';
import {InputIcone, AlertError} from '../../common/formComponent';
import {ChangePropertyValue} from '../../common/functionRepositoy';
import {MakeStation} from '../../common/entities';


class Zone extends Component {

    constructor(propos) {
        super(propos);
        this.instance = MakeStation()
        this.state = {
            selected: this.instance,
            cities: [],
            currentCity : "",
            zones: [],
            currentZones:[],
            currentZone: "",
            stations: [],
            currentStations: [],
            isLoading: false,
            buttonValue: "Ajouter",  
            error: {"code":false, "message": ""}
        }
    }
    componentWillMount(){
        this.setState({isLoading: true})
        this.fetchData();
    }


    fetchData() {
        fetchCities().then(data => {
            this.setState({
                cities: data.response,
                isLoading: false
            })
        })
        fetchZones().then(data => {
            this.setState({
                zones: data.response,
                isLoading: false
            })
        })
        onFetchData().then(data => {
            
            this.setState({
                stations: data.response
               
            })
        })
    }
    onCitySelect(FK) {
        
        let currentZones = this.state.zones.filter(zone => zone.fkCity === FK);
        this.setState({
            currentZones: currentZones,
            currentCity: FK
        });
    }
    onZoneSelect(FK) {
        let currentStations = this.state.stations.filter(x => x.fkZone === FK);
        this.setState({
            currentStations: currentStations,
            currentZone: FK
        });
    }
    handleClick(i){
        this.instance = this.state.currentStations.find((element) => {
           return  element.id === i
        }) 
       this.setState({
            selected: this.instance,
           buttonValue: "Modifier"
       })
    }
    handleDelete(i) {
        let toDelete = this.state.currentStations.find((element) => {
            return  element.id === i
         })
        
       this.doChangeData("del", toDelete);
    }
    onPropertyValueChange(property, value){
        
        ChangePropertyValue(this.instance, property, value)
        this.setState({
            "selected": this.instance
        })
       
    }
    onToSubmit(){
        
        if(this.state.currentCity === ""){
            this.setState({ error: {"code":true, "message": "Unknown City"}});
            return;
        }
        if(this.state.currentZone === ""){
            this.setState({ error: {"code":true, "message": "Unknown Zone"}});
            return;
        }
        if(this.state.selected.stationName ===""){
            this.setState({ error: {"code":true, "message": "Invalid station name"}});
            return;
        }
        if(this.state.selected.stationAddress ===""){
            this.setState({ error: {"code":true, "message": "Invalid station Address"}});
            return;
        } 
        var method = "post"
        if(this.state.selected.id) {
            method = "put";
        }
        else { ChangePropertyValue(this.instance, "fkZone", this.state.currentZone)
            this.setState({
                "selected": this.instance
            }) }
            
        this.doChangeData(method, this.state.selected);
    }
    doChangeData(method, element){
        toSubmit(method, element).then(data => {
            this.instance = MakeStation();
           
            this.setState({
                stations: data.response,
                buttonValue: "Ajouter",
                selected: this.instance
            })
            this.onZoneSelect(this.state.currentZone)
        })
    }
    citiesList(){
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="city-list">
                    <i className="prefix">City</i>
                </span>
            </div>  
            <select className="browser-default custom-select" id="city-list" onChange={(event) => this.onCitySelect(event.target.value)}>
                <option>Choose your option</option>
                    {this.state.cities.map((city) => {
                            return <option key={city.id} value={city.id}>{city.cityName}</option>
                        })}
            </select>
        </div>
        )
    }

    zonesList(){
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="zone-list">
                    <i className="prefix">Zone</i>
                </span>
            </div>  
            <select className="browser-default custom-select" id="zone-list" onChange={(event) => this.onZoneSelect(event.target.value)}>
                <option>Choose your option</option>
                    {this.state.currentZones.map((x) => {
                            return <option key={x.id} value={x.id}>{x.zoneName}</option>
                        })}
            </select>
        </div>
        )
    }

    render() {
        const {isLoading, currentStations, buttonValue, selected, error} = this.state
        if(isLoading) {
            return <p>..loaging</p>
        }
        return(
            <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div>
                    <div className="register-form"> 
                        {error.code ? <AlertError message={error.message}/> : null }
                        {this.citiesList()}
                        {this.zonesList()}
                        <InputIcone value={selected.stationName} id="stationName" labelName="Station" placeholder="station" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <InputIcone value={selected.stationAddress} id="stationAddress" labelName="Adresse" placeholder="Adresse" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <InputIcone value={selected.stationDetail} id="stationDetail" labelName="Detail" placeholder="Plus de precision" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <button  onClick={() => this.onToSubmit()}>{buttonValue}</button>   
                    </div>
                    <div>
                    <table className="table table-hover">
                            <thead>
                                <tr>
                                    <td></td><td></td><td></td> 
                                </tr>
                            </thead>
                            <tbody>
                                {currentStations.map((x) => 
                                    <tr>
                                        <td className="item-description">{x.stationName}({x.stationAddress})</td>
                                        <td className="item-description">{x.stationDetail}</td>
                                        <td><button className="button-modify" onClick={() => this.handleClick(x.id)}>Modifier</button></td> 
                                        <td><button className="button-delete" onClick={() => this.handleDelete(x.id)}>Supprimer</button></td>
                                    </tr>
                                )}
                            </tbody>
                    </table>
                    </div>
                </div>                       
            </div>
            </div>
        );
    }
    
}

export default Zone;