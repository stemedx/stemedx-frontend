"use client"

import getStripe from "@/lib/services/payments/stripe";
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider
} from "@stripe/react-stripe-js";

export default function CheckoutComponent({
    clientSecret
}: {
    clientSecret: string;
}) {
    return (
        <EmbeddedCheckoutProvider
            stripe={getStripe()}
            options={{
                clientSecret: clientSecret
            }}
        >
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
    );
}