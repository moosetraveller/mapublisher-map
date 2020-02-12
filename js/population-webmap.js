/**
 * Changes map in iframe.
 */
function showMap(map) {

  $('#mapContainer, #legend').addClass('hide');
  $('#mapBusyPanel').removeClass('hide');

  $('.nav-item, .dropdown-item').removeClass('active');

  $('#mapIFrame').attr('src', 'maps/' + map.toLowerCase() + '/index.html');
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
    applyCssToIFrame();
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
 * Applies iframe.css to the iframe.
 */
function applyCssToIFrame() {
  var cssLink = document.createElement("link");
  cssLink.href = "../../css/iframe.css"; 
  cssLink.rel = "stylesheet"; 
  cssLink.type = "text/css"; 
  frames['mapIFrame'].contentDocument.head.appendChild(cssLink);
}
