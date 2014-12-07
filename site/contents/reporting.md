---
title: Climbing Data
template: page.jade
---

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js" type="text/javascript">
</script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js" type="text/javascript">
</script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css">
</link>
<script src="javascript/tabletop.js" type="text/javascript">
</script>
<script src="javascript/climbgrades.js" type="text/javascript">
</script>

<script src="reporting.js" type="text/javascript">
</script>

### What's going on?

Here I'm trying to combine hobbies. Climbing AND...coding about climbing! For
example, enter climbs in the French, UIAA or YDS system below, seperated by
spaces, and you'll get a conversion to the other forms below it.

<input id="ratingsText"/><br>
<input id="clickRatings" type="button" value="Convert Ratings" onclick="reporting.doRatings();"/>
<div id="ratingsOutput"></div>

<input id="clickMe" type="button" value="clickme" onclick="reporting.createReport();" />
<div id="progressbar"></div>
<div id="output"></div> 


