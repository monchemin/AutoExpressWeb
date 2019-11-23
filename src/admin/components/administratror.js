import React, {Component} from 'react'
import {InputIcone, InputIconeBlur, AlertError} from '../../common/formComponent';
import {onFetchData, toSubmit, onLoginCheck} from '../models/administrators';
import { admin } from '../../common/entities';
import {ChangePropertyValue} from '../../common/functionRepositoy';




class Administrator extends Component{

    constructor(props){
        super(props);
        this.instance = admin()
        this.state = {
            selected: this.instance,
            data: [],
            isLoading: false,
            buttonValue: "Ajouter",
            error: {"code":false, "message": ""}
        }
        
    }
    componentWillMount(){
        this.setState({isLoading: true})
        this.fetchData();
    }

    fetchData(){
        onFetchData().then(data => { 
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

    onPassWordChande(){
        this.setState({"confirmation" : this.instance.userPassword === this.instance.confirmation});
    }

    onToSubmit(){
       
        if(    this.state.selected.userName ==="" 
            || this.state.selected.userLogin ===""
            || this.state.selected.userPassword ==="") {

            this.setState({ error: {"code":true, "message": "Invalid information"}});
            return;
        }
        var method = "post"
        if(this.state.selected.userId) method = "put";
        this.doChangeData(method, this.state.selected);
    }
    doChangeData(method, element){
        toSubmit(method, element).then(data => {
            this.instance = admin()
            this.setState({
                data: data.response,
                buttonValue: "Ajouter",
                selected: this.instance
            })
        })
    }
    loginExist(){
        onLoginCheck({"checkLogin": this.instance.userLogin}).then(data => {
            this.setState({ loginError: data.loginExists });
        })
    }
    handleClick(i){
        this.instance = this.state.data.find((element) => {
           return  element.userId === i
        }) 
       this.setState({
            selected: this.instance,
           buttonValue: "Modifier"
       })
    }
    handleDelete(i) {
        let toDelete = this.state.data.find((element) => {
            return  element.userId === i
         })
        
       this.doChangeData("del", toDelete);
    }
    render(){
        const {data, isLoading, selected, buttonValue, error, loginError, confirmation} = this.state;
        if(isLoading) {
            return <p>..loaging</p>
        }
         return(
            
             <div className="container">
             
            <div className="register-form"> 
            {error.code ? <AlertError message={error.message}/> : null }
             <InputIcone value={selected.userName} id="userName" labelName="name" placeholder="Name" type="text" onChange={(property, value) => this.onPropertyValueChange(property, value) } />
             <InputIconeBlur value={selected.userLogin} id="userLogin" labelName="login" placeholder="Login" type="text" onChange={(property, value) => this.onPropertyValueChange(property, value) } onBlur={()=>this.loginExist()}/>
             {loginError===true ? <AlertError message="Login already Exist / Please change it"/> : null }
             <InputIconeBlur value={selected.password} type="password" id="userPassword" labelName="password" placeholder="password" onChange={(property, value) => this.onPropertyValueChange(property, value) } onBlur={()=>this.onPassWordChande()} />
             {confirmation === false ? <AlertError message="confirmation error"/> : null }
             <InputIconeBlur value={selected.confirmation} type="password" id="confirmation" labelName="Confirmation" placeholder="confirmation" onChange={(property, value) => this.onPropertyValueChange(property, value) } onBlur={()=>this.onPassWordChande()} />
             
             <button onClick={() => this.onToSubmit()} >{buttonValue} </button>
            
            </div>
             <ul className="list-item">
                 {data.map((x) => 
                      <li key={x.userId} >
                         <span className="item-description">{x.userName}</span>
                         <div className ="right-pos">
                            <button className="button-modify" onClick={() => this.handleClick(x.userId)}>Modifier</button> 
                            <button className="button-delete" onClick={() => this.handleDelete(x.userId)}>Supprimer</button>
                         </div>
                    </li>
                 )}
             </ul>
             </div>
            
         )
     }
}

export default Administrator