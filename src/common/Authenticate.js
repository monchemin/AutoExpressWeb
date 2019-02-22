const Authenticate = {
   
    Admin() {
       let  isAuthenticated =  false
      if(sessionStorage.getItem("isAdminLogged")  !== null) {
          isAuthenticated = true
         }
        return isAuthenticated
    },
    Customer() {
      let  isAuthenticated =  false
      if(sessionStorage.getItem("isCustomerLogged")  !== null) {
        isAuthenticated = true
       }
       return isAuthenticated;
    }
    
  };

  export default Authenticate;