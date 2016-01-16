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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//	Set client specific settings

	//	MASTER JS
	//----------------------------------------------------------------------

	var ClientSettings = {
		bpLap: 600,
		bpDesk: 900
	};

	new _frOffcanvas2.default('.js-offcanvas-panel', '.js-offcanvas-toggle');
	new _frTabs2.default();

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
	var Froffcanvas = function Froffcanvas() {
		var panelSelector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-offcanvas' : arguments[0];
		var toggleSelector = arguments.length <= 1 || arguments[1] === undefined ? '.js-fr-offcanvas-toggle' : arguments[1];

		var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

		var _ref$activePanelClass = _ref.activePanelClass;
		var activePanelClass = _ref$activePanelClass === undefined ? 'fr-offcanvas--is-active' : _ref$activePanelClass;
		var _ref$readyClass = _ref.readyClass;
		var readyClass = _ref$readyClass === undefined ? 'has-fr-offcanvas' : _ref$readyClass;

		//	CONSTANTS
		var doc = document;
		var docEl = doc.documentElement;

		//	SUPPORTS
		if (!'querySelector' in document || !'addEventListener' in window || !docEl.classList) return;

		//	SETUP
		var panel = doc.querySelector(panelSelector);
		var toggle = doc.querySelector(toggleSelector);

		//	UTILS
		function _defer(func) {
			//	wrapped in setTimeout to delay binding until previous rendering has completed
			if (typeof func === 'function') setTimeout(func, 0);
		}
		function _closest(el, fn) {
			// closest: http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
			return el && (fn(el) ? el : _closest(el.parentNode, fn));
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
		function _eventPointer() {
			var panelHidden = panel.getAttribute('aria-hidden') === 'true';
			if (panelHidden) {
				_showPanel();
			} else {
				_hidePanel();
			}
		}
		function _eventDocClick(e) {
			//	check if target is panel or child of
			var isPanel = e.target == panel;
			var isPanelChild = _closest(e.target, function (el) {
				if (el != doc) return el.classList.contains(panelSelector.substring(1));
			});
			if (!isPanel && !isPanelChild) _hidePanel();
		}
		function _eventDocKey(e) {
			//	esc key
			if (e.keyCode === 27) _hidePanel();
		}

		//	Bindings
		function _bindPointer() {
			toggle.addEventListener('click', _eventPointer);
		}
		function _bindDocClick() {
			doc.addEventListener('click', _eventDocClick);
		}
		function _bindDocKey() {
			doc.addEventListener('keydown', _eventDocKey);
		}

		//	Unbind
		function _unbindPointer() {
			toggle.removeEventListener('click', _eventPointer);
		}
		function _unbindDocClick() {
			doc.removeEventListener('click', _eventDocClick);
		}
		function _unbindDocKey() {
			doc.removeEventListener('keydown', _eventDocKey);
		}

		//	Actions
		function _showPanel() {
			//	remove aria-hidden, add focus
			panel.setAttribute('aria-hidden', false);
			panel.setAttribute('tabindex', 0);
			panel.focus();
			//	bind document close events
			_defer(_bindDocClick); // this isn't working for enter, works for space though. WTF.
			_defer(_bindDocKey);
			//	add active class
			panel.classList.add(activePanelClass);
		}
		function _hidePanel() {
			//	add aria-hidden, remove focus
			panel.setAttribute('aria-hidden', true);
			panel.setAttribute('tabindex', -1);
			panel.blur();
			//	unbind document events
			_unbindDocKey();
			_unbindDocClick();
			//	remove active class
			panel.classList.remove(activePanelClass);
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
		function _init() {
			if (panel) {
				_addA11y();
				_bindPointer();
				docEl.classList.add(readyClass);
			}
		}
		_init();

		// REVEAL API
		return {
			destroy: destroy
		};
	};

	// module exports
	exports.default = Froffcanvas;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// Move Array prototype to NodeList (allows for Array methods on NodeLists)
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
		if (!'querySelector' in document || !'addEventListener' in window || !docEl.classList) return;

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
			_showTab(e.target, true);
			e.preventDefault(); // look into remove id/settimeout/reinstate id as an alternative to preventDefault
		}

		function _eventTabKeydown(e) {
			// collect tab targets, and their parents' prev/next
			var currentTab = e.target;
			var previousTabItem = e.target.parentNode.previousElementSibling;
			var nextTabItem = e.target.parentNode.nextElementSibling;
			var newTabItem = undefined;

			// catch left and right arrow key events
			switch (e.keyCode) {
				case 37:
					newTabItem = previousTabItem;
					break;
				case 39:
					newTabItem = nextTabItem;
					break;
				default:
					newTabItem = false;
					break;
			}

			// if new next/prev tab available, show it by passing tab anchor to _showTab method
			if (newTabItem) {
				_showTab(newTabItem.querySelector('[role="tab"]'), true);
			}
		}

		// ACTIONS
		function _showTab(target, giveFocus) {
			// get context of tab container and its children
			var thisContainer = _closest(target, function (el) {
				return el.classList.contains(selector.substring(1));
			});
			var siblingTabs = thisContainer.querySelectorAll(tablistSelector + ' a');
			var siblingTabpanels = thisContainer.querySelectorAll(tabpanelSelector);

			// set inactives
			siblingTabs.forEach(function (tab) {
				tab.setAttribute('tabindex', -1);
			});
			siblingTabpanels.forEach(function (tabpanel) {
				tabpanel.setAttribute('aria-hidden', 'true');
			});

			// set actives and focus
			target.setAttribute('tabindex', 0);
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
		function _init() {
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
		_init();

		// REVEAL API
		return {
			destroy: destroy
		};
	};

	// module exports
	exports.default = Frtabs;

/***/ }
/******/ ]);