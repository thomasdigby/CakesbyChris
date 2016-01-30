
//	MASTER JS
//----------------------------------------------------------------------

import FrOffcanvas from './vendor/fr-offcanvas';
import FrTabs from './vendor/fr-tabs';

//	Set client specific settings
var ClientSettings = {
	bpLap: 600,
	bpDesk: 900
};

new FrOffcanvas('.js-offcanvas-panel', {
	toggleSelector: '.js-offcanvas-toggle'
});
new FrTabs();