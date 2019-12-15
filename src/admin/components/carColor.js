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
        onFetchData().then(data => {; 
         this.setState({
            data: data.response,
            isLoading: false
        });
    })  
    }
    createObject(){
        var newObject = {};
        newObject.Id = "";
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
           return  element.Id === i
        }) 
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
       
        if(this.state.selected.colorName ==="") return;
        var method = "post"
        if(this.state.selected.Id) method = "put";
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
                <div className="d-flex justify-content-center h-100">
                <div>
                    <div className="form-inline">    
                        <InputIcone value={selected.colorName} id="colorName" labelName="" placeholder="couleur" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <button   onClick={() => this.onToSubmit()}>{buttonValue}</button>
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
                                    <tr >
                                        <td>{x.colorName}</td>
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