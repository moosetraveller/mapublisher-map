# CART 3031 - Mapublisher Webmap

## Introduction
Population growth is an important indicator in measuring the overall growth of a given region. More specifically is population density, which conveys the concentration of individuals per unit area of land. In the case of Nova Scotia, the province is divided into 18 counties. Each of those counties is further subdivided by dissemination area (DA). According to Statistics Canada, a dissemination area contains one or more adjacent blocks, each with a respective population of 400 to 700 people, comprising of thousands of dissemination areas throughout the entire province. (Statistics Canada, 2012)

## Data
The data used for this project was extracted from Statistics Canada. The provincial road network was downloaded the Nova Scotia Topographic Database, accessed through GeoNOVA. Additionally, place names were also downloaded from the government’s GeoNAME’s data website. Starting with ArcGIS Pro 2.4, joins were completed between the data tables to ensure all necessary attributes were included. For example, to give the map some additional context, filtered road feature datasets were joined with polygon data of each county. This ensured that the number of communities within each county would be manageable. As the main dataset, acquiring a field for population density by dissemination area was key. As such, it was derived from the total population divided by the total area of each DA accordingly. Population density is what we have decided to map.
## Process and Production
Once the data was prepared, it was added into ArcGIS for Desktop 10.7 and exported to shapefiles by county. The conversion to shapefiles enabled the data to be imported into Avenza MaPublisher 10.5. As a plugin of Adobe Illustrator 2019, MaPublisher provides cartographic styling within the graphics package itself. Once imported, the data was styled with the appropriate themes and associated colour palettes. For this project, the two primary styles included one for the overview map of Nova Scotia, and another for each county. A blue colour ramp with 10 classes was chosen for each county to maintain consistency. Road and community point graphic styles and symbols were applied to complete the cartography, as well as place names and additional map elements. Upon completion of the 18 counties, they were each exported to HTML5 using standard settings, which introduced interactivity into the maps. From the exported files, only the layer images and data.js were embedded into the website and each map is initialized using a customized JavaScript function. Doing so, duplicated code and settings was avoided. The website is using jQuery 1.12.4 (an old version due to Avenza's JavaScript library)
The legend for each map exists on the website, outside of the map frame to ensure it always remains visible on the screen. When the user clicks on a DA, a popup appears to relay information from the primary attribute table, namely population density, total population, and the area in square kilometres.

## Sources
### Population Density Data
Statistics Canada. 2017. Population and Dwelling Count Highlight Tables. 2016 Census.
Statistics Canada Catalogue no. 98-402-X2016001. Ottawa. Released February 8, 2017.

### Dissemination Area
Dissemination Area Boundary File, 2016 Census. Statistics Canada Catalogue no. 92-169-X.

### Introduction Text Source
Statistics Canada. 2012. 2011 Census Dictionary. Statistics Canada Catalogue no. 98-301-X. Ottawa. https://www12.statcan.gc.ca/census-recensement/2011/ref/dict/geo021-eng.cfm (accessed February 25, 2020).

## License
© 2020 Maria Clarke, Adam Hack, Stats Wong and Thomas Zuberbühler

## Disclaimer
Use of Mapublisher's webmap export was customer-specified.
