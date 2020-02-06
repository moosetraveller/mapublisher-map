/*
 * Changes map in iframe.
 */
function showMap(map) {

  $('#mapContainer').addClass('hide');
  $('#legend').addClass('hide');
  $('#mapBusyPanel').removeClass('hide');

  $('#mapIFrame').attr('src', 'maps/' + map.toLowerCase() + '/index.html');

  window.setTimeout(() => {
    $('#mapContainer').removeClass('hide');
    $('#legend').removeClass('hide');
    $('#mapBusyPanel').addClass('hide');
  }, 1000);

}

/*
 * Updates page to show another map.
 */
function selectMap(map) {
  window.history.replaceState({'map': map}, map.replace('-', ' '), '?map=' + map);
  showMap(map);
}
