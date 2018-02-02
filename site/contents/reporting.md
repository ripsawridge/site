---
layout: page
title: Charts and graphs about climbing
description: What fun is climbing if you can't graph about it?!
---

<script src="/assets/js/tabletop.js" type="text/javascript">
</script>
<script src="/assets/js/climbgrades.js" type="text/javascript">
</script>
<script src="/assets/js/jquery.min.js" type="text/javascript">
</script>
<script src="/assets/js/Chart.js" type="text/javascript">
</script>

<script src="/assets/js/reporting.js" type="text/javascript">
</script>

<h1>What's going on?</h1>

<p>
Here I'm trying to combine hobbies. Climbing AND...coding about climbing! For
example, enter climbs in the French, UIAA or YDS system below, seperated by
spaces, and you'll get a conversion to the other forms below it.
</p>

<table>
<tr>
<td>
<label for="inputRatings">Select a rating system for your input:</label>
</td>
<td>
<select style="width: 150px" name="inputRatings" id="inputRatings">
  <option value="UIAA" selected>UIAA</option>
  <option value="French">French</option>
  <option value="YDS">YDS</option>
</select>
</td>
<td id="outputSystemOne"></td>
</tr>
<tr>
<td>
<input style="width: 300px" id="ratingsText">
</td>
<td>
<input id="clickRatings" type="button" value="Convert Ratings">
</td>
<td id="outputSystemTwo"></td>
</tr>
</table>

<h3>Max redpoint and average attempts for the last year</h3>
<table>
<tr>
<td>
<div id="chartRadio">
  <input type="radio" id="uiaa" name="rating" checked="checked">
  <label for="uiaa">UIAA</label>
 
  <input type="radio" id="french" name="rating">
  <label for="french">French</label>
 
  <input type="radio" id="yds" name="rating">
  <label for="yds">YDS</label>
</div>
</td>
<td>
<input id="reloadData" type="button" value="Reload data">
</td>
</tr>
</table>
<canvas id="myChart" width="800" height="400"></canvas>

<p>
The data above shows the average rating for different climbs attempted or
redpointed during a climbing session (in gray). The hardest redpoint is
displayed in blue. Hover over the data to display the rating in UIAA format. The
data is from a Google spreadsheet I maintain <span
id="spreadSheetLocation">ALTER WITH CODE</span>. I do most of the climbing that
makes up this dataset in Thalkirchen, and here is their interesting
<a href="http://orgacontrol.verbundklettern.de/RoutenDB/index2.php">route database</a>.
</p>


