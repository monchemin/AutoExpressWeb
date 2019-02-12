import React, {Component} from 'react';
import {fetchCarbrand, toSubmit} from '../models/carBrands';
import { InputIcone } from '../utils/formComponent';



class Carbrand extends Component {

    constructor(props){
        super(props);
        this.car = this.createBrandObject()
        this.state = {
            selected: this.car,
            data: [],
            isLoading: false,
            buttonValue: "Ajouter"
        }
        
    }
    componentWillMount(){
        this.setState({isLoading: true})
        this.onFetchCarbrand();
    }

    onFetchCarbrand(){
        fetchCarbrand().then(data => { 
         this.setState({
            data: data.response,
            isLoading: false
        });
    })  
    }
    createBrandObject(){
        var newObject = {};
        newObject.PK = "";
        newObject.brandName = "";
        return newObject;
    }

    onPropertyValueChange(property, value){
        
        this.ChangePropertyValue(this.car, property, value)
        this.setState({
            "selected": this.car
        })
       
    }

    ChangePropertyValue(obj, prop, newValue)
    {
        if (obj.hasOwnProperty(prop)) obj[prop] = newValue;
    }
    handleClick(i){
        this.car = this.state.data.find((element) => {
           return  element.PK === i
        }) 
       this.setState({
            selected: this.car,
           buttonValue: "Modifier"
       })
    }
    handleDelete(i) {
        let toDelete = this.state.data.find((element) => {
            return  element.PK === i
         })
        
       this.doChangeData("del", toDelete);
    }
    handleChange(event){
            this.ChangePropertyValue(this.car, "brandName", event.target.value)
            this.setState({
                "selected": this.car
            })
    }
    onToSubmit(){
       
        if(this.state.selected.brandName ==="") return;
        var method = "post"
        if(this.state.selected.PK) method = "put";
        this.doChangeData(method, this.state.selected);
    }
    doChangeData(method, element){
        toSubmit(method, element).then(data => {
            this.car = this.createBrandObject()
            this.setState({
                data: data.response,
                buttonValue: "Ajouter",
                selected: this.car
            })
        })
    }
    render(){
       const {data, isLoading, selected, buttonValue} = this.state;
       if(isLoading) {
           return <p>..loaging</p>
       }
        return(
            
            
            <div className="container">
            
           <div className="form-inline">
           <InputIcone value={selected.brandName} id="brandName" labelName="Marque" placeholder="couleur" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
           <button   onClick={() => this.onToSubmit()}>{buttonValue}</button>
              </div>
            <ul className="list-item">
                {data.map((x) => 
                     <li key={x.PK} >
                        <span className="item-description">{x.brandName}</span>
                        <button className="button-modify" onClick={() => this.handleClick(x.PK)}>Modifier</button> 
                        <button className="button-delete" onClick={() => this.handleDelete(x.PK)}>Supprimer</button></li>
                )}
            </ul>
            </div>
           
           
        )
    }
}

export default Carbrand;