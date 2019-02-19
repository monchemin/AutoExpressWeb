import React, {Component} from 'react';
import {onFetchData, toSubmit} from '../models/cities';
import {InputIcone } from '../../common/formComponent';
import {ChangePropertyValue} from '../../common/functionRepositoy'



class City extends Component {

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
        newObject.cityName = "";
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
       
        if(this.state.selected.cityName ==="") {
            this.setState({ error: {"code":true, "message": "Invalid City Name"}});
            return;
        }
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
            
            <InputIcone value={selected.cityName} id="cityName" labelName="Ville" placeholder="Ville" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
            <button   onClick={() => this.onToSubmit()}>{buttonValue}</button>
           
           </div>
            <ul className="list-item">
                {data.map((x) => 
                     <li key={x.PK} >
                        <span className="item-description">{x.cityName}</span>
                        <button className="button-modify" onClick={() => this.handleClick(x.PK)}>Modifier</button> 
                        <button className="button-delete" onClick={() => this.handleDelete(x.PK)}>Supprimer</button></li>
                )}
            </ul>
            </div>
           
        )
    }
}

export default City;