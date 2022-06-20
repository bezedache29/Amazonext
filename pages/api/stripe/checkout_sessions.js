const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (req.method === 'POST') {

    const price = await stripe.prices.create({
      product: getRandomInt(1, 99999),
      unit_amount: Number(req.body.total),
      currency: 'eur',
    });

    console.log(price)

    // try {
    //   // Create Checkout Sessions from body params.
    //   const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //       {
    //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //         price: price,
    //         quantity: 1,
    //       },
    //     ],
    //     mode: 'payment',
    //     success_url: `${req.headers.origin}/?success=true`,
    //     cancel_url: `${req.headers.origin}/?canceled=true`,
    //   });
    //   res.redirect(303, session.url);
    // } catch (err) {
    //   res.status(err.statusCode || 500).json(err.message);
    // }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}