export function ChangePropertyValue(obj, prop, newValue)
{
    if (obj.hasOwnProperty(prop)) obj[prop] = newValue;
}

