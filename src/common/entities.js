import {getCustomerID} from './SessionService'
export function admin() {
        var admin = {};
        admin.userId = "";
        admin.userName = "";
        admin.userLogin = "";
        admin.userPassword = "";
        admin.confirmation = "";
        return admin;
}

export function Customer() {
        var customer = {};
        customer.PK = "";
        customer.customerFistName = "";
        customer.customerLastName = "";
        customer.customerPhoneNumber = "";
        customer.customerEMailAddress = "";
        customer.customerLogin = "";
        customer.customerPassword = "";
        customer.confirmation = "";
        return customer;
}

export function Driver() {
        var driver = {};
        driver.PK = getCustomerID();
        driver.drivingPermitNumber = "";
        driver.carRegistrationNumber = "";
        driver.carYear = "";
        driver.FK_carmodel = "";
        driver.FK_carcolor = ""
        return driver;
}

export function Hours(){
        var times = {};
        times.id = "";
        times.hour = "";
        times.displayOrder = 0;
        return times;
}

export function Routes() {
        var route = {};
        route.routeDate = new Date();
        route.routePlace = "";
        route.routePrice = "";
        route.FK_Hour ="";
        route.FK_Driver ="";
        route.FK_DepartureStage="";
        route.FK_ArrivalStage = "";
        return route;
}

export function InternalRoutes() {
        var route = {};
        route.fromStation = "";
	route.toStation = "";
	route.startDate = "";
	route.endDate = "";
 	route.fromHour = "";
  	route.toHour ="";
        return route;
}

export function MakeStation() {
        var newObject = {};
        newObject.id = "";
        newObject.stationName = "";
        newObject.stationAddress = "";
        newObject.fkZone = "";
        newObject.stationDetail ="";
        return newObject;
}