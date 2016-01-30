# Cakes by Chris
## Creating new cake pages
Duplicate the `_template` folder within `cakes/`, rename and move it to the relevant sub-folder e.g. `cakes/wedding/`. Keep the file name as `index.html`, this preserves a better URL structure. e.g. `chrisdance.me.uk/cakes/wedding/new-cake-page/`

```
cakes/
	wedding/
		new-cake-page/
			index.html
```

Within the page you can now edit the title, description and create new images.

```html
<p class="text-medium text-center">
	<strong>New Cake Page</strong>
	<br>New Cake Page Description
</p>
<img src="/images/cakes/new-cake-image-1.jpg" alt="">
<img src="/images/cakes/new-cake-image-2.jpg" alt="">
```

## Editing the hub page

For each new cake, you'll have to update the hub page to link to your new page.

Within your relevant hub cake folder e.g. `cakes/wedding/`, open the `index.html` file and find the `list-grid`. Each `li` represents a cake module on the page, the items at the top of the list appear first on the page.

You can edit the title (within the `figcaption`) and the image thumbnail location. Make sure you add the correct link to your newly created cake page within the `href=""` attibute on the `a`. e.g. `href="cakes/wedding/new-cake-page/"`

```html
<li class="list-grid__list-item">
	<a class="module module--theme-green" href="/">
		<figure class="module__figure">
			<img src="/images/cakes/new-cake-thumbnail.jpg" alt="">
			<figcaption class="module__caption">
				New Cake Name
			</figcaption>
		</figure>
	</a>
</li>
```

Notice the `module--theme-green` on the `module`. You can edit this to be anyone of 9 themes, just replace the color on the end of the `module--theme` class. e.g. `module--theme-turquoise` or `module--theme-green-dark`. The default theme is a dark-grey color.
* green
* green-dark
* blue
* turquoise
* purple
* red
* grey
* orange
* pink

Any questions, just get in touch.