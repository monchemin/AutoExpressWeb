import React, { Component } from 'react'
import {onFetchData as fetchCities} from '../models/cities';
import {onFetchData, toSubmit} from '../models/zones';
import {InputIcone, AlertError} from '../../common/formComponent';
import {ChangePropertyValue} from '../../common/functionRepositoy';


class Zone extends Component {

    constructor(propos) {
        super(propos);
        this.instance = this.createObject()
        this.state = {
            selected: this.instance,
            zones: [],
            cities: [],
            currentZones:[],
            isLoading: false,
            buttonValue: "Ajouter",
            currentCity : "",
            error: {"code":false, "message": ""}
        }
    }
    componentWillMount(){
        this.setState({isLoading: true})
        this.fetchData();
    }

    createObject(){
        var newObject = {};
        newObject.PK = "";
        newObject.zoneName = "";
        newObject.FK_City = "";
        return newObject;
    }

    fetchData() {
        fetchCities().then(data => {
            this.setState({
                cities: data.response,
                isLoading: false
            })
        })
        onFetchData().then(data => {
            
            this.setState({
                zones: data.response
               
            })
        })
    }
    onParentSelect(FK) {
        
        let currentZones = this.state.zones.filter(zone => zone.FK_City === FK);
        this.setState({
            currentZones: currentZones,
            currentCity: FK
        });
    }
    handleClick(i){
        this.instance = this.state.currentZones.find((element) => {
           return  element.PK === i
        }) 
       this.setState({
            selected: this.instance,
           buttonValue: "Modifier"
       })
    }
    handleDelete(i) {
        let toDelete = this.state.currentZones.find((element) => {
            return  element.PK === i
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
        if(this.state.selected.zoneName ===""){
            this.setState({ error: {"code":true, "message": "Void Zone name"}});
            return;
        } 
        var method = "post"
        if(this.state.selected.PK) {
            method = "put";
        }
        else { ChangePropertyValue(this.instance, "FK_City", this.state.currentCity)
            this.setState({
                "selected": this.instance
            }) }
        this.doChangeData(method, this.state.selected);
    }
    doChangeData(method, element){
        toSubmit(method, element).then(data => {
            this.instance = this.createObject()
           
            this.setState({
                zones: data.response,
                buttonValue: "Ajouter",
                selected: this.instance
            })
            this.onParentSelect(this.state.currentCity)
        })
    }
    brandList(){
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="city-list">
                    <i className="prefix">City</i>
                </span>
            </div>  
            <select className="browser-default custom-select" id="city-list" onChange={(event) => this.onParentSelect(event.target.value)}>
                <option>Choose your option</option>
                    {this.state.cities.map((city) => {
                            return <option key={city.PK} value={city.PK}>{city.cityName}</option>
                        })}
            </select>
        </div>
        )
    }
    render() {
        const {isLoading, currentZones, buttonValue, selected, error} = this.state
        if(isLoading) {
            return <p>..loaging</p>
        }
        return(
            <div className="container">
                <div className="register-form">
                    {error.code ? <AlertError message={error.message}/> : null }
                    {this.brandList()}
                
                    <div className="form-inline"> 
                        <InputIcone value={selected.zoneName} id="zoneName" labelName="Zone" placeholder="Zone/Quartier" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <button onClick={() => this.onToSubmit()}>{buttonValue}</button>
                    
                    </div>
                </div>
                <ul className="list-item">
                        {currentZones.map((x) => 
                            <li key={x.PK} >
                                <span className="item-description">{x.zoneName}</span>
                                <button className="button-modify" onClick={() => this.handleClick(x.PK)}>Modifier</button> 
                                <button className="button-delete" onClick={() => this.handleDelete(x.PK)}>Supprimer</button></li>
                        )}
                </ul>
            </div>
        );
    }
    
}

export default Zone;