/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _frOffcanvas = __webpack_require__(1);

	var _frOffcanvas2 = _interopRequireDefault(_frOffcanvas);

	var _frTabs = __webpack_require__(2);

	var _frTabs2 = _interopRequireDefault(_frTabs);

	var _frAccordion = __webpack_require__(3);

	var _frAccordion2 = _interopRequireDefault(_frAccordion);

	var _navigationPage = __webpack_require__(4);

	var _navigationPage2 = _interopRequireDefault(_navigationPage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//	Set client specific settings

	//	MASTER JS
	//----------------------------------------------------------------------

	var ClientSettings = {
		bpLap: 600,
		bpDesk: 900
	};

	new _frOffcanvas2.default('.js-offcanvas-panel', {
		toggleSelector: '.js-offcanvas-toggle'
	});
	new _frTabs2.default();
	new _frAccordion2.default({
		firstPanelsOpenByDefault: false,
		multiselectable: false
	});
	(0, _navigationPage2.default)();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @param {string} panelSelector 	Off-canvas element
	 * @param {string} toggleSelector 	Button with which to toggle the off-canvas state
	 * @param {object} options			Object containing config overrides
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var FrOffcanvas = function FrOffcanvas() {
		var selector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-offcanvas' : arguments[0];

		var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		var _ref$openSelector = _ref.openSelector;
		var openSelector = _ref$openSelector === undefined ? openSelector = '.js-fr-offcanvas-open' : _ref$openSelector;
		var _ref$closeSelector = _ref.closeSelector;
		var closeSelector = _ref$closeSelector === undefined ? closeSelector = '.js-fr-offcanvas-close' : _ref$closeSelector;
		var _ref$toggleSelector = _ref.toggleSelector;
		var toggleSelector = _ref$toggleSelector === undefined ? toggleSelector = '.js-fr-offcanvas-toggle' : _ref$toggleSelector;
		var _ref$readyClass = _ref.readyClass;
		var readyClass = _ref$readyClass === undefined ? 'has-fr-offcanvas' : _ref$readyClass;
		var _ref$activeClass = _ref.activeClass;
		var activeClass = _ref$activeClass === undefined ? 'fr-offcanvas-is-active' : _ref$activeClass;
		var _ref$panelActiveClass = _ref.panelActiveClass;
		var panelActiveClass = _ref$panelActiveClass === undefined ? 'fr-offcanvas--is-active' : _ref$panelActiveClass;

		//	CONSTANTS
		var doc = document;
		var docEl = doc.documentElement;
		var transitionEventSyntax = {
			transition: 'transitionend',
			WebkitTransition: 'webkitTransitionEnd',
			MozTransition: 'transitionend',
			OTransition: 'oTransitionEnd otransitionend'
		};

		//	SUPPORTS
		if (!'querySelector' in doc || !'addEventListener' in window || !docEl.classList) return;

		//	SETUP
		var panel = doc.querySelector(selector);
		var buttonOpen = doc.querySelector(openSelector);
		var buttonClose = doc.querySelector(closeSelector);
		var buttonToggle = doc.querySelector(toggleSelector);
		var transitionEventName = 'transitionend';

		//	UTILS
		function _defer(func) {
			//	wrapped in setTimeout to delay binding until previous rendering has completed
			if (typeof func === 'function') setTimeout(func, 0);
		}
		function _closest(el, fn) {
			// closest: http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
			return el && (fn(el) ? el : _closest(el.parentNode, fn));
		}

		//	Cross-browser
		function _setTransitionEventPrefix() {
			//	loop through prefixes and return relevant event
			for (var prefix in transitionEventSyntax) {
				if (panel.style[prefix] !== undefined) return transitionEventSyntax[prefix];
			}
		}

		//	A11y
		function _addA11y() {
			//	add aria-hidden attribute
			panel.setAttribute('aria-hidden', true);
		}
		function _removeA11y() {
			//	add aria-hidden attribute
			panel.removeAttribute('aria-hidden');
		}

		//	Events
		function _eventTogglePointer() {
			var panelHidden = panel.getAttribute('aria-hidden') === 'true';
			if (panelHidden) {
				_showPanel();
			} else {
				_hidePanel();
			}
		}
		function _eventOpenPointer() {
			_showPanel();
		}
		function _eventClosePointer() {
			_hidePanel();
		}
		function _eventDocClick(e) {
			//	check if target is panel or child of
			var isPanel = e.target == panel;
			var isPanelChild = _closest(e.target, function (el) {
				if (el != doc) return el.classList.contains(selector.substring(1));
			});
			if (!isPanel && !isPanelChild) _hidePanel();
		}
		function _eventDocKey(e) {
			//	esc key
			if (e.keyCode === 27) _hidePanel();
		}
		function _eventTransitionEnd(e) {
			//	set visibilty property to remove keyboard access
			panel.style.visibility = 'hidden';
			//	transition event not needed
			_unbindTransitionEnd();
		}

		//	Bindings
		function _bindTogglePointer() {
			if (!!buttonToggle) buttonToggle.addEventListener('click', _eventTogglePointer);
		}
		function _bindOpenPointer() {
			if (!!buttonOpen) buttonOpen.addEventListener('click', _eventOpenPointer);
		}
		function _bindClosePointer() {
			if (!!buttonClose) buttonClose.addEventListener('click', _eventClosePointer);
		}
		function _bindDocClick() {
			doc.addEventListener('click', _eventDocClick);
		}
		function _bindDocKey() {
			doc.addEventListener('keydown', _eventDocKey);
		}
		function _bindTransitionEnd() {
			panel.addEventListener(transitionEventName, _eventTransitionEnd);
		}

		//	Unbind
		function _unbindPointer() {
			buttonToggle.removeEventListener('click', _eventPointer);
		}
		function _unbindDocClick() {
			doc.removeEventListener('click', _eventDocClick);
		}
		function _unbindDocKey() {
			doc.removeEventListener('keydown', _eventDocKey);
		}
		function _unbindTransitionEnd() {
			panel.removeEventListener(transitionEventName, _eventTransitionEnd);
		}

		//	Actions
		function _showPanel() {
			//	set visibility to override any previous set style
			panel.style.visibility = 'visible';
			//	remove aria-hidden, add focus
			panel.setAttribute('aria-hidden', false);
			panel.setAttribute('tabindex', -1);
			panel.focus();
			//	bind document close events
			_defer(_bindDocClick); // this isn't working for enter, works for space though. WTF.
			_defer(_bindDocKey);
			//	reset scroll position
			panel.scrollTop = 0;
			//	add active class
			panel.classList.add(panelActiveClass);
			docEl.classList.add(activeClass);
		}
		function _hidePanel() {
			//	add aria-hidden, remove focus
			panel.setAttribute('aria-hidden', true);
			panel.removeAttribute('tabindex');
			panel.blur();
			//	bind transition end
			_bindTransitionEnd();
			//	unbind document events
			_unbindDocKey();
			_unbindDocClick();
			//	remove active class
			panel.classList.remove(panelActiveClass);
			docEl.classList.remove(activeClass);
		}
		function destroy() {
			//	remove attributes
			_removeA11y();
			//	unbind events
			_unbindPointer();
			_unbindDocClick();
			_unbindDocKey();
			//	remove reference
			docEl.classList.remove(readyClass);
		}

		//	INIT
		function init() {
			if (panel) {
				//	detect required properties
				_setTransitionEventPrefix();
				//	set a11y DOM properties
				_addA11y();
				//	set visibilty property to remove keyboard access
				panel.style.visibility = 'hidden';
				//	bind button events
				_bindTogglePointer();
				_bindOpenPointer();
				_bindClosePointer();
				//	set ready class
				docEl.classList.add(readyClass);
			}
		}
		init();

		// REVEAL API
		return {
			init: init,
			destroy: destroy
		};
	};

	// module exports
	exports.default = FrOffcanvas;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// Set Array prototype on NodeList (allows for Array methods on NodeLists)
	// https://gist.github.com/paulirish/12fb951a8b893a454b32 (#gistcomment-1487315)

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	Object.setPrototypeOf(NodeList.prototype, Array.prototype);

	/**
	 * @param {string} selector The selector to match for tab components
	 * @param {object} options Object containing configuration overrides
	 */
	var Frtabs = function Frtabs() {
		var selector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-tabs' : arguments[0];

		var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		var _ref$tablistSelector = _ref.tablistSelector;
		var tablistSelector = _ref$tablistSelector === undefined ? '.fr-tabs__tablist' : _ref$tablistSelector;
		var _ref$activeTabClass = _ref.activeTabClass;
		var activeTabClass = _ref$activeTabClass === undefined ? 'fr-tabs__tab--is-active' : _ref$activeTabClass;
		var _ref$tabpanelSelector = _ref.tabpanelSelector;
		var tabpanelSelector = _ref$tabpanelSelector === undefined ? '.fr-tabs__panel' : _ref$tabpanelSelector;
		var _ref$activePanelClass = _ref.activePanelClass;
		var activePanelClass = _ref$activePanelClass === undefined ? 'fr-tabs__panel--is-active' : _ref$activePanelClass;
		var _ref$tabsReadyClass = _ref.tabsReadyClass;
		var tabsReadyClass = _ref$tabsReadyClass === undefined ? 'has-fr-tabs' : _ref$tabsReadyClass;

		// CONSTANTS
		var doc = document;
		var docEl = doc.documentElement;

		// SUPPORTS
		if (!'querySelector' in doc || !'addEventListener' in window || !docEl.classList) return;

		// SETUP
		// set tab element NodeLists
		var tabContainers = doc.querySelectorAll(selector);
		var tabLists = doc.querySelectorAll(tablistSelector);
		var tabListItems = doc.querySelectorAll(tablistSelector + ' li');
		var tabs = doc.querySelectorAll(tablistSelector + ' a');
		var tabpanels = doc.querySelectorAll(tabpanelSelector);

		// UTILS
		// closest: http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
		function _closest(el, fn) {
			return el && (fn(el) ? el : _closest(el.parentNode, fn));
		}

		// A11Y
		function _addA11y() {
			// add role="tablist" to ul
			tabLists.forEach(function (tabList) {
				tabList.setAttribute('role', 'tablist');
			});

			// add role="presentation" to li
			tabListItems.forEach(function (tabItem) {
				tabItem.setAttribute('role', 'presentation');
			});

			// add role="tab" and aria-controls to anchor
			tabs.forEach(function (tab) {
				tab.setAttribute('role', 'tab');
				tab.setAttribute('aria-controls', tab.hash.substring(1));
			});

			// add role="tabpanel" to section
			tabpanels.forEach(function (tabpanel) {
				tabpanel.setAttribute('role', 'tabpanel');
				// make first child of tabpanel focusable if available
				if (tabpanel.children) {
					tabpanel.children[0].setAttribute('tabindex', 0);
				}
			});
		}

		function _removeA11y() {
			// remove role="tablist" from ul
			tabLists.forEach(function (tabList) {
				tabList.removeAttribute('role');
			});

			// remove role="presentation" from li
			tabListItems.forEach(function (tabItem) {
				tabItem.removeAttribute('role');
			});

			// remove role="tab" and aria-controls from anchor
			tabs.forEach(function (tab) {
				tab.removeAttribute('role');
				tab.removeAttribute('aria-controls');
			});

			// remove role="tabpanel" from section
			tabpanels.forEach(function (tabpanel) {
				tabpanel.removeAttribute('role');
				// remove first child focusability if present
				if (tabpanel.children) {
					tabpanel.children[0].removeAttribute('tabindex');
				}
			});
		}

		// EVENTS
		function _eventTabClick(e) {
			_showTab(e.target);
			e.preventDefault(); // look into remove id/settimeout/reinstate id as an alternative to preventDefault
		}

		function _eventTabKeydown(e) {
			// collect tab targets, and their parents' prev/next (or first/last - this is honkin dom traversing)
			var currentTab = e.target;
			var previousTabItem = currentTab.parentNode.previousElementSibling || currentTab.parentNode.parentNode.lastElementChild;
			var nextTabItem = currentTab.parentNode.nextElementSibling || currentTab.parentNode.parentNode.firstElementChild;

			// catch left/ and right arrow key events
			// if new next/prev tab available, show it by passing tab anchor to _showTab method
			switch (e.keyCode) {
				case 37:
				case 38:
					_showTab(previousTabItem.querySelector('[role="tab"]'));
					e.preventDefault();
					break;
				case 39:
				case 40:
					_showTab(nextTabItem.querySelector('[role="tab"]'));
					e.preventDefault();
					break;
				default:
					break;
			}
		}

		// ACTIONS
		function _showTab(target) {
			var giveFocus = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			// get context of tab container and its children
			var thisContainer = _closest(target, function (el) {
				return el.classList.contains(selector.substring(1));
			});
			var siblingTabs = thisContainer.querySelectorAll(tablistSelector + ' a');
			var siblingTabpanels = thisContainer.querySelectorAll(tabpanelSelector);

			// set inactives
			siblingTabs.forEach(function (tab) {
				tab.setAttribute('tabindex', -1);
				tab.classList.remove(activeTabClass);
			});
			siblingTabpanels.forEach(function (tabpanel) {
				tabpanel.setAttribute('aria-hidden', 'true');
			});

			// set actives and focus
			target.setAttribute('tabindex', 0);
			target.classList.add(activeTabClass);
			if (giveFocus) target.focus();
			doc.getElementById(target.getAttribute('aria-controls')).removeAttribute('aria-hidden');
		}

		// BINDINGS
		function _bindTabsEvents() {
			// bind all tab click and keydown events
			tabs.forEach(function (tab) {
				tab.addEventListener('click', _eventTabClick);
				tab.addEventListener('keydown', _eventTabKeydown);
			});
		}

		function _unbindTabsEvents() {
			// unbind all tab click and keydown events
			tabs.forEach(function (tab) {
				tab.removeEventListener('click', _eventTabClick);
				tab.removeEventListener('keydown', _eventTabKeydown);
			});
		}

		// DESTROY
		function destroy() {
			_removeA11y();
			_unbindTabsEvents();
			docEl.classList.remove(tabsReadyClass);
		}

		// INIT
		function init() {
			if (tabContainers.length) {
				_addA11y();
				_bindTabsEvents();
				// set all first tabs active on init
				tabContainers.forEach(function (tabContainer) {
					_showTab(tabContainer.querySelector(tablistSelector + ' a'), false);
				});
				docEl.classList.add(tabsReadyClass);
			}
		}
		init();

		// REVEAL API
		return {
			init: init,
			destroy: destroy
		};
	};

	// module exports
	exports.default = Frtabs;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	// Set Array prototype on NodeList (allows for Array methods on NodeLists)
	// https://gist.github.com/paulirish/12fb951a8b893a454b32 (#gistcomment-1487315)

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	Object.setPrototypeOf(NodeList.prototype, Array.prototype);

	/**
	 * @param {object} options Object containing configuration overrides
	 */
	var Fraccordion = function Fraccordion() {
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref$selector = _ref.selector;
		var selector = _ref$selector === undefined ? '.js-fr-accordion' : _ref$selector;
		var _ref$headerSelector = _ref.headerSelector;
		var headerSelector = _ref$headerSelector === undefined ? '.fr-accordion__header' : _ref$headerSelector;
		var _ref$headerIdPrefix = _ref.headerIdPrefix;
		var headerIdPrefix = _ref$headerIdPrefix === undefined ? 'accordion-header' : _ref$headerIdPrefix;
		var _ref$panelSelector = _ref.panelSelector;
		var panelSelector = _ref$panelSelector === undefined ? '.fr-accordion__panel' : _ref$panelSelector;
		var _ref$panelIdPrefix = _ref.panelIdPrefix;
		var panelIdPrefix = _ref$panelIdPrefix === undefined ? 'accordion-panel' : _ref$panelIdPrefix;
		var _ref$firstPanelsOpenB = _ref.firstPanelsOpenByDefault;
		var firstPanelsOpenByDefault = _ref$firstPanelsOpenB === undefined ? true : _ref$firstPanelsOpenB;
		var _ref$multiselectable = _ref.multiselectable;
		var multiselectable = _ref$multiselectable === undefined ? true : _ref$multiselectable;
		var _ref$readyClass = _ref.readyClass;
		var readyClass = _ref$readyClass === undefined ? 'has-fr-accordion' : _ref$readyClass;

		// CONSTANTS
		var doc = document;
		var docEl = doc.documentElement;

		// SUPPORTS
		if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;

		// SETUP
		// set accordion element NodeLists
		var accordionContainers = doc.querySelectorAll(selector);
		var accordionHeaders = doc.querySelectorAll(headerSelector);
		var accordionPanels = doc.querySelectorAll(panelSelector);

		// UTILS
		// closest: http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
		function _closest(el, fn) {
			return el && (fn(el) ? el : _closest(el.parentNode, fn));
		}

		// A11Y
		function _addA11y() {
			// add role="tablist" to containers
			accordionContainers.forEach(function (accordion) {
				accordion.setAttribute('role', 'tablist');
				// set multiselectable attribute (define support for multiple panels open at once)
				accordion.setAttribute('aria-multiselectable', multiselectable);
			});

			// add role="tab" and aria-controls to headers
			accordionHeaders.forEach(function (accordionHeader) {
				accordionHeader.setAttribute('role', 'tab');
				accordionHeader.setAttribute('aria-controls', accordionHeader.id.replace(headerIdPrefix, panelIdPrefix));
				// make headers focusable, this is preferred over wrapping contents in native button element
				accordionHeader.setAttribute('tabindex', 0);
			});

			// add role="tabpanel" to panels
			accordionPanels.forEach(function (accordionPanel) {
				accordionPanel.setAttribute('role', 'tabpanel');
				accordionPanel.setAttribute('aria-labelledby', accordionPanel.id.replace(panelIdPrefix, headerIdPrefix));
				// make first child of tabpanel focusable if available
				if (accordionPanel.children) {
					accordionPanel.children[0].setAttribute('tabindex', 0);
				}
			});
		}

		function _removeA11y() {
			// remove role="tablist" from containers
			accordionContainers.forEach(function (accordion) {
				accordion.removeAttribute('role');
				// remove multiselectable attribute
				accordion.removeAttribute('aria-multiselectable');
			});

			// remove role="tab" and aria-controls from headers
			accordionHeaders.forEach(function (accordionHeader) {
				accordionHeader.removeAttribute('role');
				accordionHeader.removeAttribute('aria-controls');
				accordionHeader.removeAttribute('aria-selected');
				accordionHeader.removeAttribute('aria-expanded');
				// remove headers focusablility
				accordionHeader.removeAttribute('tabindex');
			});

			// remove role="tabpanel" from panels
			accordionPanels.forEach(function (accordionPanel) {
				accordionPanel.removeAttribute('role');
				accordionPanel.removeAttribute('aria-labelledby');
				accordionPanel.removeAttribute('aria-hidden');
				// remove first child of tabpanel focusablibility
				if (accordionPanel.children) {
					accordionPanel.children[0].removeAttribute('tabindex');
				}
			});
		}

		// ACTIONS
		function _hideAllPanels(accordionContainer) {
			var siblingHeaders = accordionContainer.querySelectorAll(headerSelector);
			var siblingPanels = accordionContainer.querySelectorAll(panelSelector);

			// set inactives
			siblingHeaders.forEach(function (header) {
				header.setAttribute('tabindex', -1);
				header.setAttribute('aria-selected', 'false');
				header.setAttribute('aria-expanded', 'false');
			});
			siblingPanels.forEach(function (panel) {
				panel.setAttribute('aria-hidden', 'true');
			});
		}

		function _hidePanel(target) {
			var activePanel = doc.getElementById(target.getAttribute('aria-controls'));

			target.setAttribute('aria-selected', 'false');
			target.setAttribute('aria-expanded', 'false');
			activePanel.setAttribute('aria-hidden', 'true');
		}

		function _showPanel(target) {
			var activePanel = doc.getElementById(target.getAttribute('aria-controls'));

			// set actives
			target.setAttribute('tabindex', 0);
			target.setAttribute('aria-selected', 'true');
			target.setAttribute('aria-expanded', 'true');
			activePanel.setAttribute('aria-hidden', 'false');
		}

		function _togglePanel(target) {
			// close target panel if already active
			if (target.getAttribute('aria-selected') === 'true') {
				_hidePanel(target);
				return;
			}
			// if not multiselectable hide all, then show target
			if (!multiselectable) {
				// get context of accordion container and its children
				var thisContainer = _closest(target, function (el) {
					return el.classList.contains(selector.substring(1));
				});
				_hideAllPanels(thisContainer);
			}
			_showPanel(target);
		}

		function _giveHeaderFocus(headerSet, i) {
			// remove focusability from inactives
			headerSet.forEach(function (header) {
				header.setAttribute('tabindex', -1);
			});
			// set active focus
			headerSet[i].setAttribute('tabindex', 0);
			headerSet[i].focus();
		}

		// EVENTS
		function _eventHeaderClick(e) {
			_togglePanel(e.target);
		}

		function _eventHeaderKeydown(e) {
			// collect header targets, and their prev/next
			var currentHeader = e.target;
			// get context of accordion container and its children
			var thisContainer = _closest(currentHeader, function (el) {
				return el.classList.contains(selector.substring(1));
			});
			var theseHeaders = thisContainer.querySelectorAll(headerSelector);
			var currentHeaderIndex = theseHeaders.indexOf(currentHeader);

			// catch enter/space, left/right and up/down arrow key events
			// if new panel show it, if next/prev move focus
			switch (e.keyCode) {
				case 13:
				case 32:
					_togglePanel(currentHeader);
					e.preventDefault();
					break;
				case 37:
				case 38:
					var previousHeaderIndex = currentHeaderIndex === 0 ? theseHeaders.length - 1 : currentHeaderIndex - 1;
					_giveHeaderFocus(theseHeaders, previousHeaderIndex);
					e.preventDefault();
					break;
				case 39:
				case 40:
					var nextHeaderIndex = currentHeaderIndex < theseHeaders.length - 1 ? currentHeaderIndex + 1 : 0;
					_giveHeaderFocus(theseHeaders, nextHeaderIndex);
					e.preventDefault();
					break;
				default:
					break;
			}
		}

		// BINDINGS
		function _bindAccordionEvents() {
			// bind all accordion header click and keydown events
			accordionHeaders.forEach(function (accordionHeader) {
				accordionHeader.addEventListener('click', _eventHeaderClick);
				accordionHeader.addEventListener('keydown', _eventHeaderKeydown);
			});
		}

		function _unbindAccordionEvents() {
			// unbind all accordion header click and keydown events
			accordionHeaders.forEach(function (accordionHeader) {
				accordionHeader.removeEventListener('click', _eventHeaderClick);
				accordionHeader.removeEventListener('keydown', _eventHeaderKeydown);
			});
		}

		// DESTROY
		function destroy() {
			_removeA11y();
			_unbindAccordionEvents();
			docEl.classList.remove(readyClass);
		}

		// INIT
		function init() {
			if (accordionContainers.length) {
				_addA11y();
				_bindAccordionEvents();

				// hide all panels
				accordionContainers.forEach(function (accordionContainer) {
					_hideAllPanels(accordionContainer);
				});
				// set all first accordion panels active on init if required (default behaviour)
				// otherwise make sure first accordion header for each is focusable
				if (firstPanelsOpenByDefault) {
					accordionContainers.forEach(function (accordionContainer) {
						_togglePanel(accordionContainer.querySelector(headerSelector));
					});
				} else {
					accordionContainers.forEach(function (accordionContainer) {
						accordionContainer.querySelector(headerSelector).setAttribute('tabindex', 0);
					});
				}

				docEl.classList.add(readyClass);
			}
		}
		init();

		// REVEAL API
		return {
			init: init,
			destroy: destroy
		};
	};

	// module exports
	exports.default = Fraccordion;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	NodeList.prototype.forEach = Array.prototype.forEach;

	var Navigation = function Navigation() {

		var selector = document.querySelectorAll('.js-cake-navigation a');
		var classActive = 'is-active';

		function init() {
			var page = getPage();
			if (page.parents.includes('cakes')) updateNav(page);
		}

		function updateNav(page) {
			var navItem = undefined;
			selector.forEach(function (item) {
				if (item.getAttribute('href').includes(page.page)) navItem = item;
			});
			navItem.classList.add(classActive);
		}

		function getPage() {
			var pathArr = window.location.pathname.split('/').filter(Boolean);
			return {
				page: pathArr[pathArr.length - 1],
				parents: pathArr
			};
		}

		init();
	};

	exports.default = Navigation;

/***/ }
/******/ ]);