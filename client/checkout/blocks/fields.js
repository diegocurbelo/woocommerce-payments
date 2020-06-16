/**
 * External dependencies
 */
import {
	Elements,
	ElementsConsumer,
	CardElement,
} from '@stripe/react-stripe-js';
import {
	useEffect,
	useState,
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import generatePaymentMethod from './generate-payment-method.js';
import confirmCardPayment from './confirm-card-payment.js';

const WCPayFields = ( {
	api,
	stripe,
	elements,
	billing: {
		billingData,
	},
	eventRegistration: {
		onPaymentProcessing,
		onCheckoutAfterProcessingWithSuccess,
	},
} ) => {
	const [ state, setState ] = useState( {
		errorMessage: null,
	} );

	const {
		errorMessage,
	} = state;

	// When it's time to process the payment, generate a Stripe payment method object.
	useEffect(
		() => onPaymentProcessing( () => {
			if ( errorMessage ) {
				return {
					type: 'error',
					message: errorMessage,
				};
			}

			const cardElement = elements.getElement( CardElement );
			const paymentElements = {
				card: cardElement,
			};

			return generatePaymentMethod( api, paymentElements, billingData );
		} ),
	[ elements, stripe ] );

	// Once the server has completed payment processing, confirm the intent of necessary.
	useEffect(
		() => onCheckoutAfterProcessingWithSuccess(
			( {
				processingResponse: {
					paymentDetails,
				},
			} ) => (
				confirmCardPayment( api, paymentDetails )
			)
		),
	[ elements, stripe ] );

	const checkForErrors = ( { error } ) => {
		setState( {
			errorMessage: error ? error.message : null,
		} );
	};

	const elementOptions = {
		hidePostalCode: true,
		classes: {
			base: 'wcpay-card-mounted',
		},
	};

	return <CardElement
		options={ elementOptions }
		onChange={ checkForErrors }
	/>;
};

/**
 * Wraps WCPayFields within the necessary Stripe consumer components.
 *
 * @param {Object} props All props given by WooCommerce Blocks.
 * @returns {Object}     The wrapped React element.
 */
const ConsumableWCPayFields = ( { api, ...props } ) => (
	<Elements stripe={ api.getStripe() }>
		<ElementsConsumer>
			{ ( { elements, stripe } ) => (
				<WCPayFields api={ api } elements={ elements } stripe={ stripe } { ...props } />
			) }
		</ElementsConsumer>
	</Elements>
);

export default ConsumableWCPayFields;
