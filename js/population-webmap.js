let currentAvenzaViewer = undefined;

/**
 * Changes map in iframe.
 */
function showMap(map) {

  $('#mapContainer, #legend').addClass('hide');
  $('#mapBusyPanel').removeClass('hide');

  $('.nav-item, .dropdown-item').removeClass('active');
  
  initAvenzaViewer('halifax');
  
  $('.header>h3').html(map.replace('-', ' '))

  const link = $('#' + map.toLowerCase().replace(' ', '') + 'Link');
  if (link.hasClass('dropdown-item')) {
    link.addClass('active');
    link.parent().parent().addClass('active');
  }
  else {
    link.parent().addClass('active');
  }
 
  // artificial 1s busy panel to replace bad flickering with an okay-ish one
  window.setTimeout(() => {
    initAvenzaViewer('halifax');
    $('#mapContainer, #legend').removeClass('hide');
    $('#mapBusyPanel').addClass('hide');
  }, 1000);

}

/**
 * Updates page to show another map.
 */
function selectMap(map) {
  window.history.replaceState({'map': map}, map.replace('-', ' '), '?map=' + map);
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
    enableZoomSelection: true,
    layerList: AVENZA.HIDDEN,
    minZoomImageRatio: 0.9
  });
}

AVENZA._showDialog = function() { /* HACK: we don't want avenza's loading dialog shown */ }
// AVENZA.Viewer.prototype._setVisible = function() {}