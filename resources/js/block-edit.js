/**
 * Handles the edit component for the breadcrumbs block.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2023, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-breadcrumbs
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

// Third-party dependencies.
import classnames from 'classnames';

// WordPress dependencies.
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';

import {
	BlockControls,
	InspectorControls,
	JustifyContentControl,
	useBlockProps
} from '@wordpress/block-editor';

// Prevent breadcrumb link events when users click them.
const preventDefault = ( event ) => event.preventDefault();

// Define allowed justification controls.
const justifyOptions = [ 'left', 'center', 'right' ];

// Exports the breadcrumbs block type edit function.
export default ( {
	attributes: {
		itemsJustification,
		showOnHomepage,
		showTrailEnd
	},
	setAttributes
} ) => {
	// =====================================================================
	// Build the block toolbar controls.
	// =====================================================================

	const toolbarControls = (
		<BlockControls group="block">
			<JustifyContentControl
				allowedControls={ justifyOptions }
				value={ itemsJustification }
				onChange={ ( value ) => setAttributes( {
					itemsJustification: value
				} ) }
				popoverProps={ {
					position: 'bottom right',
					variant: 'toolbar'
				} }
			/>
		</BlockControls>
	);

	// =====================================================================
	// Build the block inspector sidebar controls.
	// =====================================================================

	const showOnHomepageControl = (
		<ToggleControl
			label={ __( 'Show on homepage', 'x3p0-breadcrumbs' ) }
			help={
				showOnHomepage
				? __( 'Breadcrumbs display on the homepage.', 'x3p0-breadcrumbs' )
				: __( 'Breadcrumbs hidden on the homepage.', 'x3p0-breadcrumbs' )
			}
			checked={ showOnHomepage }
			onChange={ () => setAttributes( {
				showOnHomepage: ! showOnHomepage
			} ) }
		/>
	);

	const showTrailEndControl = (
		<ToggleControl
			label={ __( 'Show last breadcrumb', 'x3p0-breadcrumbs' ) }
			help={
				showTrailEnd
				? __( 'Current page item is shown.', 'x3p0-breadcrumbs' )
				: __( 'Current page item is hidden.', 'x3p0-breadcrumbs' )
			}
			checked={ showTrailEnd }
			onChange={ () =>
				setAttributes( {
					showTrailEnd: ! showTrailEnd
				} )
			}
		/>
	);

	const settingsControls = (
		<InspectorControls group="settings">
			<PanelBody title={
				__( 'Breadcrumb settings', 'x3p0-breadcrumbs' )
			}>
				{ showOnHomepageControl }
				{ showTrailEndControl }
			</PanelBody>
		</InspectorControls>
	);

	// =====================================================================
	// Build the block output for the content canvas.
	// =====================================================================

	// Get the blockProps and add custom classes.
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `items-justified-${ itemsJustification }` ] : itemsJustification
		} )
	} );

	const crumbs = [
		{ type: 'home', label: __( 'Home',         'x3p0-breadcrumbs' ), link: true  },
		{ type: 'post', label: __( 'Parent Page',  'x3p0-breadcrumbs' ), link: true  },
		{ type: 'post', label: __( 'Current Page', 'x3p0-breadcrumbs' ), link: false }
	];

	const crumb = ( crumb, index ) => {
		const CrumbContent = crumb.link ? 'a' : 'span';

		return (
			<li
				key={ index }
				className={ `wp-block-x3p0-breadcrumbs__crumb wp-block-x3p0-breadcrumbs__crumb--${ crumb.type }` }
				itemProp="itemListElement"
				itemScope
				itemType="https://schema.org/ListItem"
			>
				<CrumbContent
					href={ crumb.link ? '#breadcrumbs-pseudo-link' : null }
					onClick={ preventDefault }
					className="wp-block-x3p0-breadcrumbs__crumb-content"
					itemProp="item"
				>
					<span itemProp="name">{ crumb.label }</span>
				</CrumbContent>
				<meta itemProp="position" content={ index + 1 } />
			</li>
		)
	};

	// Builds an preview breadcrumbs trail for the editor.
	const trail = (
		<ul className="wp-block-x3p0-breadcrumbs__trail" itemScope="" itemType="https://schema.org/BreadcrumbList">
			{ crumbs.map( ( item, index ) => crumb( item, index ) ) }
		</ul>
	);

	// Return the final block edit component.
	return (
		<>
			{ toolbarControls }
			{ settingsControls }
			<nav { ...blockProps }>
				{ trail }
			</nav>
		</>
	);
};