export function setLogin() {
    sessionStorage.setItem('isLog', true);
}

export function isLog() {
    return sessionStorage.getItem('isLog') === "true" ? true : false;
}

export function setDriver() {
    sessionStorage.setItem('driver', true);
}

export function isDriver() {
   
    return sessionStorage.getItem('driver') === "true" ? true : false;
}

export function setCustomer(customer) {
    sessionStorage.setItem('customer', customer);
}

export function getCustomerID() {
   return JSON.parse(sessionStorage.getItem('customer')).PK; 
}

export function getCustomerName() {
    return JSON.parse(sessionStorage.getItem('customer')).customerFistName;
}