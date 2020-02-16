let currentAvenzaViewer = undefined;

/**
 * Returns true if given string is either undefined, null or empty/blank.
 */
function isStringEmpty(str) {
  return str == undefined || str == null ||str.trim() == '';
}

/**
 * Shows the overview map.
 */
function showOverviewMap() {
  $('.county-container').addClass('hide');
  $('#mapBusyPanel').addClass('hide');
  $('.overview-container').removeClass('hide');
  removePreviousAvenzaViewer();
}

/**
 * Shows a specific county map.
 */
function showCountyMap(map) {

  $('.overview-container').addClass('hide');
  $('.county-container').removeClass('hide');

  initAvenzaViewer('halifax');

  updateLegend(map);
 
  // artificial 1s busy panel to replace bad flickering with an okay-ish one
  window.setTimeout(() => {
    initAvenzaViewer('halifax');
    $('#mapContainer, #legend').removeClass('hide');
    $('#mapBusyPanel').addClass('hide');
  }, 1000);

}

/**
 * Changes map in iframe.
 */
function showMap(map) {

  $('#mapContainer, #legend').addClass('hide');
  $('#mapBusyPanel').removeClass('hide');

  $('.nav-item, .dropdown-item').removeClass('active');
  
  $('.header>h3').html(isStringEmpty(map) ? 'Overview Map' : map.replace('-', ' '));

  const link = $('#' + map.toLowerCase().replace(' ', '') + 'Link');
  if (link.hasClass('dropdown-item')) {
    link.addClass('active');
    link.parent().parent().addClass('active');
  }
  else {
    link.parent().addClass('active');
  }

  if (isStringEmpty(map)) {
    showOverviewMap();
  }
  else {
    showCountyMap(map);
  }

}

/**
 * Updates the legend content.
 */
function updateLegend(map) {
  for(var i=0; i<10; i++) {
    $('#legend' + i).html(legend[map.toLowerCase().replace(' ', '')][i]);
  }
}

/**
 * Updates page to show another map.
 */
function selectMap(map) {
  if (isStringEmpty(map)) {
    window.history.replaceState({}, 'Overview Map', '?');
  }
  else {
    window.history.replaceState({'map': map}, map.replace('-', ' '), '?map=' + map);
  }
  showMap(map);
}

/**
 * Removes previous added Avenza viewers from DOM.
 */
function removePreviousAvenzaViewer() {
  delete currentAvenzaViewer; // release object
  $('#avenzaMapContainer .openseadragon-container').remove();
}

/**
 * Initialize an Avenza viewer for given county. Removes previous added viewers
 * from DOM if necessary. 
 */
function initAvenzaViewer(county) {
  removePreviousAvenzaViewer();
  AVENZA.initialize();
  currentAvenzaViewer = AVENZA.embedViewer({
    id: 'avenzaMapContainer',
    descButtonId: 'avenzaDescButton',
    descPanelId: 'avenzaDescPanel',
    legendButtonId: 'avenzaLegendButton',
    legendPanelId: 'avenzaLegendPanel',
    legendImageId: 'avenzaLegendImage',
    prefixUrl: 'maps/' + county,
    enableZoomSelection: false,
    layerList: AVENZA.HIDDEN,
    minZoomImageRatio: 0.9
  });
}

AVENZA._showDialog = function() { /* HACK: we don't want avenza's loading dialog shown */ }
// AVENZA.Viewer.prototype._setVisible = function() {}

/**
 * Removes unused href and target attributes from image map areas. Image map was
 * generated by using https://www.image-map.net.
 */
function cleanDOM() {
  $('#imageMap>area').removeAttr('href');
  $('#imageMap>area').removeAttr('target');
}

/**
 * Initialize image map areas.
 */
function initImageMap() {
  $('#imageMap>area').each((_, area) => {
    let map = $(area).attr('title');
    $(area).off('click').on('click', (_) => {
      showMap(map);
    })
  });
}

/**
 * Initialize website.
 */
function init() {
  cleanDOM();
  initImageMap();
  showMap(param);
}