let bData_dummy = 
{
  "QOcachingEnabled": 0,
  "activeFavouriteCount": 2,
  "activityTabHeader": "",
  "appExtras": "",
  "businessAddress": "{\"address\":\"1122\",\"locality\":\"zzzzxxx\",\"placeId\":\"ChIJfVMt45EUrjsRPFkE3PLPKkk\",\"city\":\"Mangalore\"}",
  "businessAddressLine1": "1122",
  "businessAddressLine2": "HSR Layout",
  "businessAddressLine3": "Bengaluru",
  "businessDescription": "Long description",
  "businessHandle": "",
  "businessName": "Mahesh Newstore",
  "businessType": "Individual",
  "category": "", 
  "categoryHeader": "",
  "consumerInviteLink": "",
  "consumerInviteText": "",
  "deliveryPricing": "{\"standard\":{\"minimumOrderAmount\":0,\"freeDeliveryAmount\":0,\"deliveryCharge\":0},\"chat\":\"false\",\"custom\":\"\"}",
  "favourite": false,
  "forSearch": false,
  "id": 4,
  "latitude": 12.9128825,
  "longitude": 77.6347516,
  "minAmount": 0,
  "mine": false,
  "objectId": "rKNQ10LdJO",
  "paymentEnabled": false,
  "profilePicUrl": "",
  "profileShared": false,
  "quickOrderEnabled": true,
  "quickOrderUrl": "https://razorpay.com/demo",
  "serviceAreas": "",
  "serviceRadius": 0,
  "storeTimings": "{\"Monday\": [{\"close\": 2259, \"open\": 830}], \"Tuesday\": [{\"close\": 2259, \"open\": 830}], \"Friday\": [{\"close\": 2259, \"open\": 830}], \"Wednesday\": [{\"close\": 2259, \"open\": 830}], \"Thursday\": [{\"close\": 2259, \"open\": 830}], \"Sunday\": [{\"close\": 2259, \"open\": 830}], \"Saturday\": [{\"close\": 2259, \"open\": 830}]}",
  "supplierLoggedInId": "c24017db",
  "totalFavouriteCount": 3,
  "languageType": "None",
  "userPayHidden": false
};
let bData = {};
if(window.Android){
  console.info('GOT NATIVE DATA');
  bData = JSON.parse(window.Android.getBusinessData());  
}else{
  console.info('USING DUMMY DATA');
  bData = bData_dummy;
}

bData.getParseData = function(callback){
  console.log('getting Parse data');
  callback(bData);
}
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