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

In the same article, the author talks about an another approach that have been done by Scott Kellum and Keith Clark. 

Given that the parallax effect is just a difference of perceived speed between 2 layers that are on different depth from the user perspective, they modelized it in css. 

I have tried to set up a parallax using their approach, it worked on Chrome, but I failed at making it work successfully on Firefox. 

So I took an another approach.

#### Using `window.requestAnimationFrame()` to "listen" to the scroll

When first I learnt about this function I taught to myself, this is the most increadible function that exists for optimization.

```
// Setting requestAnimationFrame to work on every browser. 

var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;
```

* Compared to the scroll event it is called only 60 time per second, wich is  enough because it's the speed of the screen display. More than that would be a waste of performance, which the scroll event does.
 
* It is called only when the browser is available.

* It slows down, speeds up  or even pauses (if the user change tab for exemple).

* Supported on all modern desktop and mobil browsers.

It sounds too good to be true, but this is what requestAnimationFrame() is able to do. 

So here I've found my new friend for performance optimization.

To use `window.requestAnimationFrame()` for my purpose (mimic listening to the page's scroll), I simply used it in a function that get the scrollX and scrollY of the window. This function, thanks to the use of `window.requestAnimationFrame()`, will be called at a 60fps rate, and so will be updated the scrollX and scrollY positions of the page. 

```
//main.js 

let xScrollPosition; //Variables declaration
let yScrollPosition; 

function scrollLoop(e) {
  xScrollPosition = window.scrollX;
  yScrollPosition = window.scrollY;

  // This function will be called 60 times per second

  requestAnimationFrame(scrollLoop);
}
```

Now without listening to the scroll event, we have an optimized feedback of the page's position at a 60fps rate.

And not only the parallax effect, but any other animation that is trigger on the page scroll can now be implemented. For example, the header shrinking is based on the same technique, not a `window.scroll` event.

### Laying out the elements for the parallax effect
The parallax consist of a showcase `<section>` with an absolutly positioned `<img/>`.

The image has a z-index lower than the section, this is just so that it's covered by the section wich will be taller than the image it contains.
Both elements are still on the same layer (same "depth" of the page). There is no translation on the Z axis, and we haven't set any perspective property on the showcase section.
When the page scroll **the elements will move at a different speed** (we'll cover that on the next section). This is what gives the parallax visual effect.

```
// index.html

<section id="showcase">
  <img class="showcase-bg" src="images/leather.jpg" alt="">
  <div class="text">

   // code here will scroll at the same speed as the showcase section

  </div>
</section>
```
```
// main.css 

#showcase {
  position: relative;
  overflow: hidden; // Hide overflow of the image because it's styled higher than the section
  //...
}

.showcase-bg {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 105%; //The image has a greater high than the section so it has room to scroll without letting a "whole" in the background of the section
  object-fit: cover; // Make the image cover the section with respect of its ratio 
  z-index: -1; 
}
```
### Moving the image at a different speed when the page scrolls with optimization

This is where we implement the parallax effect. We'll target the image and changed the `x` value of its `translate3d` property.
I changed the translate3d instead of the `transalte` or `translateX` because this forces the translation to be handled by the GPU instead of the CPU that is usually very busy with tasks already.
So now we can add a function that will take care of setting the values updated for `x` and `y` for a given element.

```
//main.js 

function setTranslate(xPos, yPos, el){
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`; // Translation will be handled by GPU instead of CPU for better performance.
}
```

Now we can use it in our `scrolLoop` function. We'll not be translating the image on its `x` axis, as the parallax effect is only happening while scrolling verticaly. 
For the `y` axis we multiply the translation by a fraction of the normal speed of the page. The closer it is to 1 the closer it is to the default scrolling speed.
A positive value will make the image scroll down. A negative one will make the image scroll up.

```
//main.js 

function scrollLoop(e) {
  xScrollPosition = window.scrollX;
  yScrollPosition = window.scrollY;
  
  setTranslate(0, yScrollPosition * 0.15, showcaseBG);
  
  requestAnimationFrame(scrollLoop);
}
```

### One last optimization: Activate animation on viewport only 


