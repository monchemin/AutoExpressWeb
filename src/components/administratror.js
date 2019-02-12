import React, {Component} from 'react'
import {InputIcone} from '../utils/formComponent';
import {onFetchData, toSubmit} from '../models/administrators';;



class Administrator extends Component{

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

    render(){
        const {data, isLoading, selected, buttonValue} = this.state;
        if(isLoading) {
            return <p>..loaging</p>
        }
         return(
            
             <div className="container">
             
            <div className="register-form"> 
             
             <InputIcone value={selected.name} id="name" labelName="name" placeholder="name" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
             <InputIcone value={selected.login} id="login" labelName="login" placeholder="login" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
             <InputIcone value={selected.password} id="password" labelName="password" placeholder="password" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
             
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

export default Administrator