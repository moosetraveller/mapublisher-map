/*
 * Changes map in iframe.
 */
function showMap(map) {

  $('#mapContainer, #legend').addClass('hide');
  $('#mapBusyPanel').removeClass('hide');

  $('#mapIFrame').attr('src', 'maps/' + map.toLowerCase() + '/index.html');
  $('.header>h3').html(map.replace('-', ' '))

  // artificial 1s busy panel to replace bad flickering with an okay-ish one
  window.setTimeout(() => {
    $('#mapContainer, #legend').removeClass('hide');
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
