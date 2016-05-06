---
title: Chrome Caving Expedition
date: 2014-7-4
layout: post
---

We went on a field trip at work to a wonderful cave a few hours north of Munich. I've illustrated it here with
the help of [Processing.js](http://processingjs.org/).

---

<script src="../javascript/processing.js">
</script>

<canvas data-processing-sources="../javascript/cave.js"> </canvas>

The people are moving along a "track" of known points. All of the data was
generated with the game itself, which I modified to behave like a level editor
whenever needed. To capture the angle data for the little men when they crawl
through a tunnel, I turned the canvas into a sample board which measured the Y
mouse coordinate while the man was traversing the cave. The mouse position
corresponded to an angle between 0 and 90 degrees. A little dumb but I had fun
with it. :).

Here is the [source](../javascript/cave.js).

