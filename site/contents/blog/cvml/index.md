---
title: CVML and MATLAB
date: 2012-07-26
template: page.jade
comments: true
code: true
---

Today I fiddled around with feeding CVML data into MATLAB.
In case you've never heard of CVML (Computer Vision Markup Language), it is an XML tag library
that was designed to facilitate the exchange of data between researchers in computer vision.
It was [originally published][1] at ICPR 2004. A CVML file might look like this:

```
<?xml version="1.0"?>
<dataset>
  <frame number="1">
    <objectlist>
      <object id="1">
        <box h="75.17" w="31.03" xc="514.7109" yc="195.2731"/>
      </object>
      <object id="2">
        <box h="88.7021" w="32.91" xc="274.4912" yc="262.9999"/>
      </object>
    </objectlist>
  </frame>
  <frame number="2">
    <objectlist>
      <object id="2">
        <box h="75.17" w="31.03" xc="512.6294" yc="195.7523"/>
      </object>
    </objectlist>
  </frame>
</dataset> 
```

The tags itself are quite self-explanatory:
A dataset was defined containing several frames and for each frame there is a list of objects present in this frame.
Each object is assigned a unique id and the position of an object is defined by a box.
The information contained in this snippet might be annotated ground truth values or the result of an object tracking algorithm.

For two widely used datasets for people detection and tracking,
namely the [PETS 2009][2] dataset and the [CAVIAR][3] dataset,
ground truth data exists in exactly this format.
For the former, look [here][4], for the latter, ground truth data is provided on the project page.

How would you get this data into MATLAB? There are three possibilites and a fourth one that actually works.

* Use the built-in MATLAB function xmlread
* Use the [XML Toolbox][5]
* Use the [XML Parsing Tools][6]

I'm not going to go into detail, but these methods fail because
1. is too low-level,
2. stopped working with MATLAB 2010b (and it is closed-source, so nobody can fix it),
3. is painfully slow and leaves you with a mess of structs that are connected in an unmanagable way.

Here is a fourth solution that involves flattening out the data into a CSV file
by using an XSL transformation and importing this file as a matrix into MATLAB using dlmread.
Simply put the following code into a file called 'cvml_csv.xslt':

```
<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="text"/>
<xsl:variable name="sep" select="' '" /> 
<xsl:template match="/">
  <xsl:for-each select="dataset/frame">
    <xsl:for-each select="objectlist/object">
      <xsl:value-of select="../../@number"/>
      <xsl:copy-of select="$sep" />
      <xsl:value-of select="@id"/>
      <xsl:copy-of select="$sep" />
      <xsl:value-of select="box/@xc"/>
      <xsl:copy-of select="$sep" />
      <xsl:value-of select="box/@yc"/>
      <xsl:copy-of select="$sep" />
      <xsl:value-of select="box/@w"/>
      <xsl:copy-of select="$sep" />
      <xsl:value-of select="box/@h"/>
      <xsl:value-of select="'&#xA;'"/>
    </xsl:for-each>
  </xsl:for-each>
</xsl:template>
</xsl:stylesheet>
```

Let us assume your CVML file is called 'cvml_data.xml', then you simply run an XSLT processor on this file and the XSLT file like so:

```
$ xsltproc cvml_csv.xslt cvml_data.xml > cvml_data.csv
```

This should work on any reasonable Linux distribution and MacOS,
but there probably are hundreds of program that can accomplish this task.
The csv file now looks like this:

```csv
1 1 514.7109 195.2731 31.03 75.17
1 2 274.4912 262.9999 32.91 88.7021
2 2 512.6294 195.7523 31.03 75.17
```

The first column corresponds to the frame number, the second column to the object id
and columns 3-6 are the bounding box of the object.
In MATLAB, you simply do

```matlab
A = dlmread('cvml_data.csv');
```

and that is it.
However you should be aware that CVML files with different formats require an adaptation of the XSLT file.

[1]: http://homepages.inf.ed.ac.uk/rbf/PAPERS/listcvml.pdf
[2]: http://www.cvg.rdg.ac.uk/PETS2009/a.html
[3]: http://homepages.inf.ed.ac.uk/rbf/CAVIARDATA1/
[4]: http://www.gris.informatik.tu-darmstadt.de/~aandriye/data.html
[5]: http://www.mathworks.com/matlabcentral/fileexchange/4278
[6]: http://www.mathworks.com/matlabcentral/fileexchange/3074-xml-parsing-tools
