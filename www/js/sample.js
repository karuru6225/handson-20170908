

var AppPot = AppPotSDK.getService({
  url: 'http://trial.apppot.net/apppot/',
  appId: 'testapp',
  appKey: '89a10c6842c7426b8fbd46b710c8a0bd',
  appVersion: '1.0.0',
  companyId: 114,
  groupId: 470
});

AppPot.LocalAuthenticator.login("ncdctest201707", "ncdctest201707")
.then(function() {
    console.log("Logined.");

    var requestJson = {
        "companyId" : "0001",
        "companyName" : "テスト株式会社",
        "companyNameKana" : "テストカブシキガイシャ",
        "zipCode" : "000-111",
        "address" : "東京都どこか",
        "phoneNumber" : "030-1111-1111"
    }
    AppPot.Gateway.post("customer-db", "CustomerCompany", null, requestJson, null)
    .then((response) => {
        console.log(response);
        AppPot.Gateway.get("customer-db", "CustomerCompany", null, null, null)
        .then((response) => {
            console.log(response);
        });
    });


})
.catch((error) => {
    console.log(error);
});

