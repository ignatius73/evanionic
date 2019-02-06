export interface Charge{
    amount: number,
    currency: string,
    source: string, // obtained with Stripe.js
    description?: string,
    customer?: string,
    metadata?: {}
   
}