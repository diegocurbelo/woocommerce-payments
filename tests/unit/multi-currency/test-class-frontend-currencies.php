<?php
/**
 * Class WCPay_Multi_Currency_Frontend_Currencies_Tests
 *
 * @package WooCommerce\Payments\Tests
 */

use WCPay\MultiCurrency\Currency;
use WCPay\MultiCurrency\FrontendCurrencies;
use WCPay\MultiCurrency\MultiCurrency;

/**
 * FrontendCurrencies unit tests.
 *
 * @group frontend-tests
 */
class WCPay_Multi_Currency_Frontend_Currencies_Tests extends WP_UnitTestCase {
	/**
	 * Mock WC_Payments_Localization_Service.
	 *
	 * @var WC_Payments_Localization_Service|PHPUnit_Framework_MockObject_MockObject
	 */
	private $mock_localization_service;

	/**
	 * Mock MultiCurrency.
	 *
	 * @var MultiCurrency|PHPUnit_Framework_MockObject_MockObject
	 */
	private $mock_multi_currency;

	/**
	 * FrontendCurrencies instance.
	 *
	 * @var FrontendCurrencies
	 */
	private $frontend_currencies;

	public function setUp() {
		parent::setUp();

		$this->mock_localization_service = $this->createMock( WC_Payments_Localization_Service::class );
		$this->mock_multi_currency       = $this->createMock( MultiCurrency::class );

		$this->frontend_currencies = new FrontendCurrencies( $this->mock_multi_currency, $this->mock_localization_service );
	}

	public function tearDown() {
		remove_all_filters( 'wcpay_multi_currency_currency_settings' );

		parent::tearDown();
	}

	/**
	 * @dataProvider woocommerce_filter_provider
	 */
	public function test_registers_woocommerce_filter( $filter, $function_name ) {
		$this->assertGreaterThan(
			10,
			has_filter( $filter, [ $this->frontend_currencies, $function_name ] ),
			"Filter '$filter' was not registered with '$function_name' with a priority higher than the default"
		);
	}

	public function woocommerce_filter_provider() {
		return [
			[ 'woocommerce_currency', 'get_woocommerce_currency' ],
			[ 'wc_get_price_decimals', 'get_price_decimals' ],
			[ 'wc_get_price_decimal_separator', 'get_price_decimal_separator' ],
			[ 'wc_get_price_thousand_separator', 'get_price_thousand_separator' ],
			[ 'woocommerce_price_format', 'get_woocommerce_price_format' ],
			[ 'woocommerce_cart_hash', 'add_currency_to_cart_hash' ],
		];
	}

	public function test_get_woocommerce_currency() {
		$current_currency = new Currency( 'USD' );
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( $current_currency );

		$this->assertSame( 'USD', $this->frontend_currencies->get_woocommerce_currency() );
	}

	public function test_get_price_decimals_returns_num_decimals() {
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( new Currency( 'EUR' ) );
		$this->mock_localization_service->method( 'get_currency_format' )->with( 'EUR' )->willReturn( [ 'num_decimals' => 3 ] );

		$this->assertEquals( 3, $this->frontend_currencies->get_price_decimals( 2 ) );
	}

	public function test_get_price_decimals_returns_original_when_the_currency_is_same() {
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( new Currency( 'USD' ) );
		$this->mock_localization_service->method( 'get_currency_format' )->with( 'USD' )->willReturn( [ 'num_decimals' => 3 ] );

		$this->assertEquals( 2, $this->frontend_currencies->get_price_decimals( 2 ) );
	}

	public function test_get_price_decimal_separator_returns_decimal_sep() {
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( new Currency( 'EUR' ) );
		$this->mock_localization_service->method( 'get_currency_format' )->with( 'EUR' )->willReturn( [ 'decimal_sep' => '.' ] );

		$this->assertEquals( '.', $this->frontend_currencies->get_price_decimal_separator( ',' ) );
	}

	public function test_get_price_decimal_separator_returns_original_decimal_sep_when_the_currency_is_same() {
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( new Currency( 'USD' ) );
		$this->mock_localization_service->method( 'get_currency_format' )->with( 'USD' )->willReturn( [ 'decimal_sep' => '.' ] );

		$this->assertEquals( ',', $this->frontend_currencies->get_price_decimal_separator( ',' ) );
	}

	public function test_get_price_thousand_separator_returns_thousand_sep() {
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( new Currency( 'EUR' ) );
		$this->mock_localization_service->method( 'get_currency_format' )->with( 'EUR' )->willReturn( [ 'thousand_sep' => ',' ] );

		$this->assertEquals( ',', $this->frontend_currencies->get_price_thousand_separator( '.' ) );
	}

	public function test_get_price_thousand_separator_returns_original_thousand_sep_when_the_currency_is_same() {
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( new Currency( 'USD' ) );
		$this->mock_localization_service->method( 'get_currency_format' )->with( 'USD' )->willReturn( [ 'thousand_sep' => ',' ] );

		$this->assertEquals( '.', $this->frontend_currencies->get_price_thousand_separator( '.' ) );
	}

	public function test_get_woocommerce_price_format_returns_format_for_currency_pos() {
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( new Currency( 'EUR' ) );
		$this->mock_localization_service->method( 'get_currency_format' )->with( 'EUR' )->willReturn( [ 'currency_pos' => 'left' ] );

		$this->assertEquals( '%1$s%2$s', $this->frontend_currencies->get_woocommerce_price_format( '%2$s%1$s' ) );
	}

	public function test_get_woocommerce_price_format_returns_original_format_for_currency_pos_when_the_currency_is_same() {
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( new Currency( 'USD' ) );
		$this->mock_localization_service->method( 'get_currency_format' )->with( 'USD' )->willReturn( [ 'currency_pos' => 'left' ] );

		$this->assertEquals( '%2$s%1$s', $this->frontend_currencies->get_woocommerce_price_format( '%2$s%1$s' ) );
	}

	/**
	 * @dataProvider currency_format_provider
	 */
	public function test_get_woocommerce_price_format_outputs_right_format( $currency_pos, $expected_format ) {
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( new Currency( 'EUR' ) );
		$this->mock_localization_service->method( 'get_currency_format' )->with( 'EUR' )->willReturn( [ 'currency_pos' => $currency_pos ] );

		$this->assertEquals( $expected_format, $this->frontend_currencies->get_woocommerce_price_format( $currency_pos ) );
	}

	public function currency_format_provider() {
		return [
			[ '', '%1$s%2$s' ],
			[ 'random_value', '%1$s%2$s' ],
			[ 'left', '%1$s%2$s' ],
			[ 'right', '%2$s%1$s' ],
			[ 'left_space', '%1$s&nbsp;%2$s' ],
			[ 'right_space', '%2$s&nbsp;%1$s' ],
		];
	}

	public function test_add_currency_to_cart_hash_adds_currency_and_rate() {
		$current_currency = new Currency( 'GBP', 0.71 );
		$this->mock_multi_currency->method( 'get_selected_currency' )->willReturn( $current_currency );

		$this->assertSame(
			md5( 'cart_hashGBP0.71' ),
			$this->frontend_currencies->add_currency_to_cart_hash( 'cart_hash' )
		);
	}
}
