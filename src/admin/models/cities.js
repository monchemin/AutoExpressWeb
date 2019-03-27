import {default as axios} from 'axios';
import Config from '../../config';

const API = Config.API_HOST + "city.php";
//const API = "http://localhost/autoexpress/api/city"

export function onFetchData(){
  return new Promise((resolver, reject) => {
    axios.get(API)
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
           
            if( result.data.status === 200)
            {
                
                onFetchData().then(data => resolver(data))
            }
            else { console.log(result.data)}
        }
           
        )
        .catch(error => console.log(error))
    })
}