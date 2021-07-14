import paymaya from 'paymaya-js-sdk';
import { useEffect } from 'react';

function App() {
  

  const purchase = (transaction,
      token,
      transactionNumber,
      transactionType,
      base_url
    ) => {
    const exampleCheckoutObject = {
      "totalAmount": {
        "value": transaction.transactable.price,
        "currency": "PHP",
        "details": {
          "discount": 0,
          "serviceCharge": 0,
          "shippingFee": 0,
          "tax": 0,
          "subtotal": transaction.transactable.price
        }
      },
      "buyer": {
        "firstName": "",
        "middleName": "",
        "lastName": "",
        "birthday": "1995-10-24",
        "customerSince": "1995-10-24",
        "sex": "M",
        "contact": {
          "phone": "+639181008888",
          "email": "merchant@merchantsite.com"
        },
        "shippingAddress": {
          "firstName": "John",
          "middleName": "Paul",
          "lastName": "Doe",
          "phone": "+639181008888",
          "email": "merchant@merchantsite.com",
          "line1": "6F Launchpad",
          "line2": "Reliance Street",
          "city": "Mandaluyong City",
          "state": "Metro Manila",
          "zipCode": "1552",
          "countryCode": "PH",
          "shippingType": "ST" // ST - for standard, SD - for same day
        },
        "billingAddress": {
          "line1": "6F Launchpad",
          "line2": "Reliance Street",
          "city": "Mandaluyong City",
          "state": "Metro Manila",
          "zipCode": "1552",
          "countryCode": "PH"
        }
      },
      "items": [
        {
          "name": transaction.transactable.title,
          "quantity": 1,
          "code": transaction.transactable.id.toString(),
          "description": "Carrots",
          "amount": {
            "value": transaction.transactable.price,
            "details": {
              "discount": 0,
              "serviceCharge": 0,
              "shippingFee": 0,
              "tax": 0,
              "subtotal": 100
            }
          },
          "totalAmount": {
            "value": transaction.transactable.price,
            "details": {
              "discount": 0,
              "serviceCharge": 0,
              "shippingFee": 0,
              "tax": 0,
              "subtotal": transaction.transactable.price
            }
          }
        }
      ],
      "redirectUrl": {
        "success": `${window.location.origin}?token=${token}&transaction_number=${transactionNumber}&transaction_type=success_payment&url=${base_url}`,
        "failure": `${window.location.origin}?token=${token}&transaction_number=${transactionNumber}&transaction_type=failed_payment&url=${base_url}`,
        "cancel": `${window.location.origin}?token=${token}&transaction_number=${transactionNumber}&transaction_type=cancelled_payment&url=${base_url}`
      },
      "requestReferenceNumber": "1551191039",
      "metadata": {}
    };

    paymaya.init('pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah', true);
    paymaya.createCheckout(exampleCheckoutObject);
  }

  const updateTransaction = async (url, token, transactionType) => {
    let response = await fetch(url + `/verify_payment?transaction_type=${transactionType}`, { 
      method: 'post', 
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      }), 
    })
    .then((res) => res.json())
    .then(res => res)
    console.log({response})
    window.ReactNativeWebView.postMessage("Updated")
  }

  const  init = async () => {
    let searchParams = new URLSearchParams(window.location.search)
    let token = searchParams.get("token")
    let transactionNumber = searchParams.get("transaction_number")
    let transactionType = searchParams.get("transaction_type")
    let base_url = searchParams.get("url")
    
    let url = base_url + '/api/v1/in_app_currency_transactions/' + transactionNumber

    console.log({token, transactionNumber, transactionType, url, base_url})

    let response = await fetch(url, { 
      method: 'get', 
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      }), 
    })
    .then((res) => res.json())
    .then(res => res)
    console.log({response})


    if (response.transaction_number == null) return alert("Something went wrong")
    if (transactionType == "payment"){

        purchase(
          response,
          token,
          transactionNumber,
          transactionType,
          base_url
        )
    }else{

      updateTransaction(url, token, transactionType)
    }
  }

  useEffect(() => {

    init()
  }, []);

  return (
    <div className="App" id="paymaya-view" style={{display: 'flex', alignContent: 'center', justifyContent: 'center', height: '100vh'}}>
      Please wait...
    </div>
  );
}

export default App;
