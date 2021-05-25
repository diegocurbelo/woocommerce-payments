/**
 * Internal dependencies
 */
import {
	getSettings,
	getIsWCPayEnabled,
	getEnabledPaymentMethodIds,
	getIsManualCaptureEnabled,
	getAccountStatementDescriptor,
	isSavingSettings,
	getDigitalWalletsLocations,
	getIsDigitalWalletsEnabled,
} from '../selectors';

describe( 'Settings selectors tests', () => {
	describe( 'getSettings()', () => {
		test( 'returns the value of state.settings.data', () => {
			const state = {
				settings: {
					data: {
						foo: 'bar',
					},
				},
			};

			expect( getSettings( state ) ).toEqual( { foo: 'bar' } );
		} );

		test.each( [ [ undefined ], [ {} ], [ { settings: {} } ] ] )(
			'returns {} if key is missing (tested state: %j)',
			( state ) => {
				expect( getSettings( state ) ).toEqual( {} );
			}
		);
	} );

	describe( 'getIsWCPayEnabled()', () => {
		test( 'returns the value of state.settings.data.is_wcpay_enabled', () => {
			const state = {
				settings: {
					data: {
						// eslint-disable-next-line camelcase
						is_wcpay_enabled: true,
					},
				},
			};

			expect( getIsWCPayEnabled( state ) ).toBeTruthy();
		} );

		test.each( [
			[ undefined ],
			[ {} ],
			[ { settings: {} } ],
			[ { settings: { data: {} } } ],
		] )( 'returns false if missing (tested state: %j)', ( state ) => {
			expect( getIsWCPayEnabled( state ) ).toBeFalsy();
		} );
	} );

	describe( 'getEnabledPaymentMethodIds()', () => {
		test( 'returns the value of state.settings.data.enabled_payment_method_ids', () => {
			const state = {
				settings: {
					data: {
						// eslint-disable-next-line camelcase
						enabled_payment_method_ids: [ 'foo', 'bar' ],
					},
				},
			};

			expect( getEnabledPaymentMethodIds( state ) ).toEqual( [
				'foo',
				'bar',
			] );
		} );

		test.each( [
			[ undefined ],
			[ {} ],
			[ { settings: {} } ],
			[ { settings: { data: {} } } ],
		] )( 'returns [] if missing (tested state: %j)', ( state ) => {
			expect( getEnabledPaymentMethodIds( state ) ).toEqual( [] );
		} );
	} );

	describe( 'isSavingSettings()', () => {
		test( 'returns the value of state.settings.isSaving', () => {
			const state = {
				settings: {
					isSaving: true,
				},
			};

			expect( isSavingSettings( state ) ).toBeTruthy();
		} );

		test.each( [ [ undefined ], [ {} ], [ { settings: {} } ] ] )(
			'returns false if missing (tested state: %j)',
			( state ) => {
				expect( isSavingSettings( state ) ).toBeFalsy();
			}
		);
	} );

	describe( 'getIsManualCaptureEnabled()', () => {
		test( 'returns the value of state.settings.data.is_manual_capture_enabled', () => {
			const state = {
				settings: {
					data: {
						// eslint-disable-next-line camelcase
						is_manual_capture_enabled: true,
					},
				},
			};

			expect( getIsManualCaptureEnabled( state ) ).toBeTruthy();
		} );

		test.each( [
			[ undefined ],
			[ {} ],
			[ { settings: {} } ],
			[ { settings: { data: {} } } ],
		] )( 'returns false if missing (tested state: %j)', ( state ) => {
			expect( getIsManualCaptureEnabled( state ) ).toBeFalsy();
		} );
	} );

	describe( 'getAccountStatementDescriptor()', () => {
		test( 'returns the value of state.settings.data.account_statement_descriptor', () => {
			const state = {
				settings: {
					data: {
						// eslint-disable-next-line camelcase
						account_statement_descriptor: 'my account statement',
					},
				},
			};

			expect( getAccountStatementDescriptor( state ) ).toEqual(
				'my account statement'
			);
		} );

		test.each( [
			[ undefined ],
			[ {} ],
			[ { settings: {} } ],
			[ { settings: { data: {} } } ],
		] )( 'returns false if missing (tested state: %j)', ( state ) => {
			expect( getAccountStatementDescriptor( state ) ).toEqual( '' );
		} );
	} );

	describe( 'getIsDigitalWalletsEnabled()', () => {
		test( 'returns the value of state.settings.data.is_digital_wallets_enabled', () => {
			const state = {
				settings: {
					data: {
						// eslint-disable-next-line camelcase
						is_digital_wallets_enabled: true,
					},
				},
			};

			expect( getIsDigitalWalletsEnabled( state ) ).toBeTruthy();
		} );

		test.each( [
			[ undefined ],
			[ {} ],
			[ { settings: {} } ],
			[ { settings: { data: {} } } ],
		] )( 'returns false if missing (tested state: %j)', ( state ) => {
			expect( getIsDigitalWalletsEnabled( state ) ).toBeFalsy();
		} );
	} );

	describe( 'getDigitalWalletsLocations()', () => {
		test( 'returns the value of state.settings.data.digital_wallets_enabled_locations', () => {
			const state = {
				settings: {
					data: {
						// eslint-disable-next-line camelcase
						digital_wallets_enabled_locations: {
							// eslint-disable-next-line camelcase
							product_page: true,
							checkout: false,
							cart: true,
						},
					},
				},
			};

			expect( getDigitalWalletsLocations( state ) ).toEqual( {
				// eslint-disable-next-line camelcase
				product_page: true,
				checkout: false,
				cart: true,
			} );
		} );

		test.each( [
			[ undefined ],
			[ {} ],
			[ { settings: {} } ],
			[ { settings: { data: {} } } ],
		] )( 'returns {} if missing (tested state: %j)', ( state ) => {
			expect( getDigitalWalletsLocations( state ) ).toEqual( {} );
		} );
	} );
} );
