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
    let customer = JSON.parse(sessionStorage.getItem('customer'));
   return customer !== undefined && customer !== null ? customer.PK : null; 
}

export function getCustomerName() {
    return sessionStorage.getItem('customer') !== null ? JSON.parse(sessionStorage.getItem('customer')).customerFistName : null;
}
