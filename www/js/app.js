var AppPot = AppPotSDK.getService({
  url: 'http://trial.apppot.net/apppot/',
  appId: 'testapp',
  appKey: '89a10c6842c7426b8fbd46b710c8a0bd',
  appVersion: '1.0.0',
  companyId: 114,
  groupId: 470
});

var navi;
ons.ready(function() {
  navi = document.getElementById('navi');
  document.getElementById('userName').value = "ncdctest2017090501";
  document.getElementById('password').value = "k2tlinm8";
});

var customerData;

function login() {
  var userName = document.getElementById('userName').value;
  var password = document.getElementById('password').value;
  
  AppPot.LocalAuthenticator.login(userName, password)
  .then(() => {
    console.log("Logined.");
    navi.pushPage('list.html').then(getCustomerList);
  })
  .catch((error) => {
    alert('ログインに失敗しました');
  });
}

function getCustomerList() {
  AppPot.Gateway.get("customer-db", "CustomerCompany", null, null, null)
  .then((response) => {
    console.log(JSON.stringify(response));
    var list = document.getElementById('customerList');
    list.innerHTML = '';
    customerData = response.CustomerCompany || [];
    customerData.forEach((customer, index) => {
      var template = '<ons-list-item modifier="chevron" onclick="showCustomerData(' + index + ')">' + customer.companyName + '</ons-list-item>';
      ons.createElement(template, { append: list });
    }); 
  });
}

function showCustomerData(index) {
  AppPot.Gateway.get("customer-db", "CustomerCompany", null, null, null)
  .then((response) => {
    navi.pushPage('detail.html')
    .then((page) => {
      page.querySelector('[name="companyName"]>div').textContent = customerData[index].companyName;
      page.querySelector('[name="companyNameKana"]>div').textContent = customerData[index].companyNameKana;
      page.querySelector('[name="zipCode"]>div').textContent = customerData[index].zipCode;
      page.querySelector('[name="address"]>div').textContent = customerData[index].address;
      page.querySelector('[name="phoneNumber"]>div').innerHTML = '<a href="tel:' + customerData[index].phoneNumber + '">' + customerData[index].phoneNumber + '</a>';
    });
  });
}

function addCustomerData() {
  navi.pushPage('regist.html');
}

function regist() {
  var requestJson = {
    "companyId" : "0001",
    "companyName" : document.getElementById('companyName').value,
    "companyNameKana" : document.getElementById('companyNameKana').value,
    "zipCode" : document.getElementById('zipCode').value,
    "address" : document.getElementById('address').value,
    "phoneNumber" : document.getElementById('phoneNumber').value
  }
  AppPot.Gateway.post("customer-db", "CustomerCompany", null, requestJson, null)
  .then((response) => {
    console.log(response);
    alert("登録しました");
    navi.popPage().then(getCustomerList);
  });
}