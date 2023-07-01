<?php
/**
 * Home crumb class.
 *
 * Creates the home crumb.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2009-2023 Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-breadcrumbs
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

namespace X3P0\Breadcrumbs\Crumb;

/**
 * Home crumb sub-class.
 *
 * @since  1.0.0
 * @access public
 */
class Home extends Base {

	/**
	 * Returns a label for the crumb.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return string
	 */
	public function label() {

		$network = $this->breadcrumbs->option( 'network' ) && ! is_main_site();

		return $network ? get_bloginfo( 'name' ) : $this->breadcrumbs->label( 'home' );
	}

	/**
	 * Returns a URL for the crumb.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return string
	 */
	public function url() {

		return user_trailingslashit( home_url() );
	}
}
