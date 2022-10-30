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
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" type="text/javascript">
</script>
<script src="/assets/js/reporting.js" type="text/javascript">
</script>

{{ elevation_data }}

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

<h3>Elevation gain by year</h3>

<p>I've attached metadata to each report to automate the calculation
of elevation gain for each year. The data is in meters. Still, many years are missing
significant data!</p>

<canvas id="elevationChart" width="800" height="400"></canvas>



