import React, {Component} from 'react';


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
       
       MakeReservation(data).then(data=> this.setState({reservation: data.response[0]}));   
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

   
    OnReservationSuccess(){
       
        return(
            <div className="container">
                <div className="d-flex justify-content-center  text-black">
                    <div className="mx-3 my-3 col"> <AlertSuccess message="Enregistrement effectuee"/> </div>
                </div>
                <div className="d-flex justify-content-center  text-black">
                    <div className="mx-3 my-3 bg-warning col"> Detail de votre initineraire </div>
                </div>
                
               
            </div>

        )
    }
    
    render(){
        const {routeDetail, buttonValue, place, placeError, reservation, isRegistered} = this.state;

        if(reservation !== undefined) {
            
            return(
            <div className="container">
            <div className="d-flex justify-content-center  text-black">
                <div className="mx-3 my-3 col"> <AlertSuccess message="Confirmation de votre reservation"/> </div>
            </div>
            <div className="d-flex justify-content-center  text-black">
                <div className="mx-3 my-3 bg-warning col"> Detail de votre initineraire </div>
            </div>
            <div className="d-flex justify-content-center  text-black">
                    <table className="table table-hover">
                        <tbody>
                        <DisplayResult title="Numero Reservation" value={reservation.PK} />
                        <DisplayResult title="Lieu de Rendez-vous" value={reservation.PK} />
                        <DisplayResult title="Destination" value={reservation.PK} />
                        <DisplayResult title="Heure" value={reservation.PK} />
                        <DisplayResult title="Montant a payer (Veuillez avoir la monnaie exacte en main)" value={reservation.PK} />
                        <DisplayResult title="Information sur le conducteur" value={reservation.PK} />
                        <DisplayResult title="Information importante" value="Soyez au lieu du rendez-vous 10 minutes en avaance<br/>
                            Toute annulation 1h avant l'heure n'est pas remboursable" />
                        <DisplayResult title="Contact" value={reservation.PK} />
            
                        </tbody> </table>
            </div>
        </div>)

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

const DisplayResult = (props) => {
    return(
        <tr>
            <td>{props.title}</td>
            <td>{props.value}</td>
        </tr>
    )
}
export default Reservation