
NodeList.prototype.forEach = Array.prototype.forEach;

const Navigation = function () {

	const selector = document.querySelectorAll('.js-cake-navigation a');
	const classActive = 'is-active';

	function init() {
		let page = getPage();
		if (page.parents.indexOf('cakes') > -1) updateNav(page);
	}

	function updateNav(page) {
		let navItem;
		selector.forEach((item) => {
			if (item.getAttribute('href').indexOf(page.page) > -1) navItem = item;
		});
		navItem.classList.add(classActive);
	}

	function getPage() {
		let pathArr = window.location.pathname.split('/').filter(Boolean);
		return {
			page: pathArr[pathArr.length - 1],
			parents: pathArr
		};
	}

	init();
}

export default Navigation;