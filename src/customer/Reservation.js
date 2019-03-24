import React, {Component} from 'react';
import axios from 'axios';


import {InputIcone, AlertError, AlertSuccess} from '../common/formComponent';
import {MakeReservation, GetRouteDetail} from './model';
import { Driver } from '../common/entities';
import {ChangePropertyValue, yearValidation, isObjectComplete} from '../common/functionRepositoy';
import * as SessionService from '../common/SessionService';
import Config from '../config';



class Reservation extends Component{

    constructor(props){
        super(props);
        this.instance = Driver()
        this.state = {
            placeError: false,
            routeDetail: "",
            buttonValue: "Valider",
            error: {"code":false, "message": ""}
        } 
    }
    
    componentWillMount(){
        GetRouteDetail(this.props.match.params.id).then(data => this.setState({routeDetail: data.response[0]}));
        
    }


    onPropertyValueChange(property, value){
        
        ChangePropertyValue(this.instance, property, value)
        this.setState({
            "selected": this.instance
        })
        
    }

    

    onToSubmit(){ 
       var data = {};
       //data.PK = new Date().getFullYear() + this.state.routeDetail.PK + SessionService.getCustomerID();
       data.place = this.state.place;
       data.FK_Route = this.state.routeDetail.PK;
       data.FK_Customer = SessionService.getCustomerID();
       
       MakeReservation(data).then(data=> this.setState({reservation: data.response}));   
    }    
    onPlaceChange(prop,value){  
        
        if( !isNaN(value) && value <= this.state.routeDetail.remaningPlace ) {
            
            this.setState({ place: value,
                            placeError: false  });
        }
        else {
            this.setState({ placeError: true });
        }
    
    }

   
    
    
    render(){
        const {routeDetail, buttonValue, place, placeError, reservation, isRegistered} = this.state;

        if(reservation !== undefined) {
            return (
                <AlertSuccess message="Enregistrement effectuee"/>
            )
        }
        
         return(
            <div className="container">  
           <div className="d-flex justify-content-center  text-black">
                    <div className="mx-3 my-3 bg-warning col"> Detail de l'itineraire </div>
                </div>
           <div className="d-flex justify-content-center  text-black">
           <div className="register-form"> 
                <InputIcone value={routeDetail.fZone + "/" + routeDetail.fStation}  labelName="Depart"  disabled="disabled" />
                <InputIcone value={routeDetail.fstationDetail} disabled="disabled" />
                <InputIcone value={routeDetail.tZone + "/" + routeDetail.tStation}  labelName="Point de Chute" disabled="disabled"/>
                <InputIcone value={routeDetail.tstationDetail} disabled="disabled"/>
                <InputIcone value={routeDetail.hour}  labelName="Heure" disabled="disabled"/>
                <InputIcone value={routeDetail.routeDate} labelName="Date" disabled="disabled" />
                <InputIcone value={routeDetail.routePrice} labelName="Prix" disabled="disabled" />
                {placeError=== true ? <AlertError message="Nombre de places Invalide"/> : null }
                <InputIcone value={place} id="place" labelName="Nombre de places" placeholder={"maximum " + routeDetail.remaningPlace}  onChange={(property, value) => this.onPlaceChange(property, value) } />
                <button className="btn login_btn" onClick={() => this.onToSubmit()} >{buttonValue} </button>
            </div>
            </div>
            
            </div>
                   
             
            
         )
     }
}

export default Reservation