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
        newObject.id = "";
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
           return  element.id === i
        }) 
       this.setState({
            selected: this.instance,
           buttonValue: "Modifier"
       })
    }
    handleDelete(i) {
        let toDelete = this.state.data.find((element) => {
            return  element.id === i
         })
        
       this.doChangeData("del", toDelete);
    }

    onToSubmit(){
       
        if(this.state.selected.cityName ==="") {
            this.setState({ error: {"code":true, "message": "Invalid City Name"}});
            return;
        }
        var method = "post"
        if(this.state.selected.id) method = "put";
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
                        <InputIcone value={selected.cityName} id="cityName" labelName="" placeholder="Ville" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <button   onClick={() => this.onToSubmit()}>{buttonValue}</button>
                    </div>
                    <div>
                        <table className="table table-hover">
                           
                            <tbody>
                                {data.map((x) => 
                                    <tr>
                                        <td className="item-description">{x.cityName}</td>
                                        <td><button className="button-modify" onClick={() => this.handleClick(x.id)}>Modifier</button></td> 
                                        <td><button className="button-delete" onClick={() => this.handleDelete(x.id)}>Supprimer</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>  
                </div>
           
            <ul className="list-item">
                
            </ul>
            </div>
            </div>
           
        )
    }
}

export default City;