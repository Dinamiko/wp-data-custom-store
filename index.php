<?php
/**
 * Plugin Name: WP Data Custom Store
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action('admin_menu', function () {
    add_menu_page(
        'WP Data Custom Store',
        'WP Data Custom Store',
        'manage_options',
        'wp-data-custom-store',
        function() {
            echo '<div id="wp-data-custom-store">React App goes here...</div>';
        }
    );
});

add_action( 'admin_enqueue_scripts', function($page) {
    if($page !== 'toplevel_page_wp-data-custom-store') {
        return;
    }

    $asset_file = require __DIR__ . '/build/index.asset.php';

    wp_register_script(
        'wp-data-custom-store',
        plugins_url( '/build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    wp_enqueue_script( 'wp-data-custom-store' );
});

