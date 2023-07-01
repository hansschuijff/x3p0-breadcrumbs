<?php
/**
 * Week query class.
 *
 * Called to build breadcrumbs on weekly archive pages.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2009-2023 Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-breadcrumbs
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

namespace X3P0\Breadcrumbs\Query;

/**
 * Week query sub-class.
 *
 * @since  1.0.0
 * @access public
 */
class WeekArchive extends Base {

	/**
	 * Builds the breadcrumbs.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function make() {

		// Build network crumbs.
		$this->breadcrumbs->build( 'Network' );

		// Add site home crumb.
		$this->breadcrumbs->crumb( 'Home' );

		// Build rewrite front crumbs.
		$this->breadcrumbs->build( 'RewriteFront' );

		// Add the year and week crumbs.
		$this->breadcrumbs->crumb( 'Year' );
		$this->breadcrumbs->crumb( 'Week' );

		// Build paged crumbs.
		$this->breadcrumbs->build( 'Paged' );
	}
}
