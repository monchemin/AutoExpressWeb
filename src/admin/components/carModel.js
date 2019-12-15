import React, { Component } from 'react'
import {fetchCarbrand} from '../models/carBrands';
import {onFetchData, toSubmit} from '../models/carModels';
import {InputIcone, AlertError} from '../../common/formComponent';
import {ChangePropertyValue} from '../../common/functionRepositoy'


class CarModel extends Component {

    constructor(propos) {
        super(propos);
        this.instance = this.createObject()
        this.state = {
            selected: this.instance,
            models: [],
            brands: [],
            currentModels:[],
            isLoading: false,
            buttonValue: "Ajouter",
            currentBrand : "",
            error: {"code":false, "message": ""}
        }
    }
    componentWillMount(){
        this.setState({isLoading: true})
        this.fetchData();
    }

    createObject(){
        var newObject = {};
        newObject.id = "";
        newObject.modelName = "";
        newObject.fkBrand = "";
        return newObject;
    }

    fetchData() {
        fetchCarbrand().then(data => {
            this.setState({
                brands: data.response,
                isLoading: false
            })
        })
        onFetchData().then(data => {
            
            this.setState({
                models: data.response
               
            })
        })
    }
    brandChoice(FK) {
        let currentModels = this.state.models.filter(model => model.fkBrand === FK);
        this.setState({
            currentModels: currentModels,
            currentBrand: FK
        });
    }
    handleClick(i){
        this.instance = this.state.currentModels.find((element) => {
           return  element.id === i
        }) 
       this.setState({
            selected: this.instance,
           buttonValue: "Modifier"
       })
    }
    handleDelete(i) {
        let toDelete = this.state.currentModels.find((element) => {
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
        
        if(this.state.currentBrand === ""){
            this.setState({ error: {"code":true, "message": "marque manquante"}});
            return;
        }
        if(this.state.selected.modelName ===""){
            this.setState({ error: {"code":true, "message": "modele Vide"}});
            return;
        } 
        var method = "post"
        if(this.state.selected.id) {
            method = "put";
        }
        else { ChangePropertyValue(this.instance, "fkBrand", this.state.currentBrand)
            this.setState({
                "selected": this.instance
            }) }
        this.doChangeData(method, this.state.selected);
    }
    doChangeData(method, element){
        toSubmit(method, element).then(data => {
            this.instance = this.createObject()
           
            this.setState({
                models: data.response,
                buttonValue: "Ajouter",
                selected: this.instance
            })
            this.brandChoice(this.state.currentBrand)
        })
    }
    brandList(){
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="brand-list">
                    <i className="prefix">marque</i>
                </span>
            </div>  
            <select className="browser-default custom-select" id="brand-list" onChange={(event) => this.brandChoice(event.target.value)}>
                <option>Choose your option</option>
                    {this.state.brands.map((brand) => {
                            return <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                        })}
            </select>
        </div>
        )
    }
    render() {
        const {isLoading, currentModels, buttonValue, selected, error} = this.state
        if(isLoading) {
            return <p>..loaging</p>
        }
        return(
            <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div>
                    <div className="form-inline">
                        {error.code ? <AlertError message={error.message}/> : null }
                        {this.brandList()}
                    
                        <div className="form-inline"> 
                            <InputIcone value={selected.modelName} id="modelName" labelName="Modele" placeholder="modele" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                            <button onClick={() => this.onToSubmit()}>{buttonValue}</button>
                        
                        </div>
                    </div>
                    <div>
                    <table className="table table-hover">
                            <thead>
                                <tr>
                                    <td>Modele</td><td></td><td></td> 
                                </tr>
                            </thead>
                            <tbody>
                            {currentModels.map((x) => 
                            <tr>
                                <td className="item-description">{x.modelName}</td>
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

export default CarModel;