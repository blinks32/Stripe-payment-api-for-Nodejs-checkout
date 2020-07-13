/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const stripe = require('stripe')('Your KEY HERE');

exports.payWithStripe = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    // request.body.amount = 200.30
    if (request.body.amount == null) {
        console.log('Added Card Only')
        stripe.customers.create({
                email: request.body.email || 'salah@gmail.com',
                source: request.body.src || 'derrreerweqqeq',
            }).then((charge) => {
                // asynchronously called
                response.send(charge);
            })
            .catch(err => {
                response.send(err);
            });

    } else {
        console.log('Made A Payment', request.body.amount);
        // eslint-disable-next-line promise/catch-or-return
        stripe.charges.create({
                amount: request.body.amount || 200.97,
                currency: 'usd',
                customer: request.body.customer || 'ddddaddada',
            }).then((charge) => {
                // asynchronously called
                response.send(charge);
                console.log(charge)
            })
            .catch(err => {
                response.send(err);
                console.log(err)
            });

    }

});