import paymaya from 'paymaya-js-sdk';
import { useEffect } from 'react';

function App() {
  const exampleCheckoutObject = {
    "totalAmount": {
      "value": 100,
      "currency": "PHP",
      "details": {
        "discount": 0,
        "serviceCharge": 0,
        "shippingFee": 0,
        "tax": 0,
        "subtotal": 100
      }
    },
    "buyer": {
      "firstName": "John",
      "middleName": "Paul",
      "lastName": "Doe",
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
        "name": "Canvas Slip Ons",
        "quantity": 1,
        "code": "CVG-096732",
        "description": "Shoes",
        "amount": {
          "value": 100,
          "details": {
            "discount": 0,
            "serviceCharge": 0,
            "shippingFee": 0,
            "tax": 0,
            "subtotal": 100
          }
        },
        "totalAmount": {
          "value": 100,
          "details": {
            "discount": 0,
            "serviceCharge": 0,
            "shippingFee": 0,
            "tax": 0,
            "subtotal": 100
          }
        }
      }
    ],
    "redirectUrl": {
      "success": "http://localhost:3000",
      "failure": "http://localhost:3000",
      "cancel": "http://localhost:3000"
    },
    "requestReferenceNumber": "1551191039",
    "metadata": {}
  };
  useEffect(() => {
    paymaya.init('pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah', true);
    paymaya.createCheckout(exampleCheckoutObject);
    // paymaya.createCreditCardForm(document.querySelector("#paymaya-view"),{...exampleCheckoutObject, buttonText: "Proceed"})
  }, []);
  return (
    <div className="App" id="paymaya-view">
      {/* paymaya test */}
    </div>
  );
}

export default App;
