---
title: Climbing Data
template: page.jade
---

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js" type="text/javascript">
</script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.js" type="text/javascript">
</script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/ui-lightness/jquery-ui.css">
</link>
<script src="javascript/tabletop.js" type="text/javascript">
</script>
<script src="javascript/climbgrades.js" type="text/javascript">
</script>
<script src="javascript/Chart.js" type="text/javascript">
</script>

<script src="reporting.js" type="text/javascript">
</script>

### What's going on?

Here I'm trying to combine hobbies. Climbing AND...coding about climbing! For
example, enter climbs in the French, UIAA or YDS system below, seperated by
spaces, and you'll get a conversion to the other forms below it.


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
<input style="width: 300px" id="ratingsText"/>
</td>
<td>
<input id="clickRatings" type="button" value="Convert Ratings"/>
</td>
<td id="outputSystemTwo"></td>
</tr>
</table>

<div id="progressbar"></div>
<h3>Max redpoint and average attempts for 6 months</h3>
<form>
<span id="chartRadio">
  <input type="radio" id="uiaa" name="rating" checked="checked">
  <label for="uiaa">UIAA</label>
 
  <input type="radio" id="french" name="rating">
  <label for="french">French</label>
 
  <input type="radio" id="yds" name="rating">
  <label for="yds">YDS</label>
</span>
<input align=right id="reloadData" type="button" value="Reload data"/><br>
<canvas id="myChart" width="800" height="400"></canvas>
</form>

The data above shows the average rating for different climbs attempted or
redpointed during a climbing session (in gray). The hardest redpoint is
displayed in blue. Hover over the data to display the rating in UIAA format. The
data is from a Google spreadsheet I maintain <span
id="spreadSheetLocation">ALTER WITH CODE</span>. I do most of the climbing that
makes up this dataset in Thalkirchen, and here is their interesting
[route database](http://orgacontrol.verbundklettern.de/RoutenDB/index2.php).

