---
layout: post
comments: true
title: Turning your Chromebook into a Data play machine
date: 2018-01-16 00:00:00 +0000
---
Chromebooks(and -boxes) are found everywhere it seems. From classrooms to powering kiosks, Google found an inexpensive solution to get people online and connected, while providing a protective "Sandbox" to keep network managers asleep at night. Chrome OS is a reasonably lightweight solution for okay hardware (up to Google's own great hardware, e.g. Pixelbook) for many everyday tasks. Of course, there are limits, or features, depending on your perspective ;). Since the early days of ChromeOS, people have taken advantage of ChromeOS's underlying linux kernel to add linux like features. While I dabbled with Crouton, the deep dive into Ubuntu unguided eventually left me using it less and less. Now a few years later, with much more coding experience under my belt from a data science perspective, and a recently orphaned chromebook now in my possession, it was time to revisit a linux solution for a lightweight coding platform.

I came across two great articles that started me in a great direction, but here's what you will need to get really going. Since I work with both `python` and `R`, I will separate those into two different sections.

## Gallium OS

## Miniconda for Python

## R for completion

### Geospatial considerations

to install certain R packages, you will need some things that are missing from Gallium OS's base Ubuntu installation:

    libproj-dev
    libudunits2-dev

for libgeos + gdal, add `add-apt-repository -y ppa:ubuntugis/ubuntugis-unstable` then update then upgrade

    gdal-bin
    libcairo2-dev

## Docker

Docker (and its FOSS cousin )

## Other Useful Tools