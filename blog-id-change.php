<?php
/**
 * For testing purposes
 */

add_action( 'admin_menu', 'as_submenu', 11 );

function as_submenu() {
	add_menu_page(
		'Blog ID change',
		'Blog ID change',
		'manage_woocommerce',
		'/blog_id_change',
		'as_page',
		null,
		'55.8'
	);
}

function as_page() {
	include( plugin_dir_path( __FILE__ ) . 'blog-id-change.html');
}
