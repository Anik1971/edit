let bData_dummy = 
{
  "QOcachingEnabled": 0,
  "activeFavouriteCount": 0,
  "activityTabHeader": "",
  "appExtras": "",
  "businessAddress": "",
  "businessAddressLine1": "",
  "businessAddressLine2": "",
  "businessAddressLine3": "",
  "businessDescription": "",
  "businessHandle": "",
  "businessName": "",
  "businessType": "",
  "category": "", 
  "categoryHeader": "",
  "consumerInviteLink": "",
  "consumerInviteText": "",
  "deliveryPricing": "",
  "favourite": false,
  "forSearch": false,
  "id": "",
  "latitude": "",
  "longitude": "",
  "minAmount": 0,
  "mine": false,
  "objectId": "",
  "paymentEnabled": false,
  "profilePicUrl": "",
  "profileShared": false,
  "quickOrderEnabled": false,
  "quickOrderUrl": "",
  "serviceAreas": "",
  "serviceRadius": 0,
  "storeTimings": "",
  "supplierLoggedInId": "c24017db",
  "totalFavouriteCount": 0,
  "languageType": "None",
  "userPayHidden": false
};
let bData = {};
bData = bData_dummy;
/*if(window.Android){
  console.info('GOT NATIVE DATA');
  bData = JSON.parse(window.Android.getBusinessData());  
}else{
  console.info('USING DUMMY DATA');
  bData = bData_dummy;
}*/

//converting level 1 nested json strings to Object
for(let key in bData){
  let _currData = bData[key];        
  try{
    bData[key] = JSON.parse(_currData);          
  }catch(e){
    bData[key] = _currData;          
  }        
}
export default bData;