import {default as axios} from 'axios';
import Config from '../config';

const API = Config.API_HOST + "customer.php";
const APIDRIVER = Config.API_HOST + "driver.php";
const APIROUTE = Config.API_HOST + "route.php";
const APISERACH = Config.API_HOST + "internalroutes.php";
const APIROUTEDETAIL = Config.API_HOST + "routedetails.php";
const APIRESERVATION = Config.API_HOST + "reservation.php";
//const API = "http://localhost/autoexpress/api/customer"

export function onFetchData(){
  return new Promise((resolver, reject) => {
    axios.get(API)
    .then(result => { resolver(result.data) }
    )
    .catch(error => console.log(error))
  })
}

export function onLoginCheck(data){
  return new Promise((resolver, reject) => {
    axios.post(API, data, Config.HEADER)
    .then(result => { resolver(result.data) }
    )
    .catch(error => console.log(error))
  })
}

export function AddDriver(data){
  
  return new Promise((resolver, reject) => {
    axios.post(APIDRIVER, data, Config.HEADER)
    .then(result => { resolver(result.data) }
    )
    .catch(error => console.log(error))
  })
}

export function AddRoute(data){
  return new Promise((resolver, reject) => {
    axios.post(APIROUTE, data, Config.HEADER)
    .then(result => { resolver(result.data) }
    )
    .catch(error => console.log(error))
  })
}

export function DefaultRoutes(){
  
  return new Promise((resolver, reject) => {
    axios.get(APISERACH)
    .then(result => { resolver(result.data) }
    )
    .catch(error => console.log(error))
  })
}

export function SearchRoutes(data) {
  
  return new Promise((resolver, reject) => {
    axios.post(APISERACH, data, Config.HEADER)
    .then(result => { resolver(result.data) }
    )
    .catch(error => console.log(error))
  })
}

export function GetRouteDetail(PK) {
  return new Promise((resolver, reject) => {
    axios.get(APIROUTEDETAIL+"/"+PK)
    .then(result => { resolver(result.data) }
    )
    .catch(error => console.log(error))
  })
}

export function MakeReservation(data) {
  return new Promise((resolver, reject) => {
    axios.post(APIRESERVATION, data, Config.HEADER)
    .then(result => { resolver(result.data) }
    )
    .catch(error => console.log(error))
  })
}
export function toSubmit(method, data){
        var axio;
        let dataToJson = JSON.stringify(data);
        
        switch(method) {
            case "post":
            axio = axios.post(API, dataToJson, Config.HEADER)
            break
            case "put":
            axio = axios.put(API, dataToJson, Config.HEADER)
            break;
            case "del":
            axio = axios.delete(API+"/" + data.PK)
            break;
            default:
            break;
        }
        return new Promise((resolver, reject) => {
        axio.then(result => {
           
            resolver(result.data);
        }
           
        )
        .catch(error => console.log(error))
    })

}