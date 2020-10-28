# Secretlab Blog webpage replica

A static webpage built with HTML/CSS & JavaScript to sharpen my front-end skills.

[Live demo](https://ggs91.github.io/secretlab_static_page_replica/)

## Table of Contents

* [About the Project](#about-the-project)
* [Case Study: Efficient Parallax Effect](#Performance-optimized-parallax-effect-with-cross-browsers-compatibility)
  * [Listening to the page's scroll](#Listening-to-the-pages-scroll)
    1. [Bad performance of the `window.scroll` event](#bad-performance-of-the-window.scroll-event)
    2. [Not listening to the scroll event at all?](#Not-listening-to-the-scroll-event-at-all)
    3. [Using `window.requestAnimationFrame()` to "listen" to the scroll](#Using-window.requestAnimationFrame-to-listen-to-the-scroll)
    
  * [Laying out the elements for the parallax effect](#Laying-out-the-elements-for-the-parallax-effect)
  * [Moving the image at a different speed when the page scrolls with optimization](#Moving-the-image-at-a-different-speed-when-the-page-scrolls-with-optimization)
  * [Activate animation on viewport only](#Activate-animation-on-viewport-only)



* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project

This is a case styudy of my greatest takeaway of this project.

I've learnt a lot while recreating this webpage:

* Creating a parallax effect using pure css and with a leading idea of having it as much performant as possible & with browsers support.
* Managing to get the image logo of the header adapte with the height to the header shrinking / growing.
* A strategy for layout to ease the work for reponsivness.
* Making images keeping their ration while adapting to a hard width container.

But here I chose to only develop my journey to get the **parallax effect** working **the way I wanted to**.

## Performance-Optimized Parallax Effect with Cross-Browsers Compatibility

My main purpose for this part was to build an as efficient as possible parallax effect that would works on all devices and browsers. 

### Listening to the page's scroll

When I first strated to look up how to make a parallax effect I found a lot of articles and libraries relying on the window.scroll event. 

#### Bad performance of the `window.scroll` event

I came across the [Performant Parallaxing](https://developers.google.com/web/updates/2016/12/performant-parallaxing) article by  Paul Lewis.
He mentionned: "In most browsers scroll events are delivered as 'best-effort' and are not guaranteed to be delivered on every frame of the scroll animation".

After few research I also discovered that the scroll event get called too many time per second, way more than how fast the screens actually updates.
So it is a waste of CPU cycles and, so, bad performance.

So I wanted to avoid it by all means.

#### Not listening to the scroll event at all?
#### Using `window.requestAnimationFrame()` to "listen" to the scroll
### Laying out the elements for the parallax effect

### Moving the image at a different speed when the page scrolls with optimization

### Activate animation on viewport only 


