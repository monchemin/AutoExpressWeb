import React, {Component} from 'react';
import {onFetchData, toSubmit} from '../models/hours';
import {InputIcone } from '../../common/formComponent';
import {ChangePropertyValue} from '../../common/functionRepositoy'
import {Hours} from '../../common/entities';



class PickupHour extends Component {

    constructor(props){
        super(props);
        this.instance = Hours();
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
            this.instance = Hours();
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
                    <div className="register-form">   
                        <InputIcone value={selected.hour} id="hour" labelName="" placeholder="00h00" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <InputIcone value={selected.displayOrder} id="displayOrder" labelName="" placeholder="order" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                        <button   onClick={() => this.onToSubmit()}>{buttonValue}</button>
                    </div>
                    <div>
                    <table className="table table-hover">
                            <thead>
                                <tr>
                                    <td></td><td></td><td></td> 
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((x) => 
                                <tr>
                                    <td className="item-description">{x.hour}</td>
                                    <td className="item-description">{x.displayOrder}</td>
                                    <td><button className="button-modify" onClick={() => this.handleClick(x.PK)}>Modifier</button></td>
                                    <td><button className="button-delete" onClick={() => this.handleDelete(x.PK)}>Supprimer</button></td>
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

export default PickupHour;