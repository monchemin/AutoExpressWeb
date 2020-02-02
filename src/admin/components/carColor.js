import React, {Component} from 'react';
import {onFetchData, toSubmit} from '../models/carColors';
import {InputIcone } from '../../common/formComponent';
import {ChangePropertyValue} from '../../common/functionRepositoy'



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
        onFetchData().then(data => { 
         this.setState({
            data: this.present(data.response),
            isLoading: false
        });
    })  
    }
    present(data) {
       return  data.map(item => {
           var presenter = {};
            presenter.Id = item.Id;
            presenter.colorName = item.colorName;
            presenter.colorLabel = {};
            
            if (item.colorLabel !== undefined && item.colorLabel != null) {
                presenter.colorLabel = JSON.parse(item.colorLabel);
            }  else {
                presenter.colorLabel.en = item.colorName
            }
            return presenter;
        })
    }
    createObject(){
        var newObject = {};
        newObject.Id = "";
        newObject.en = "";
        newObject.fr = "";
        return newObject;
    }
   

    onPropertyValueChange(property, value){
        
        ChangePropertyValue(this.instance, property, value)
        this.setState({
            "selected": this.instance
        })
       
    }
    handleClick(i){
        let element = this.state.data.find((element) => {
           return  element.Id === i
        })
        let newObject = {};
        newObject.Id = element.Id;
        newObject.en = element.colorLabel.en;
        newObject.fr = element.colorLabel.fr;
        this.instance = newObject;
       this.setState({
            selected: this.instance,
           buttonValue: "Modifier"
       })
    }
    handleDelete(i) {
        let toDelete = this.state.data.find((element) => {
            return  element.Id === i
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
       
        if(this.state.selected.colorLabel ===null) return;
        var method = "post"
        if(this.state.selected.Id) method = "put";
        this.doChangeData(method, this.state.selected);
    }

    doChangeData(method, element){ 
        let toSend = {};
        toSend.Id = element.Id;
        toSend.colorName = element.en !=null ? element.en : element.fr;
        let label = {};
        label.en = element.en;
        label.fr = element.fr;
        toSend.colorLabel = JSON.stringify(label);
        toSubmit(method, toSend).then(data => {
            this.instance = this.createObject()
            this.setState({
                data: this.present(data.response),
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
                <div className="d-flex justify-content-center h-100">
                <div>
                    <div className="register-form">    
                        <InputIcone value={selected.fr} id="fr" labelName="" placeholder="couleur" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <InputIcone value={selected.en} id="en" labelName="" placeholder="color" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <button onClick={() => this.onToSubmit()}>{buttonValue}</button>
                    </div>
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <td colSpan="3">Colors</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((x) => 
                                    <tr key={x.Id}>
                                        <td>{x.colorLabel ? x.colorLabel.fr : x.colorName}</td>
                                        <td>{x.colorLabel ? x.colorLabel.en : x.colorName}</td>
                                        <td><button className="button-modify" onClick={() => this.handleClick(x.Id)}>Modifier</button></td>
                                        <td><button className="button-delete" onClick={() => this.handleDelete(x.Id)}>Supprimer</button></td>
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

export default CarColor;