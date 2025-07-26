---
title: You Want to Center a DIV in CSS? Good Luck!
date_pub: 2024.09.28
---

Few things are as controversial in the web development space as the correct way of centering a div in CSS... Ok, there are _a lot_ of controversial things in this space, but that's mostly because everyone has their own way of doing things, which comes bundled with a superiority complex.

Anyway, "_In the beginning God created the heaven and the earth_", or so the story goes. Fast forward a couple millennia, and some apes just invented programming. Big mistake. They have no idea what they just started.

Give these "_programmers_" enough time, and they'll eventually figure out how to send data between computers **_WITHOUT WIRES_**. Wait, they already did it? Shit's craaazyy..

I can already see a future where this technology will become so cheap that eventually half the planet will be able to use it to send text, images, and even money between each other. From halfway across the world. Instantly. Oh, this happened already too?!

Ah, well.

Let's go back a little. So.. it's the early days of this new thing called "the internet", huh?

~~But how does it work?~~ Shut up, we won't talk about that. Why were you here again?
Right, you wanted to center a div.

Well the most popular browser at the moment is Netscape Navigator, so I guess we'll go with that.
Since CSS isn't even a thing yet, good old HTML should do the trick.

```html
<center>
	<div>Content</div>
</center>
```

Now this looks like a properly centered div if I've ever seen one.

Or.. if your needs are more advanced, you could even do some weird stuff with tables:

```html
<table width="100%" height="100%">
	<tr>
		<td align="center" valign="middle">
			<div>Content</div>
		</td>
	</tr>
</table>
```

But wait, 1996 rolls around and the first release of CSS gets to see the light of day.
Netscape, not so quickly adopts the standard and, eventually you're able to center your divs like this:

```html
<div style="width: 800px; margin: 0 auto;">Content</div>
```

All good things must come to an end tho. Netscape Navigator falls from grace, and it's Microsoft's turn to play with the internet. They bless the people with Internet Explorer, and all was sunshine and rainbows after (it really wasn't).

But you don't care about the monopolistic practices of a trillion dollar corporation. You're here to learn about centering divs, and that's what we'll be doing.

CSS evolved, browser support for CSS evolved. You can now somewhat center the content of a div with "`text-align`":

```html
<div style="text-align: center;">Content</div>
```

Need more control? You can use `position: absolute;` and `transform: translate()` now. That's kinda useful.

```html
<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
	Content
</div>
```

Ok.. ok, by this point in the timeline most browsers already support a big part of the CSS spec. Internet Explorer is eventually dethroned by Firefox, which itself is dethroned by Chrome later down the line.

From this point on, CSS should work fine in all major browsers, so there's no more browser specific shenanigans and limitations. At least not for centering divs..

Flexbox is popular now so you can center divs with that if you'd like:

```html
<div style="display: flex; justify-content: center; align-items: center;">Content</div>
```

Did I say flexbox? Time moves fast in the web dev space, it's actually CSS Grid now. But don't worry, you can do literally the same thing, just replace `flex` with `grid`.

```html
<div style="display: grid; justify-content: center; align-items: center;">Content</div>
```

Ok, fine, you wanna do it properly, I got you.

```html
<div style="display: grid; place-items: center;">Content</div>
```

There you go.
You finally know how to center a div in CSS. For now at least.
Who knows what else those programming apes are going to cook up in the future. Good luck!
