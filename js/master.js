
//	MASTER JS
//----------------------------------------------------------------------

import FrOffcanvas from './vendor/fr-offcanvas';
import FrTabs from './vendor/fr-tabs';
import FrAccordion from './vendor/fr-accordion';
import Navigation from './project/navigation-page';

//	Set client specific settings
var ClientSettings = {
	bpLap: 600,
	bpDesk: 900
};

new FrOffcanvas('.js-offcanvas-panel', {
	toggleSelector: '.js-offcanvas-toggle'
});
new FrTabs();
new FrAccordion({
	firstPanelsOpenByDefault: false,
	multiselectable: false
});
Navigation();