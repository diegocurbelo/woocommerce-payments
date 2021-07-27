/** @format */

/**
 * External dependencies
 */
import { render, waitFor, screen } from '@testing-library/react';
import { useStripe } from '@stripe/react-stripe-js';

/**
 * Internal dependencies
 */
import PaymentRequestDemoButton from '../payment-request-demo-button';

// Setup mocks for modules
jest.mock( '@stripe/react-stripe-js', () => ( {
	useStripe: jest.fn(),
	PaymentRequestButtonElement: jest
		.fn()
		.mockImplementation( () => <div>PaymentRequestButtonElement</div> ),
} ) );

const paymentRequestMock = jest.fn().mockImplementation( () => {
	return {
		canMakePayment: () => Promise.resolve( true ),
	};
} );

const stripeMock = {
	paymentRequest: paymentRequestMock,
};

describe( 'PaymentRequestButtonPreview', () => {
	it( 'renders payment request button if stripe is loaded properly', async () => {
		useStripe.mockReturnValue( stripeMock );

		render(
			<PaymentRequestDemoButton
				setIsLoading={ jest.fn() }
				paymentRequest={ true }
				setPaymentRequest={ jest.fn() }
			/>
		);
		await waitFor( () =>
			expect(
				screen.getByText( 'PaymentRequestButtonElement' )
			).toBeInTheDocument()
		);
	} );

	it( 'renders nothing if stripe is not loaded properly', () => {
		useStripe.mockImplementation( () => null );

		render(
			<PaymentRequestDemoButton
				setIsLoading={ jest.fn() }
				paymentRequest={ false }
				setPaymentRequest={ jest.fn() }
			/>
		);

		expect(
			screen.queryByText( 'PaymentRequestButtonElement' )
		).toBeNull();
	} );
} );
