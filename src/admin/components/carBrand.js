import React, {Component} from 'react';
import {fetchCarbrand, toSubmit} from '../models/carBrands';
import { InputIcone } from '../../common/formComponent';



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
        newObject.id = "";
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
           return  element.id === i
        }) 
       this.setState({
            selected: this.car,
           buttonValue: "Modifier"
       })
    }
    handleDelete(i) {
        let toDelete = this.state.data.find((element) => {
            return  element.id === i
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
        if(this.state.selected.id) method = "put";
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
            <div className="d-flex justify-content-center h-100">
                <div>
                    <div className="form-inline">
                        <InputIcone value={selected.brandName} id="brandName" labelName="" placeholder="Marque" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <button   onClick={() => this.onToSubmit()}>{buttonValue}</button>
                    </div>
                    <div>
                        <table className="table table-hover">
                           
                            <tbody>
                                {data.map((x) => 
                                    <tr>
                                        <td>{x.brandName}</td>
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
            
           
           
        )
    }
}

export default Carbrand;