import React, {Component} from 'react';
import {onFetchData, toSubmit} from '../models/carColors';
import {InputIcone } from '../utils/formComponent';
import {ChangePropertyValue} from '../utils/functionRepositoy'



class CarColor extends Component {

    constructor(props){
        super(props);
        this.instance = this.createObject()
        this.state = {
            selected: this.instance,
            data: [],
            isLoading: false,
            buttonValue: "Ajouter"
        }
        
    }
    componentWillMount(){
        this.setState({isLoading: true})
        this.fetchData();
    }

    fetchData(){
        onFetchData().then(data => {; 
         this.setState({
            data: data.response,
            isLoading: false
        });
    })  
    }
    createObject(){
        var newObject = {};
        newObject.PK = "";
        newObject.colorName = "";
        return newObject;
    }
   

    onPropertyValueChange(property, value){
        
        ChangePropertyValue(this.instance, property, value)
        this.setState({
            "selected": this.instance
        })
       
    }
    handleClick(i){
        this.instance = this.state.data.find((element) => {
           return  element.PK === i
        }) 
       this.setState({
            selected: this.instance,
           buttonValue: "Modifier"
       })
    }
    handleDelete(i) {
        let toDelete = this.state.data.find((element) => {
            return  element.PK === i
         })
        
       this.doChangeData("del", toDelete);
    }
  /*  handleChange(event){
            this.ChangePropertyValue(this.instance, "colorName", event.target.value)
            this.setState({
                "selected": this.instance
            })
    }*/
    onToSubmit(){
       
        if(this.state.selected.colorName ==="") return;
        var method = "post"
        if(this.state.selected.PK) method = "put";
        this.doChangeData(method, this.state.selected);
    }
    doChangeData(method, element){
        toSubmit(method, element).then(data => {
            this.instance = this.createObject()
            this.setState({
                data: data.response,
                buttonValue: "Ajouter",
                selected: this.instance
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
            
            <InputIcone value={selected.colorName} id="colorName" labelName="Couleur" placeholder="couleur" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
            <button   onClick={() => this.onToSubmit()}>{buttonValue}</button>
           
           </div>
            <ul className="list-item">
                {data.map((x) => 
                     <li key={x.PK} >
                        <span className="item-description">{x.colorName}</span>
                        <button className="button-modify" onClick={() => this.handleClick(x.PK)}>Modifier</button> 
                        <button className="button-delete" onClick={() => this.handleDelete(x.PK)}>Supprimer</button></li>
                )}
            </ul>
            </div>
           
        )
    }
}

export default CarColor;