export function ChangePropertyValue(obj, prop, newValue)
{
    if (obj.hasOwnProperty(prop)) obj[prop] = newValue;
}
export function isObjectComplete(obj) {
    if (typeof obj !== "object") return false;
    var ok = true;
    Object.values(obj).forEach(value => {
       if (value === "") ok = false;
      });

      return ok;
}

export function  yearValidation(year) {

    var text = /^[0-9]+$/;
   
      if (year !== 0) {
          if ((year !== "") && (!text.test(year))) {
  
              return false;
          }
  
          if (year.length !== 4) {
              return false;
          }
          var current_year=new Date().getFullYear();
          if((year < 1980) || (year > current_year))
              {
              return false;
              }
          return true;
      }
    
  }
  