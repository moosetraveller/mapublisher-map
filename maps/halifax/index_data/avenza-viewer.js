/*
 Copyright 2012, Avenza Systems Inc. 
*/
AVENZA = window.AVENZA || function () { var e = []; return { initialize: function () { for (AVENZA._BROWSER_IS_HTML5_READY = !0; 0 < e.length;)e.shift()() }, _addInitializer: function (c) { e.push(c) }, _missingHtml5Feature: function () { AVENZA._BROWSER_IS_HTML5_READY = !1 } } }(); (function () {
    function e(g, d) { var b = document.createElementNS(a, "svg"); b.setAttribute("viewBox", "0 0 " + g + " " + d); b.setAttribute("pointer-events", "none"); return b } function c(g) {
        if (g.hasOwnProperty("polylines")) {
            var d = g.polylines, b = d.length, f = document.createElementNS(a, "g"); f.setAttribute("id", g.id); f.setAttribute("class", "avz-feature"); f.setAttribute("pointer-events", "visiblePainted"); f.layer = g.layer; for (g = 0; g < b; g++) {
                var n = document.createElementNS(a, "polyline"); n.setAttribute("points", d[g].coords); n.setAttribute("fill",
                    "none"); f.appendChild(n)
            } g = f
        } else { b = g.polygons; f = b.length; d = ""; for (n = 0; n < f; n++) { 0 < d.length && (d += "Z"); for (var h = b[n].coords.split(" "), c = h.length, e = c - 1; 0 <= e; e--)d = c - 1 === e ? d + "M" : d + "L", d = d + h[e] + " " } 0 < d.length && (d += "Z"); b = document.createElementNS(a, "path"); b.setAttribute("id", g.id); b.setAttribute("class", "avz-feature"); b.setAttribute("pointer-events", "visiblePainted"); b.setAttribute("d", d); b.layer = g.layer; g = b } return g
    } AVENZA._addClassToFeature = function (a, d) {
        var b = a.getAttribute("class").split(" "); -1 ===
            jQuery.inArray(d, b) && b.push(d); a.setAttribute("class", b.join(" "))
    }; AVENZA._removeClassFromFeature = function (a, d) { var b = a.getAttribute("class").split(" "), f = jQuery.inArray(d, b); 0 <= f && (b.splice(f, 1), a.setAttribute("class", b.join(" "))) }; AVENZA._isFeature = function (a) { var d = a.getAttribute("class"); return d && (d = a.getAttribute("class").split(" "), 0 <= jQuery.inArray("avz-feature", d)) ? !0 : !1 }; var a = "http://www.w3.org/2000/svg"; AVENZA._addInitializer(function () {
    document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg",
        "svg").createSVGRect ? (AVENZA._createRootFeatureElement = e, AVENZA._createFeatureElement = c) : AVENZA._missingHtml5Feature()
    })
})(); (function () {
    (function (e) { e.fn.offsetRelative = function (c) { var a = e(this), g = a.offsetParent(), a = a.position(); c && "BODY" != g.get(0).tagName && g[0] != e(c)[0] && (c = g.offsetRelative(c), a.top += c.top, a.left += c.left); return a }; e.fn.positionRelative = function (c) { return e(this).offsetRelative(c) } })(jQuery); AVENZA._createBasicWidget = function () { var e = document.createElement("div"); jQuery(e).addClass("avz-border").addClass("avz-dropshadow"); return e }; AVENZA._createButton = function (e, c) {
        var a = document.createElement("div");
        jQuery(a).addClass("avz-button").addClass(e).click(c).dblclick(function () { return !1 }); return a
    }; AVENZA._createBorderButton = function (e, c, a) { var g = AVENZA._createButton(e, c); a && (jQuery(g).addClass("avz-toolbar-button").click(function () { jQuery(g).addClass("avz-widget-activate"); setTimeout(function () { jQuery(g).removeClass("avz-widget-activate") }, 200) }), AVENZA._isTouchDevice() || jQuery(g).addClass("avz-toolbar-button-notouch")); return g }; AVENZA._quadForPageLocation = function (e, c) {
        var a = jQuery(e._element).offset(),
        g = jQuery(e._element).width(), d = jQuery(e._element).height(), b = c.y - a.top; return c.x - a.left < g / 2 ? b < d / 2 ? AVENZA.QUAD.TOP_LEFT : AVENZA.QUAD.BOTTOM_LEFT : b < d / 2 ? AVENZA.QUAD.TOP_RIGHT : AVENZA.QUAD.BOTTOM_RIGHT
    }
})(); (function () {
    function e(a) { var d = document.createElement("div"); jQuery(d).addClass("avz-dropshadow").addClass("avz-border").addClass("avz-callout-bubble"); a.title && 0 < a.title.length && (a = AVENZA._elementForWebTagTitle(a), jQuery(d).append(a)); return d } function c(a) {
        var d = e(a); jQuery(d).children(".avz-webtag-title").append("<hr/>"); a.autoSize || (jQuery(d).width(a.width), jQuery(d).height(a.height), jQuery(d).css("overflow", "hidden")); a = AVENZA._elementForWebTag(a); jQuery(a).css("overflow", "hidden"); jQuery(d).append(a);
        return d
    } function a(a) {
        if (a.isFixedCallout) {
            var d = window.getComputedStyle(a, null), b = parseInt(d.getPropertyValue("width"), 10), d = parseInt(d.getPropertyValue("height"), 10), f = window.getComputedStyle(document.getElementById(a.avenzaViewerId), null), n = parseInt(f.getPropertyValue("width"), 10), f = parseInt(f.getPropertyValue("height"), 10), h = 0, c = 0; switch (a.fixedCalloutPosition) {
                case AVENZA.QUAD.TOP_LEFT: h = 5; c = 50; break; case AVENZA.QUAD.TOP_RIGHT: h = n - b - 25; c = 50; break; case AVENZA.QUAD.BOTTOM_LEFT: h = 5; c = f - d - 25; break;
                case AVENZA.QUAD.BOTTOM_RIGHT: h = n - b - 25, c = f - d - 25
            }jQuery(a).css("left", h).css("top", c).css("overflow", "hidden")
        }
    } AVENZA._createClickCallout = function (g, d, b, f) {
        var n = document.createElement("div"); jQuery(n).css("position", "absolute").css("pointer-events", "none"); b = c(g); jQuery(b).css("pointer-events", "auto").addClass("avz-click-callout-bubble"); var h = null; switch (f) {
            case AVENZA.QUAD.TOP_LEFT: h = "avz-top-left"; break; case AVENZA.QUAD.TOP_RIGHT: h = "avz-top-right"; break; case AVENZA.QUAD.BOTTOM_LEFT: h = "avz-bottom-left";
                break; case AVENZA.QUAD.BOTTOM_RIGHT: h = "avz-bottom-right"
        }h && jQuery(b).addClass(h); jQuery(n).append(b); if (d) { d = AVENZA._createButton("avz-button-close", d); if (AVENZA._isTouchDevice()) d.isCloseButton = !0; jQuery(d).append(AVENZA._createCloseIcon()); jQuery(b).prepend(d) } return { element: n, update: function () { a(n, g) } }
    }; AVENZA._createHoverCallout = function (g, d) { var b = d ? e(g) : c(g); jQuery(b).addClass("avz-hover-callout-bubble"); return { element: b, update: function () { a(b, g) } } }; AVENZA._createFixedCallout = function (g, d) {
        var b =
            c(d); jQuery(b).addClass("avz-fixed-callout-bubble"); jQuery(b).css("overflow", "hidden"); b.isFixedCallout = !0; b.avenzaViewerId = g._options.id; b.fixedCalloutPosition = g._options.fixedCalloutPosition; return { element: b, update: function () { a(b, d) } }
    }
})(); (function () {
    function e(f) { if (f._options.selected) { var a = null, b = f._selectedFeatureId; b && f._featureData[b] && (a = { id: b, attributes: f._featureData[b].attributes }); f._options.selected(a) } } function c(f, b, h, c) {
        AVENZA._isTouchDevice() && g(f, b, h, c); f._selectedFeatureId = b; f._options.disableClickHighlight || AVENZA._addClassToFeature(h, "avz-feature-selected"); h = f._featureData[b]; b = AVENZA._webTagDataForFeature(f, h); if (!f._options.disableClickCallout) {
            var m = AVENZA._quadForPageLocation(f, { x: c.pageX, y: c.pageY }), l = AVENZA._createClickCallout(b,
                function () { a(f) }, !0, m); f._clickCallout = l.element; var o = jQuery(f._element).offset(), r = jQuery(f._element).width(), o = c.pageX - o.left; jQuery(f._clickCallout).css("max-width", o < r / 2 ? r - o : o); f._addCallout(f._clickCallout, c, m, f._options.useCentroidForClickCallout ? { x: h.ctrX, y: h.ctrY } : null); l.update()
        } if (f._options.fixedCallout) c = AVENZA._createFixedCallout(f, b), f._fixedCallout ? jQuery(f._fixedCallout).replaceWith(c.element) : jQuery(f._element).append(c.element), f._fixedCallout = c.element, c.update(); b.clickUrl &&
            window.open(b.clickUrl, b.clickUrlTarget); d(f); e(f)
    } function a(f) { if (f._clickCallout) f._removeCallout(f._clickCallout), f._clickCallout = null; if (f._fixedCallout) jQuery(f._fixedCallout).remove(), f._fixedCallout = null; var a = f._selectedFeatureId; if (f._selectedFeatureId) { if (!f._options.disableClickHighlight) { var b = document.getElementById(f._selectedFeatureId); AVENZA._removeClassFromFeature(b, "avz-feature-selected") } f._selectedFeatureId = null } e(f); return a } function g(a, g, c, e) {
        if (!a._isAnimating) if (a._hoverCallout &&
            a._highlightedFeatureId == g) jQuery(a._hoverCallout).css("left", e.pageX + b + "px").css("top", e.pageY + b + "px"); else {
                var m = a._featureData[g]; if (a.isLayerVisible(m.layer)) {
                    d(a); a._highlightedFeatureId = g; var l = document.getElementById(a._highlightedFeatureId); a._options.disableHoverHighlight || (AVENZA._addClassToFeature(c, "avz-feature-mouseover"), a._options.useFillHighlight && (AVENZA._addClassToFeature(c, "avz-feature-mouseover-fill"), null !== a._hoverFillColor && ("" === a._hoverFillColor ? AVENZA._removeClassFromFeature(l,
                        "avz-feature-mouseover-fill") : $(".avz-feature-mouseover-fill").css("fill", a._hoverFillColor)), a._hoverFillOpacity && $(".avz-feature-mouseover-fill").css("fill-opacity", a._hoverFillOpacity)), null !== a._hoverStrokeColor && ("" === a._hoverStrokeColor ? AVENZA._removeClassFromFeature(l, "avz-feature-mouseover") : $(".avz-feature-mouseover").css("stroke", a._hoverStrokeColor)), a._hoverStrokeWidth && $(".avz-feature-mouseover").css("stroke-width", a._hoverStrokeWidth), a._hoverStrokeOpacity && $(".avz-feature-mouseover").css("stroke-opacity",
                            a._hoverStrokeOpacity)); if (g != a._selectedFeatureId) { g = AVENZA._webTagDataForFeature(a, m); if (!a._options.disableHoverCallout && (c = !a._options.useClickCalloutForHover, !c || g.title && 0 < g.title.length)) c = AVENZA._createHoverCallout(g, c), a._hoverCallout = c.element, jQuery(a._hoverCallout).css("position", "absolute").css("left", e.pageX + b + "px").css("top", e.pageY + b + "px"), jQuery("body").append(a._hoverCallout), c.update(); g.hoverUrl && window.open(g.hoverUrl, g.hoverUrlTarget) }
                }
        }
    } function d(a) {
        if (a._hoverCallout) jQuery(a._hoverCallout).remove(),
            a._hoverCallout = null; var b = a._highlightedFeatureId; if (a._highlightedFeatureId) { var g = document.getElementById(a._highlightedFeatureId); a._options.disableHoverHighlight || ($(".avz-feature-mouseover").css("stroke-opacity", ""), AVENZA._removeClassFromFeature(g, "avz-feature-mouseover"), a._options.useFillHighlight && ($(".avz-feature-mouseover-fill").css("fill-opacity", ""), AVENZA._removeClassFromFeature(g, "avz-feature-mouseover-fill"))); a._highlightedFeatureId = null } return b
    } var b = 10; AVENZA._hideCalloutsForLayer =
        function (b, g) { var c = null; b._highlightedFeatureId && (c = b._featureData[b._highlightedFeatureId]) && g == c.layer && d(b); b._selectedFeatureId && (c = b._featureData[b._selectedFeatureId]) && g == c.layer && a(b) }; AVENZA._handleFeatureClick = function (b, g, d) { if (!b._isAnimating && (!d || !d.layer || b.isLayerVisible(d.layer))) { for (var e = d.getAttribute("id"); !e;)d = d.parentNode, e = d.getAttribute("id"); var m = a(b); e != m && AVENZA._isFeature(d) && c(b, e, d, g) } }; AVENZA._addCalloutInteractionToFeatures = function (a, b) {
            AVENZA._isTouchDevice() ||
            jQuery(b).children().mousemove(function (b) { var d = this.getAttribute("id"); g(a, d, this, b) }).mouseout(function () { d(a) }).click(function (b) { AVENZA._handleFeatureClick(a, b, this) })
        }
})(); (function () {
AVENZA._showDialog = function (e, c) {
    jQuery(".avz-dialog-background").remove(); var a = document.createElement("div"); jQuery(a).addClass("avz-dialog-background").css("position", "absolute").css("top", "0").css("left", "0").css("width", "100%").css("height", "100%"); jQuery(e._element).append(a); var g = document.createElement("div"); jQuery(g).addClass("avz-dropshadow").addClass("avz-border").css("position", "absolute").css("margin", "10px").css("padding", "20px").html(c); jQuery(a).append(g); var d = jQuery(e._element).innerWidth(),
        b = jQuery(e._element).innerHeight(), f = jQuery(g).outerWidth(!0), n = jQuery(g).outerHeight(!0); jQuery(g).css("top", (b - n) / 2 + "px").css("left", (d - f) / 2 + "px"); return a
}; AVENZA._closeDialog = function () { jQuery(".avz-dialog-background").fadeOut(function () { jQuery(this).remove() }) }
})(); (function () {
    function e(c, a) { var g = a, d; for (d in c) g = g.replace(RegExp("%" + d + "%", "g"), c[d]); return g } AVENZA._webTagDataForFeature = function (c, a) {
        if (!a.webtag._title) a.webtag._title = e(a.attributes, a.webtag.title); if (!a.webtag._content) { a.webtag._content = e(a.attributes, a.webtag.content); var g = a.webtag, d; d = c._sourceMediaFolder(); d = a.webtag._content.replace(/sourcemedia/g, d); g._content = d } if (a.webtag.image && !a.webtag._image) a.webtag._image = {
            width: a.webtag.image.width, height: a.webtag.image.height, url: c._sourceMediaFolder() +
                "/" + e(a.attributes, a.webtag.image.url)
        }; if (a.webtag.clickUrl && !a.webtag._clickUrl) a.webtag._clickUrl = e(a.attributes, a.webtag.clickUrl); if (a.webtag.clickUrlTarget && !a.webtag._clickUrlTarget) a.webtag._clickUrlTarget = e(a.attributes, a.webtag.clickUrlTarget); if (a.webtag.hoverUrl && !a.webtag._hoverUrl) a.webtag._hoverUrl = e(a.attributes, a.webtag.hoverUrl); if (a.webtag.hoverUrlTarget && !a.webtag._hoverUrlTarget) a.webtag._hoverUrlTarget = e(a.attributes, a.webtag.hoverUrlTarget); return {
            title: a.webtag._title, content: a.webtag._content,
            image: a.webtag._image, imageAutoSize: a.webtag.imageAutoSize, width: a.webtag.width, height: a.webtag.height, autoSize: a.webtag.autoSize, clickUrl: a.webtag._clickUrl, clickUrlTarget: a.webtag._clickUrlTarget, hoverUrl: a.webtag._hoverUrl, hoverUrlTarget: a.webtag._hoverUrlTarget
        }
    }; AVENZA._elementForWebTagTitle = function (c) { var a = document.createElement("div"); jQuery(a).addClass("avz-webtag-title").html(c.title); return a }; AVENZA._CONTENT_IMAGE_PADDING = 5; AVENZA._elementForWebTag = function (c) {
        var a = document.createElement("div");
        jQuery(a).addClass("avz-webtag"); var g = a, d = a; if (c.image && c.content) { var b = document.createElement("table"); jQuery(b).css("border", "none").css("border-spacing", "0"); g = document.createElement("td"); jQuery(g).css("vertical-align", "top").css("padding", "0").css("padding-right", "7px"); d = document.createElement("td"); jQuery(d).css("vertical-align", "top").css("padding", "0"); var f = document.createElement("tr"); jQuery(f).append(g).append(d); jQuery(b).append(f); jQuery(a).append(b) } b = null; c.image && (b = document.createElement("img"),
            jQuery(b).addClass("avz-webtag-image").attr("src", c.image.url), c.imageAutoSize || jQuery(b).attr("width", c.image.width + "px").attr("height", c.image.height + "px"), jQuery(g).append(b)); c.content && (g = document.createElement("div"), jQuery(g).addClass("avz-webtag-content").html(c.content), jQuery(d).append(g)); return a
    }
})(); (function () {
    function e(a, d) {
        var b = document.createElement("li"), f = document.createElement("span"); jQuery(f).attr("id", "check_" + d.id).css("visibility", d.visible ? "visible" : "hidden").html("&nbsp;&#10003;&nbsp;"); var c = null; d.icon && (c = document.createElement("img"), jQuery(c).attr("src", a._sourceMediaFolder() + d.icon)); var e = document.createElement("span"); jQuery(e).html("&nbsp;" + d.name + "&nbsp;"); jQuery(b).append(f).append(c).append(e).click(function () {
            a.setVisible(d, !d.visible); jQuery(b).addClass("avz-widget-activate");
            setTimeout(function () { jQuery(b).removeClass("avz-widget-activate") }, 200); return !1
        }); return b
    } function c(a) { for (var d = document.createElement("ul"), b = a._layers.length, f = 0; f < b; f++) { var c = a._layers[f]; c.userToggle && (c = e(a, c), jQuery(d).append(c)) } jQuery(d).addClass("avz-widget").addClass("avz-dropshadow").addClass("avz-border").addClass("avz-layer-list"); AVENZA._isTouchDevice() || jQuery(d).addClass("avz-layer-list-notouch"); return d } function a(a) {
        var d = AVENZA._createBorderButton("avz-button-layers", function (b) {
            function d() {
                clearTimeout(m);
                m = null; jQuery(h).remove(); jQuery(i).hide("fast", function () { jQuery(i).remove() })
            } function e() { m || (m = setTimeout(d, 500)) } var h = document.createElement("div"), i = c(a), m = null; jQuery(i).css("display", "none").css("position", "absolute").mouseleave(function () { e() }).mouseover(function () { clearTimeout(m); m = null }); jQuery(h).css("position", "absolute").css("top", 0).css("left", 0).css("width", "100%").css("height", "100%"); jQuery(a._element).append(h); jQuery(h).click(function () { e(); return !1 }).bind("touchstart", function () {
                e();
                return !1
            }); jQuery(a._element).append(i); var l = jQuery(a._element).offset(), o = AVENZA._quadForPageLocation(a, { x: b.pageX, y: b.pageY }); o.isTop ? jQuery(i).css("top", b.pageY - l.top - 3) : jQuery(i).css("bottom", l.top + jQuery(a._element).height() - b.pageY - 3); o.isLeft ? jQuery(i).css("left", b.pageX - l.left - 3) : jQuery(i).css("right", l.left + jQuery(a._element).width() - b.pageX - 3); jQuery(i).show("fast")
        }, !0); jQuery(d).attr("title", "Show layers").append(AVENZA._createLayerListIcon(a._options.prefixUrl)); return d
    } AVENZA._updateCheckVisibility =
        function (a) { jQuery("#check_" + a.id).css("visibility", a.visible ? "visible" : "hidden") }; AVENZA._createLayersWidget = function (c) { return a(c) }
})(); (function () {
    function e(a) { a._options.disableSearchHighlight || jQuery(".avz-feature-search-highlight").each(function () { AVENZA._removeClassFromFeature(this, "avz-feature-search-highlight") }) } function c(a, c, d, b) {
        var c = c.toLowerCase(), f = null; jQuery.each(a._featureData, function (b, l) {
            var o = AVENZA._webTagDataForFeature(a, l); if (0 <= o.title.toLowerCase().indexOf(c) || 0 <= o.content.toLowerCase().indexOf(c)) {
                var o = document.getElementById(l.id), e = a.isLayerVisible(o.layer); o && e && !a._options.disableSearchHighlight &&
                    (d || ($(".avz-feature-search-highlight").css("stroke", ""), $(".avz-feature-search-highlight").css("stroke-width", ""), AVENZA._addClassToFeature(o, "avz-feature-search-highlight")), o = new OpenSeadragon.Rect(l.extX, l.extY, l.extW, l.extH), f = null === f ? o : f.union(o))
            }
        }); if (!a._options.disableSearchHighlight && !b && null !== f) {
            var b = f.getCenter().x, e = f.getCenter().y, h = a._element.clientWidth / (f.width + 20), i = a._element.clientHeight / (f.height + 20), h = h < i ? h : i; if (h > a._options.maxZoom) h = a._options.maxZoom; a.panToPointAndZoom({
                x: b,
                y: e
            }, h, !1)
        }
    } AVENZA._initializeForSearch = function (a) { a.search = function (g, d, b) { e(a); g && c(a, g, d, b) } }; AVENZA._createSearchWidget = function (a) {
        var g = document.createElement("div"); jQuery(g).addClass("avz-widget").addClass("avz-dropshadow").addClass("avz-border").addClass("avz-search-box").css("position", "absolute").css("overflow", "hidden"); var d = function () { "" !== jQuery(b).val() ? jQuery(f).css("visibility", "visible") : jQuery(f).css("visibility", "hidden") }, b = document.createElement("input"); jQuery(b).addClass("avz-search-box-input").attr("placeholder",
            a._options.searchBoxPlaceholderText).attr("type", "text").attr("autocorrect", "off").attr("autocapitalize", "off").keydown(function () { }).keypress(function (b) { if (13 == (b.keyCode ? b.keyCode : b.which)) { jQuery(this).blur(); e(a); var d = jQuery(this).val(); d && c(a, d, !1, !a._options.revealSearchResults); b.preventDefault() } }).keyup(d).change(d); jQuery(g).append(b); var f = AVENZA._createButton("avz-search-box-clear-button", function () { e(a); jQuery(b).blur().val(""); d() }); jQuery(f).css("float", "right").css("visibility",
                "hidden").append(AVENZA._createClearIcon()); jQuery(g).append(f); return g
    }
})(); (function () {
    function e(a, g, d, b, f) {
        var e = a + "icons/", h = document.createElementNS(c, "svg"); h.setAttribute("viewBox", "0 0 35 34"); h.setAttribute("visibility", "visible"); var i = document.createElementNS(c, "image"); i.setAttributeNS(null, "width", "35"); i.setAttributeNS(null, "height", "34"); i.setAttributeNS("http://www.w3.org/1999/xlink", "href", e + g); i.setAttributeNS(null, "x", "0"); i.setAttributeNS(null, "y", "0"); i.setAttributeNS(null, "visibility", "visible"); h.isToggle = f; h.isPressed = !1; h.toggleSel = function () { i.onmouseup() };
        i.onmouseover = function () { h.isPressed || i.setAttributeNS("http://www.w3.org/1999/xlink", "href", e + d); return !1 }; i.onmousedown = function () { h.isToggle ? (h.isPressed ? i.setAttributeNS("http://www.w3.org/1999/xlink", "href", e + g) : i.setAttributeNS("http://www.w3.org/1999/xlink", "href", e + b), h.isPressed = !h.isPressed) : i.setAttributeNS("http://www.w3.org/1999/xlink", "href", e + b); AVENZA._isTouchDevice() && setTimeout(function () { i.setAttributeNS("http://www.w3.org/1999/xlink", "href", e + g) }, 100); return !1 }; i.onmouseup = function () {
            i.setAttributeNS("http://www.w3.org/1999/xlink",
                "href", e + d); return !1
        }; i.onmouseout = function () { (!h.isToggle || h.isToggle && !h.isPressed) && i.setAttributeNS("http://www.w3.org/1999/xlink", "href", e + g); return !1 }; h.appendChild(i); return h
    } var c = "http://www.w3.org/2000/svg"; AVENZA._createZoomSelectionIcon = function (a) { return e(a, "selection_rest.png", "selection_hover.png", "selection_pressed.png", !0) }; AVENZA._createHomeIcon = function (a) { return e(a, "home_rest.png", "home_hover.png", "home_pressed.png", !1) }; AVENZA._createClearIcon = function () {
        var a = document.createElementNS(c,
            "svg"); a.setAttribute("viewBox", "0 0 44 44"); var e = document.createElementNS(c, "path"); e.setAttribute("class", "avz-icon"); e.setAttribute("d", "M22,2.898c-10.546,0-19.095,8.47-19.095,18.916C2.906,32.261,11.454,40.73,22,40.73c10.544,0,19.093-8.47,19.093-18.917C41.094,11.368,32.545,2.898,22,2.898z M33.389,27.638l-5.396,5.377l-5.819-5.796l-5.846,5.824l-5.396-5.377l5.846-5.823l-5.875-5.853l5.397-5.376l5.874,5.853l5.846-5.825l5.398,5.376l-5.846,5.824L33.389,27.638z"); a.appendChild(e); return a
    }; AVENZA._createCloseIcon =
        function () {
            var a = document.createElementNS(c, "svg"); a.setAttribute("viewBox", "0 0 44 44"); var e = document.createElementNS(c, "path"); e.setAttribute("class", "avz-icon"); e.setAttribute("d", "M34.8020095825195,30.0493774414063L24.9715270996094,20.2188949584961 34.8020095825195,10.3884143829346 30.1387805938721,5.72518730163574 20.3083000183105,15.5556678771973 10.4775342941284,5.72490310668945 5.81430625915527,10.3881320953369 15.6450710296631,20.2188949584961 5.81458854675293,30.0493774414063 10.4778156280518,34.7126083374023 20.3082981109619,24.8821258544922 30.1387805938721,34.7126083374023 34.8020095825195,30.0493774414063z");
            a.appendChild(e); return a
        }; AVENZA._createLayerListIcon = function (a) { return e(a, "layers_rest.png", "layers_hover.png", "layers_pressed.png", !1) }; AVENZA._createZoomInIcon = function (a) { return e(a, "zoomin_rest.png", "zoomin_hover.png", "zoomin_pressed.png", !1) }; AVENZA._createZoomOutIcon = function (a) { return e(a, "zoomout_rest.png", "zoomout_hover.png", "zoomout_pressed.png", !1) }
})(); (function () {
    function e() { throw "Not implemented"; } function c(a, b) {
    a._options = {
        id: b.id, descButtonId: b.descButtonId, descPanelId: b.descPanelId, legendButtonId: b.legendButtonId, legendPanelId: b.legendPanelId, legendImageId: b.legendImageId, prefixUrl: b.prefixUrl || "./", disableMousePan: b.disableMousePan || !1, disableMouseZoom: b.disableMouseZoom || !1, enableZoomSelection: b.enableZoomSelection || !1, navigationControls: b.navigationControls || AVENZA.QUAD.TOP_LEFT, layerList: b.layerList || AVENZA.QUAD.TOP_LEFT, mutuallyExclusiveLayers: b.mutuallyExclusiveLayers ||
            !1, searchBox: b.searchBox || AVENZA.HIDDEN, searchBoxPlaceholderText: b.searchBoxPlaceholderText || "Search", revealSearchResults: b.revealSearchResults || !1, showZoomAdjScaleBar: b.showZoomAdjScaleBar || !1, zoomAdjScaleBarPosition: b.zoomAdjScaleBarPosition || AVENZA.QUAD.BOTTOM_LEFT, pixelsPerMeter: b.pixelsPerMeter || 0, scaleBarUnit: b.scaleBarUnit || AVENZA.SCALE_BAR_UNITS.IMPERIAL, disableClickCallout: b.disableClickCallout || !1, useCentroidForClickCallout: b.useCentroidForClickCallout || !1, disableHoverCallout: b.disableHoverCallout ||
                !1, useClickCalloutForHover: b.useClickCalloutForHover || !1, fixedCallout: b.fixedCallout || !1, fixedCalloutPosition: b.fixedCalloutPosition || AVENZA.QUAD.TOP_LEFT, loadingMessage: b.loadingMessage || "Loading...", disableClickHighlight: b.disableClickHighlight || !1, disableHoverHighlight: b.disableHoverHighlight || !1, useFillHighlight: b.useFillHighlight || !1, disableSearchHighlight: b.disableSearchHighlight || !1, viewport: b.viewport || null, useContainerAsViewport: b.useContainerAsViewport || !1, maxZoom: b.maxZoom || 4, fastAnimations: !0,
        showMapDescription: b.showMapDescription || !1, mapDescriptionLoc: b.mapDescriptionLoc || AVENZA.PANEL_POSITION.LEFT, mapDescOpenState: !1, showMapLegend: b.showMapLegend || !1, mapLegendOpenState: !1, mapLegendInit: !1, mapLegendProps: null
    }; a._options.mapLegendLoc = a._options.mapDescriptionLoc != AVENZA.PANEL_POSITION.RIGHT ? AVENZA.PANEL_POSITION.RIGHT : AVENZA.PANEL_POSITION.LEFT; if (b.hasOwnProperty("fastAnimations")) a._options.fastAnimations = b.fastAnimations; if (b.hasOwnProperty("minZoomImageRatio")) a._options.minZoomImageRatio =
        b.minZoomImageRatio; if (b.hasOwnProperty("visibilityRatio")) a._options.visibilityRatio = b.visibilityRatio; if (b.hasOwnProperty("load") && "function" == typeof b.load) a._options.load = b.load; if (b.hasOwnProperty("error") && "function" == typeof b.error) a._options.error = b.error; if (b.hasOwnProperty("selected") && "function" == typeof b.selected) a._options.selected = b.selected; if (!a._options.id) throw "id must be set in options"; "/" != a._options.prefixUrl.charAt(a._options.prefixUrl.length - 1) && (a._options.prefixUrl += "/")
    }
    function a(b, a, d) { document.querySelector("#" + b).classList.remove(a); document.querySelector("#" + b).classList.add(d) } function g(b) {
        var a = {}, d = window.getComputedStyle(document.getElementById(b._options.id), null); a.cLeft = d.getPropertyValue("left"); a.cTop = d.getPropertyValue("top"); a.cWidth = d.getPropertyValue("width"); a.cHeight = d.getPropertyValue("height"); a.cMaxHeight = d.getPropertyValue("max-height"); a.cMaxWidth = d.getPropertyValue("max-width"); d = document.getElementById(b._options.descPanelId); a.descPanelWidth =
            d.offsetWidth.toString() + "px"; a.descPanelHeight = d.offsetHeight.toString() + "px"; b = document.getElementById(b._options.descButtonId); a.descButtonWidth = b.getBoundingClientRect().width; a.descButtonHeight = b.getBoundingClientRect().height; return a
    } function d(b) {
        var d = b._options.mapDescriptionLoc, f = document.getElementById(b._options.descPanelId); f.style.display = ""; var j = g(b), c = document.getElementById(b._options.descButtonId), k, e; if (d === AVENZA.PANEL_POSITION.LEFT) f.style.left = "0px", c.style.left = j.descPanelWidth,
            c.style.top = ((parseInt(j.cHeight, 10) - parseInt(j.descButtonHeight, 10)) / 2).toString() + "px", k = "desc-button-left-close", e = "desc-button-left-open"; else if (d === AVENZA.PANEL_POSITION.TOP) f.style.top = "0px", c.style.top = j.descPanelHeight, c.style.left = ((parseInt(j.cWidth, 10) - parseInt(j.descButtonWidth, 10)) / 2).toString() + "px", k = "desc-button-top-close", e = "desc-button-top-open"; else if (d === AVENZA.PANEL_POSITION.RIGHT) d = parseInt(j.cLeft, 10) + parseInt(j.cWidth, 10) - parseInt(j.descPanelWidth, 10), f.style.left = d.toString() +
                "px", f.style.width = j.descPanelWidth, c.style.top = ((parseInt(j.cHeight, 10) - parseInt(j.descButtonHeight, 10)) / 2).toString() + "px", c.style.left = (d - parseInt(j.descButtonWidth, 10)).toString() + "px", k = "desc-button-right-close", e = "desc-button-right-open"; else if (d === AVENZA.PANEL_POSITION.BOTTOM) d = parseInt(j.cTop, 10) + parseInt(j.cHeight, 10) - parseInt(j.descPanelHeight, 10), f.style.top = d.toString() + "px", f.style.height = j.descPanelHeight, c.style.top = (d - parseInt(j.descButtonHeight, 10)).toString() + "px", c.style.left =
                    ((parseInt(j.cWidth, 10) - parseInt(j.descButtonWidth, 10)) / 2).toString() + "px", k = "desc-button-bottom-close", e = "desc-button-bottom-open"; a(b._options.descButtonId, k, e)
    } function b(b) {
        var d = b._options.mapDescriptionLoc, c = g(b), j = document.getElementById(b._options.descButtonId), f, k, e = document.getElementById(b._options.descPanelId); if (d === AVENZA.PANEL_POSITION.LEFT) e.style.left = "-" + c.descPanelWidth, document.getElementById(b._options.id).style.left = "0px", j.style.top = ((parseInt(c.cHeight, 10) - parseInt(c.descButtonHeight,
            10)) / 2).toString() + "px", j.style.left = "0px", f = "desc-button-left-open", k = "desc-button-left-close"; else if (d === AVENZA.PANEL_POSITION.TOP) e.style.top = "-" + c.descPanelHeight, document.getElementById(b._options.id).style.top = "0px", j.style.top = "0px", j.style.left = ((parseInt(c.cWidth, 10) - parseInt(c.descButtonWidth, 10)) / 2).toString() + "px", f = "desc-button-top-open", k = "desc-button-top-close"; else if (d === AVENZA.PANEL_POSITION.RIGHT) document.getElementById(b._options.id).style.left = "0%", e.style.left = c.cWidth, j.style.top =
                ((parseInt(c.cHeight, 10) - parseInt(c.descButtonHeight, 10)) / 2).toString() + "px", j.style.left = (parseInt(c.cWidth, 10) - parseInt(c.descButtonWidth, 10)).toString() + "px", f = "desc-button-right-open", k = "desc-button-right-close"; else if (d === AVENZA.PANEL_POSITION.BOTTOM) document.getElementById(b._options.id).style.top = "0%", e.style.top = c.cHeight, j.style.top = (parseInt(c.cHeight, 10) - parseInt(c.descButtonHeight, 10)).toString() + "px", j.style.left = ((parseInt(c.cWidth, 10) - parseInt(c.descButtonWidth, 10)) / 2).toString() +
                    "px", f = "desc-button-bottom-open", k = "desc-button-bottom-close"; a(b._options.descButtonId, f, k); d = function () { e.style.display = "none" }; b._options.mapDescOpenState ? setTimeout(d, 200) : d()
    } function f(b) {
        if (!b._options.mapLegendInit) {
            var a = document.getElementById(b._options.legendPanelId), d = document.getElementById(b._options.legendImageId); if (null === d) d = document.createElement("img"), d.setAttribute("id", "map_legendImage"), d.setAttribute("class", "legend-Image"), d.src = b._options.prefixUrl + "legend.png", a.appendChild(d);
            var j = b._options, c = {}, k = window.getComputedStyle(document.getElementById(b._options.id), null); c.cLeft = k.getPropertyValue("left"); c.cTop = k.getPropertyValue("top"); if ("auto" == c.cTop) { var f = document.getElementById(b._options.id).offsetTop; c.cTop = f + "px" } c.cWidth = k.getPropertyValue("width"); c.cHeight = k.getPropertyValue("height"); k = document.getElementById(b._options.legendPanelId); k = window.getComputedStyle(k, null); c.legendPanelTop = k.getPropertyValue("top"); if (-1 != c.legendPanelTop.indexOf("%")) f = parseInt(c.legendPanelTop,
                10), c.legendPanelTop = (0.01 * f * parseInt(c.cHeight, 10)).toString() + "px"; c.legendPanelWidth = k.getPropertyValue("width"); c.legendPanelHeight = k.getPropertyValue("height"); k = document.getElementById(b._options.legendButtonId); c.legendButtonWidth = k.getBoundingClientRect().width; c.legendButtonHeight = k.getBoundingClientRect().height; j.mapLegendProps = c; j = d.naturalWidth; d = d.naturalHeight; if (0 < j && 0 < d) j > d ? b._options.mapLegendProps.legendPanelHeight = Math.ceil(parseInt(b._options.mapLegendProps.legendPanelWidth, 10) *
                    d / j).toString() + "px" : b._options.mapLegendProps.legendPanelWidth = Math.ceil(parseInt(b._options.mapLegendProps.legendPanelHeight, 10) * j / d).toString() + "px", b._options.mapLegendInit = !0; a.style.width = b._options.mapLegendProps.legendPanelWidth; a.style.height = b._options.mapLegendProps.legendPanelHeight; a.style.overflow = "hidden"; if (parseInt(b._options.mapLegendProps.legendPanelTop, 10) + parseInt(b._options.mapLegendProps.legendPanelHeight, 10) > parseInt(b._options.mapLegendProps.cTop, 10) + parseInt(b._options.mapLegendProps.cHeight,
                        10)) a.style.top = (parseInt(b._options.mapLegendProps.cTop, 10) + parseInt(b._options.mapLegendProps.cHeight, 10) - parseInt(b._options.mapLegendProps.legendPanelHeight, 10) - 20).toString() + "px"; document.getElementById(b._options.legendButtonId).style.top = (parseInt(b._options.mapLegendProps.legendPanelTop, 10) + (parseInt(b._options.mapLegendProps.legendPanelHeight, 10) - parseInt(b._options.mapLegendProps.legendButtonHeight, 10)) / 2).toString() + "px"
        }
    } function n(b) {
        var d = b._options.mapLegendLoc, c = document.getElementById(b._options.legendButtonId),
        j = document.getElementById(b._options.legendPanelId); j.style.display = ""; b._options.mapLegendInit || f(b); var e, k; if (d === AVENZA.PANEL_POSITION.LEFT) j.style.left = "0%", c.style.left = b._options.mapLegendProps.legendPanelWidth, e = "legend-button-left-close", k = "legend-button-left-open"; else if (d === AVENZA.PANEL_POSITION.RIGHT) d = (parseInt(b._options.mapLegendProps.cWidth, 10) - parseInt(b._options.mapLegendProps.legendPanelWidth, 10)).toString() + "px", j.style.left = d, c.style.left = (parseInt(d, 10) - parseInt(b._options.mapLegendProps.legendButtonWidth,
            10)).toString() + "px", e = "legend-button-right-close", k = "legend-button-right-open"; a(b._options.legendButtonId, e, k)
    } function h(b) {
        var d = b._options.mapLegendLoc, c = document.getElementById(b._options.legendButtonId), j = document.getElementById(b._options.legendPanelId); b._options.mapLegendInit || f(b); var e, k; if (d === AVENZA.PANEL_POSITION.LEFT) j.style.left = "-" + b._options.mapLegendProps.legendPanelWidth, c.style.left = "0px", e = "legend-button-left-open", k = "legend-button-left-close"; else if (d === AVENZA.PANEL_POSITION.RIGHT) j.style.left =
            b._options.mapLegendProps.cWidth, c.style.left = (parseInt(b._options.mapLegendProps.cWidth, 10) - parseInt(b._options.mapLegendProps.legendButtonWidth, 10)).toString() + "px", e = "legend-button-right-open", k = "legend-button-right-close"; a(b._options.legendButtonId, e, k); j.style.display = "none"
    } function i(b, a) { document.getElementById(b).style.display = "none"; document.getElementById(a).style.display = "none" } function m(a) {
        var c = a._options.layerList, f = c != AVENZA.HIDDEN, j = !1; if (f) for (var e = a._layers.length, k = 0; k < e; k++)if (a._layers[k].userToggle) {
            j =
            !0; break
        } f && j && (f = AVENZA._createLayersWidget(a), c == AVENZA.FLOATING && (c = null), a.addWidgetElement(f, c)); c = a._options.searchBox; AVENZA._initializeForSearch(a); c != AVENZA.HIDDEN && (f = AVENZA._createSearchWidget(a), a.addWidgetElement(f, c)); a._options.showMapDescription ? (c = document.querySelector("#" + a._options.descButtonId), f = document.querySelector("#" + a._options.descPanelId), a._options.mapDescriptionLoc === AVENZA.PANEL_POSITION.LEFT ? (c.classList.add("desc-button-left"), f.classList.add("desc-panel-left")) :
            a._options.mapDescriptionLoc === AVENZA.PANEL_POSITION.TOP ? (c.classList.add("desc-button-top"), f.classList.add("desc-panel-top")) : a._options.mapDescriptionLoc === AVENZA.PANEL_POSITION.RIGHT ? (c.classList.add("desc-button-right"), f.classList.add("desc-panel-right")) : a._options.mapDescriptionLoc === AVENZA.PANEL_POSITION.BOTTOM && (c.classList.add("desc-button-bottom"), f.classList.add("desc-panel-bottom")), a._options.mapDescOpenState ? d(a) : b(a), $("#" + a._options.descPanelId).html(a._mapDescription), $(".desc-button").click(function () {
                a._options.mapDescOpenState ?
                b(a) : d(a); a._options.mapDescOpenState = !a._options.mapDescOpenState
            })) : i(a._options.descPanelId, a._options.descButtonId); a._options.showMapLegend ? (c = document.querySelector("#" + a._options.legendButtonId), document.querySelector("#" + a._options.legendPanelId), a._options.mapLegendLoc === AVENZA.PANEL_POSITION.LEFT ? c.classList.add("legend-button-left") : a._options.mapLegendLoc === AVENZA.PANEL_POSITION.RIGHT && c.classList.add("legend-button-right"), a._options.mapLegendOpenState ? n(a) : h(a), $(".legend-button").click(function () {
                a._options.mapLegendOpenState ?
                h(a) : n(a); a._options.mapLegendOpenState = !a._options.mapLegendOpenState
            })) : i(a._options.legendPanelId, a._options.legendButtonId)
    } AVENZA.HIDDEN = "hidden"; AVENZA.FLOATING = "floating"; AVENZA.QUAD = { TOP_LEFT: { isTop: !0, isLeft: !0 }, TOP_RIGHT: { isTop: !0, isLeft: !1 }, BOTTOM_LEFT: { isTop: !1, isLeft: !0 }, BOTTOM_RIGHT: { isTop: !1, isLeft: !1 } }; AVENZA.PANEL_POSITION = { LEFT: 0, TOP: 1, RIGHT: 2, BOTTOM: 3 }; AVENZA.SCALE_BAR_UNITS = { IMPERIAL: 0, METRIC: 1 }; AVENZA.embedViewer = function (b) {
        return !AVENZA._BROWSER_IS_HTML5_READY ? (jQuery("#" + b.id).children().css("display",
            "block"), null) : new AVENZA.Viewer(b)
    }; AVENZA.Viewer = function (b) {
        c(this, b); AVENZA._initializePanZoomViewer(this); jQuery(this._element).addClass("avz-viewer"); var a = this, b = this._options.prefixUrl; AVENZA._showDialog(a, a._options.loadingMessage); jQuery.ajax({
            url: b + "data.js", dataType: "json", success: function (b) {
            a._featureData = {}; a._contentSize = b.size; a._layers = b.layers; if (b.mapDescription) a._mapDescription = b.mapDescription.replace(/sourcemedia/g, a._sourceMediaFolder()); a._hoverStrokeColor = b.hoverStrokeColor;
                a._hoverStrokeWidth = b.hoverStrokeWidth; a._hoverStrokeOpacity = b.hoverStrokeOpacity; a._hoverFillColor = b.hoverFillColor; a._hoverFillOpacity = b.hoverFillOpacity; for (var c = AVENZA._createRootFeatureElement(a._contentSize.width, a._contentSize.height), d = !1, b = a._layers.length, k = b - 1; 0 <= k; k--) {
                    var f = a._layers[k]; f.id = "avz_layer_" + k; f.scaleLayer = f.hiddenAbove || f.hiddenBelow ? !0 : !1; f.hiddenAbove && (f.hiddenAbove /= 100); f.hiddenBelow && (f.hiddenBelow /= 100); if (!f.scaleLayer && a._options.mutuallyExclusiveLayers) k === b -
                        1 ? f.visible = !0 : f.visible && !d ? d = !0 : f.visible = !1; a._addLayer(f, k); if (f.features && 0 < f.features.length) for (var e = f.features, g = e.length - 1; 0 <= g; g--) { var h = e[g]; h.id = "avz_feature_" + k + "_" + g; h.layer = f; a._featureData[h.id] = h; h = AVENZA._createFeatureElement(h); AVENZA._addClassToFeature(h, f.id); jQuery(c).append(h) }
                } AVENZA._addCalloutInteractionToFeatures(a, c); a._addContentElement(c, a._contentSize.width, a._contentSize.height); for (k = 0; k < b; ++k)c = a._layers[k], a._setVisible(c, c.visible); m(a); a._setInitialViewport(!0);
                AVENZA._closeDialog(); a._options.load && a._options.load()
            }, error: function (b) {
                var c = "<p>Could not download data required to display map.</p>", c = /^file\:/.test(location.href) ? c + "<p>It appears that this web page is being loaded with a file url. \t\t\t\t\t\tSome web browsers do not allow background loading of data from the file \t\t\t\t\t\tsystem. Try loading this page through a web server instead.</p>" : c + ("<p>Error: " + b.status + " " + b.statusText + "</p>"); AVENZA._showDialog(a, c); a._options.error && a._options.error(b.status,
                    b.statusText)
            }
        })
    }; AVENZA.Viewer.prototype = {
        panUp: e, panDown: e, panLeft: e, panRight: e, panHome: e, zoomIn: e, zoomOut: e, zoomSelection: e, panToPointAndZoom: e, search: e, addWidgetElement: e, setVisible: function (b, a) {
            var c, d = this._layers.length; if ("string" == typeof b) for (c = 0; c < d; c++)if (0 === b.localeCompare(this._layers[c].name)) { b = this._layers[c]; break } if (b.hasOwnProperty("id")) if (!b.scaleLayer && this._options.mutuallyExclusiveLayers) {
                if (!b.visible && a) for (c = 0; c < d - 1; c++) {
                    var f = this._layers[c]; f.scaleLayer || this._setVisible(f,
                        f === b)
                }
            } else this._setVisible(b, a)
        }, _setVisible: function (b, a) { if (b) jQuery("." + b.id).css("visibility", a ? "" : "hidden"), b.tiledImage && b.tiledImage.setOpacity(a ? 1 : 0), b.visible = a, AVENZA._updateCheckVisibility(b), this._isAnimating || AVENZA._hideCalloutsForLayer(this, b) }, _sourceMediaFolder: function () { return this._options.prefixUrl + "sourcemedia/" }, _addContentElement: e, _addCallout: e, _removeCallout: e, _addLayer: e, _setInitialViewport: e
    }
})(); (function () {
AVENZA._isTouchDevice = function () { return !!("ontouchstart" in window) }; AVENZA.TouchController = function (e, c) {
    var a = function (b) {
    this.init = function () { }; this.dispose = function () { }; this.onTouchStart = function (a) { if (1 <= a.touches.length) b.touchPixelOrigin = b.getTouchPixelOrigin(a), b.dragonViewer.viewport.applyConstraints(!0), b.setCurrentState(b.BASE_STATE) }; this.onTouchMove = function (a) {
        if (2 <= a.touches.length) b.touchPixelOrigin = b.getTouchPixelOrigin(a), b.dragonViewer.viewport.applyConstraints(!0), b.setCurrentState(b.BASE_STATE);
        else { var c = b.getTouchPixelOrigin(a), a = b.dragonViewer.viewport, d = a.getContainerSize(), e = a.getBounds(), c = new OpenSeadragon.Point(b.lastTouchPoint.x - 1.2 * (c.x - b.touchPixelOrigin.x) / d.x * e.width, b.lastTouchPoint.y - 1.2 * (c.y - b.touchPixelOrigin.y) / d.y * e.height); a.panTo(c); a.ensureVisible() }
    }; this.onTouchEnd = function (a) { 0 === a.touches.length && (b.setCurrentState(b.BASE_STATE), b.dragonViewer.viewport.applyConstraints(!0)) }; this.toString = function () { return "DragState" }
    }, g = function (b) {
    this.init = function () { }; this.dispose =
        function () { }; this.onTouchStart = function () { }; this.onTouchMove = function (a) { a = b.getTouchDistance(a); if (0 < a) { if (!b.initialTouchDistance) b.initialTouchDistance = a; var a = a / b.initialTouchDistance, c = b.dragonViewer.viewport, d = c.pointFromPixel(b.touchPixelOrigin); c.zoomTo(b.zoom * a, d); c.ensureVisible() } }; this.onTouchEnd = function (a) { if (2 > a.touches.length) b.setCurrentState(b.BASE_STATE), b.initialTouchDistance = null, b.dragonViewer.viewport.applyConstraints(!0) }; this.toString = function () { return "PinchState" }
    }; this.avenzaViewer =
        c; this.dragonViewer = e; this.lastTouchPoint = this.initialTouchDistance = this.touchPixelOrigin = null; this.lastZoom = 1; var d = null; this.getCurrentState = function () { return d }; this.setCurrentState = function (a) { d && d.dispose(); d = a; d.init() }; this.getTouchPixelOrigin = function (a) { for (var c = a.touches.length, d = new OpenSeadragon.Point(0, 0), e = 0; e < c; e++) { var g = a.touches[e]; d.x += g.pageX; d.y += g.pageY } d.x /= c; d.y /= c; return d }; this.getTouchDistance = function (a) {
            if (2 > a.touches.length) return 0; var c = a.touches[0], a = a.touches[1];
            return Math.abs(c.pageX - a.pageX) + Math.abs(c.pageY - a.pageY)
        }; this.onTouchStart = function (a) { a.preventDefault(); d.onTouchStart(a) }; this.onTouchMove = function (a) { a.preventDefault(); d.onTouchMove(a) }; this.onTouchEnd = function (a) { a.preventDefault(); d.onTouchEnd(a) }; this.TAP_ZOOM_FACTOR = 2; this.DOUBLE_TAP_ZOOM_FACTOR = 0.5; this.SCALE_TRESHOLD = 0.02; this.TAP_DISTANCE_TRESHOLD = 5; this.TAP_TIMEOUT = 800; this.BASE_STATE = new function (a) {
        this.init = function () { }; this.dispose = function () { }; this.onTouchStart = function (c) {
            var d =
                c.touches.length, e = a.dragonViewer.viewport; a.touchPixelOrigin = a.getTouchPixelOrigin(c); a.lastTouchPoint = e.getCenter(); a.zoom = e.getZoom(); 1 == d ? a.setCurrentState(a.TAP_STATE) : 2 == d && a.setCurrentState(a.TWO_FINGER_TAP_STATE)
        }; this.onTouchMove = function () { }; this.onTouchEnd = function () { }; this.toString = function () { return "BaseState" }
        }(this); this.PINCH_STATE = c._options.disableMouseZoom ? this.BASE_STATE : new g(this); this.DRAG_STATE = c._options.disableMousePan ? this.BASE_STATE : new a(this); this.TAP_STATE = new function (a) {
            var c =
                null; this.init = function () { c = setTimeout(this.timeoutHandler, a.TAP_TIMEOUT) }; this.dispose = function () { c && clearTimeout(c) }; this.timeoutHandler = function () { c && (clearTimeout(c), c = null); a.setCurrentState(a.DRAG_STATE) }; this.onTouchStart = function (c) { if (1 <= c.touches.length) a.touchPixelOrigin = a.getTouchPixelOrigin(c), a.setCurrentState(a.PINCH_STATE) }; this.onTouchMove = function (c) { a.getTouchPixelOrigin(c).distanceTo(a.touchPixelOrigin) > a.TAP_DISTANCE_TRESHOLD && a.setCurrentState(a.DRAG_STATE) }; this.onTouchEnd =
                    function (c) { c.target.isCloseButton ? c.target.click() : AVENZA._handleFeatureClick(a.avenzaViewer, { pageX: a.touchPixelOrigin.x, pageY: a.touchPixelOrigin.y }, c.target); a.setCurrentState(a.BASE_STATE) }; this.toString = function () { return "TapState" }
        }(this); this.TWO_FINGER_TAP_STATE = this.PINCH_STATE; this.setCurrentState(this.BASE_STATE); if (e && e.canvas) a = e.canvas, OpenSeadragon.addEvent(a, "touchstart", this.onTouchStart), OpenSeadragon.addEvent(a, "touchmove", this.onTouchMove), OpenSeadragon.addEvent(a, "touchend", this.onTouchEnd)
}
})(); (function () {
AVENZA._SelectionHandler = function (e) {
this.onSelection = e.onSelection; this.viewer = e.viewer; this.avenzaViewer = e.avenzaViewer; this.selectionClass = e.selectionClass; this.selectionCursor = e.selectionCursor; this.inSelectionMode = !1; this.element = this.dragStart = null; this.viewer.addHandler("selection", this.onSelection); this.setState = function (c) { this.inSelectionMode = c; this.mouseDragTacker.setTracking(c); this.viewer.raiseEvent("selection_toggle", { enabled: c }); return this }; this.onSelectionDrag = function (c) {
    this.viewer.setMouseNavEnabled(!1);
    c = c.position; if (null === this.dragStart) this.dragStart = c, this.element = document.createElement("div"), this.element.className = this.selectionClass, this.element.style.left = c.x + "px", this.element.style.top = c.y + "px", this.viewer.canvas.appendChild(this.element), this.viewer.canvas.style.cursor = this.selectionCursor; if (null !== this.element) this.element.style.width = Math.abs(c.x - this.dragStart.x) + "px", this.element.style.height = Math.abs(c.y - this.dragStart.y) + "px", this.element.style.left = 0 > c.x - this.dragStart.x ? c.x +
        "px" : this.dragStart.x + "px", this.element.style.top = 0 > c.y - this.dragStart.y ? c.y + "px" : this.dragStart.y + "px"
}; this.onMouseRelease = function (c) {
    this.viewer.setMouseNavEnabled(!0); if (null !== this.dragStart) {
        var a = this.avenzaViewer._contentSize.width / this.viewer.viewport.containerSize.x, a = this.viewer.viewport.getZoom() / a, e = this.viewer.viewport.deltaPixelsFromPoints(this.viewer.viewport.getBounds().getTopLeft()), d = c.position, c = this.dragStart.x < d.x ? this.dragStart.x : d.x, b = this.dragStart.y < d.y ? this.dragStart.y :
            d.y, c = (e.x + c) / a, b = (e.y + b) / a, e = Math.abs(d.x - this.dragStart.x) / a, a = Math.abs(d.y - this.dragStart.y) / a, a = new OpenSeadragon.Rect(c, b, e, a); this.dragStart = null; if (null !== this.element) this.viewer.canvas.removeChild(this.element), this.element = null; this.viewer.canvas.style.cursor = "default"; this.viewer.raiseEvent("selection", a)
    }
}; this.mouseDragTacker = new OpenSeadragon.MouseTracker({
    element: this.viewer.canvas, dragHandler: OpenSeadragon.delegate(this, this.onSelectionDrag), releaseHandler: OpenSeadragon.delegate(this,
        this.onMouseRelease)
}); this.setState(this.inSelectionMode)
}
})(); (function () {
    function e(a, b) { var c = !a.zoomSelectionHandler.inSelectionMode; a.zoomSelectionHandler.setState(c); b.innerTracker.ignoreMouseMove = c; b.outerTracker.ignoreMouseMove = c } function c(a, b) {
        if (AVENZA.HIDDEN != a._options.navigationControls) {
            var c = a._options.navigationControls; AVENZA.FLOATING == c && (c = null); var d = AVENZA._createBorderButton("avz-button-home", function () { a.panHome() }, !0); jQuery(d).attr("title", "Return to original view (Ctrl+Shift+H)").append(AVENZA._createHomeIcon(a._options.prefixUrl));
            var f = AVENZA._createBorderButton("avz-button-zoom-in", function () { a.zoomIn() }, !0); jQuery(f).attr("title", "Zoom in (Ctrl+Shift++)").append(AVENZA._createZoomInIcon(a._options.prefixUrl)); var g = AVENZA._createBorderButton("avz-button-zoom-out", function () { a.zoomOut() }, !0); jQuery(g).attr("title", "Zoom out(Ctrl+Shift+-)").append(AVENZA._createZoomOutIcon(a._options.prefixUrl)); var h = null; if (a._options.enableZoomSelection && !AVENZA._isTouchDevice()) {
                var h = AVENZA._createBorderButton("avz-button-zoom-sel", function () {
                    e(a,
                        b)
                }, !0), i = AVENZA._createZoomSelectionIcon(a._options.prefixUrl); jQuery(h).attr("title", "Toggle Zoom selection mode (Ctrl+Shift+Z)").append(i); a.zoomSelectionElement = i
            } c && !c.isLeft ? (a.addWidgetElement(g, c), a.addWidgetElement(f, c), h && a.addWidgetElement(h, c), a.addWidgetElement(d, c)) : (a.addWidgetElement(d, c), a.addWidgetElement(f, c), a.addWidgetElement(g, c), h && a.addWidgetElement(h, c))
        }
    } function a(a) {
        $(a).find("a").bind("touchstart", function (a) {
            var b = $(this), c = b.attr("target") || null; window.open(b.attr("href"),
                c); a.preventDefault()
        })
    } function g(a, b) { var c = OpenSeadragon.getMousePosition(b).minus(OpenSeadragon.getElementPosition(a.element)); return a.viewport.pointFromPixel(c) } function d(a, b) { return a._contentSize.width / b.viewport.containerSize.x } function b(a, b, c) { var e = b.viewport, a = d(a, b), a = e.getZoom() / a, c = (new OpenSeadragon.Point(c.x, c.y)).times(a); return e.deltaPointsFromPixels(c) } function f(a, b) {
        for (var c = d(a, b), c = b.viewport.getZoom() / c, e = a._layers.length, f = 0; f < e; f++) {
            var g = a._layers[f], h = g.scaleLayer;
            h && (g.hiddenAbove && (h = c <= g.hiddenAbove), h && g.hiddenBelow && (h = c >= g.hiddenBelow), a.setVisible(g, h))
        }
    } function n(a, b) {
        function c() { AVENZA._closeDialog(a) } function e() {
            var g, h = b.viewport; g = d(a, b); var p = h.getZoom() / g; g = "zoom = " + p.toFixed(2); g += "<br/>"; var q = h.getBounds(), i = h.deltaPixelsFromPoints(q.getTopLeft()).divide(p), q = h.deltaPixelsFromPoints(q.getBottomRight()).divide(p); g += "top left = (" + i.x.toFixed(2) + ", " + i.y.toFixed(2) + ")"; g += "<br/>"; p = h.deltaPixelsFromPoints(h.getCenter()).divide(p); g += " center = (" +
                p.x.toFixed(2) + ", " + p.y.toFixed(2) + ")"; g = g + "<br/>" + ("bottom right = (" + q.x.toFixed(2) + ", " + q.y.toFixed(2) + ")"); g += "<br/>"; p = h.getContainerSize(); g = g + ("container size = " + p) + "<br/>"; h = h.getAspectRatio(); g += "container aspect ratio = " + h.toFixed(2); g = g + "<br/>" + ("content size=(" + a._contentSize.width.toFixed(2) + ", " + a._contentSize.height.toFixed(2) + ")"); p = h = 0; i = a._layers.length; for (q = i - 1; 0 <= q; q--) { var m = a._layers[q]; m.svg && h++; m.visible && p++ } g = g + "<br/>" + (i + " layers, " + h + " svg layers, " + p + " visible") + "<br/>";
            AVENZA.DEBUG_INFO_ON_DOCUMENT && null !== f ? jQuery(f).html(g) : (g = AVENZA._showDialog(a, g), jQuery(g).click(c))
        } var f = null; if (AVENZA.DEBUG_INFO) {
            var g = AVENZA._createBorderButton("AVENZA_DEBUG_INFO", e, !0); jQuery(g).attr("title", "Display debugging information").css("padding", "5px").css("width", "auto").css("height", "auto").css("visibility", "visible").html("<b>Debug Info</b>"); a.addWidgetElement(g, AVENZA.QUAD.BOTTOM_RIGHT); AVENZA.DEBUG_INFO_ON_DOCUMENT && (g = document.createElement("div"), jQuery(g).attr("id", "AVENZA_DEBUG_INFO").css("background",
                "white").css("color", "black").css("padding", "3px").width(250), a.addWidgetElement(g, AVENZA.QUAD.BOTTOM_LEFT), f = g)
        }
    } function h(a) {
        var b = document.createElement("div"); jQuery(b).attr("id", "AVENZA_DEBUG_FPS").css("background", "red").css("color", "white").css("padding", "3px").html("<b>Calculating...</b>").width(100); a.addWidgetElement(b, AVENZA.QUAD.TOP_LEFT); setInterval(function () {
            var a = 1E3 / m.avgUpdateTime; m.clearProfile(); m.beginUpdate(); var c = "green"; 10 > a ? c = "red" : 30 > a && (c = "orange"); jQuery(b).html("<center><b>" +
                a.toFixed(1) + " FPS</b></center>").css("background", c)
        }, 1E3)
    } function i(c, e) {
    c.pan = function (a, b) { var c = e.viewport; c.panBy((new OpenSeadragon.Point(a, b)).divide(c.getZoom(!0))); c.applyConstraints(!1) }; c.panUp = function () { this.pan(0, -l) }; c.panDown = function () { this.pan(0, l) }; c.panLeft = function () { this.pan(-l, 0) }; c.panRight = function () { this.pan(l, 0) }; c.panHome = function () { jQuery.isPlainObject(this._options.viewport) ? this._setInitialViewport(!1) : e.viewport.goHome(!1) }; c.zoomIn = function () {
        var a = e.viewport; a.zoomBy(o);
        a.applyConstraints(!1)
    }; c.zoomOut = function () { var a = e.viewport; a.zoomBy(r); a.applyConstraints(!1) }; c.handleZoomSelection = function (a) { if (this.zoomSelectionHandler.inSelectionMode) { var b = { x: a.x + a.width / 2, y: a.y + a.height / 2 }, a = e.viewport.getContainerSize().y / a.width; a > e.viewport.getMaxZoom() && (a = e.viewport.getMaxZoom()); c.panToPointAndZoom(b, a, !1) } }; c.panToPointAndZoom = function (a, c, f) {
        var g = e.viewport, a = b(this, e, a), h = d(this, e), j = c * h, c = c * g.getAspectRatio() * h, i = new OpenSeadragon.Rect(a.x - 0.5 / j, a.y - 0.5 / c,
            1 / j, 1 / c), c = function () { g.fitBounds(i, f); g.applyConstraints(f) }; AVENZA._isTouchDevice() ? setTimeout(c, 400) : c()
    }; c._addCallout = function (c, d, f, h) {
        d = h ? b(this, e, h) : g(e, d); h = null; switch (f) { case AVENZA.QUAD.TOP_LEFT: h = OpenSeadragon.OverlayPlacement.TOP_LEFT; break; case AVENZA.QUAD.TOP_RIGHT: h = OpenSeadragon.OverlayPlacement.TOP_RIGHT; break; case AVENZA.QUAD.BOTTOM_LEFT: h = OpenSeadragon.OverlayPlacement.BOTTOM_LEFT; break; case AVENZA.QUAD.BOTTOM_RIGHT: h = OpenSeadragon.OverlayPlacement.BOTTOM_RIGHT }c.style.visibility =
            "hidden"; e.addOverlay(c, d, h); e.drawer.clear(); e.world.draw(); e.updateOverlay(c, d, h); e.drawer.clear(); e.world.draw(); c.style.visibility = "visible"; a(c); jQuery(c).find("img").load(function () { e.drawer.update() })
    }; c._removeCallout = function (a) { e.removeOverlay(a) }; c._setInitialViewport = function (a) { var b = this._options.viewport; jQuery.isPlainObject(b) && this.panToPointAndZoom(b, b.zoom, a); if (null !== e.viewport && (a = e.viewport.getZoom(), b = e.viewport.getMinZoom(), a < b)) e.viewport.minZoomImageRatio = a; f(this, e) }; c._getCurrentZoom =
        function () { var a = d(c, e); return e.viewport.getZoom() / a }; c._addContentElement = function (a) { e.addOverlay(a, e.viewport.getBounds()); e.drawer.container.appendChild(a) }; c.addWidgetElement = function (b, c) {
            var d = null; "string" === typeof b ? (d = AVENZA._createBasicWidget(), jQuery(d).css("padding", "5px").html(b)) : d = b; jQuery(d).addClass("avz-widget"); var f = null; switch (c) {
                case AVENZA.QUAD.TOP_RIGHT: f = OpenSeadragon.ControlAnchor.TOP_RIGHT; break; case AVENZA.QUAD.BOTTOM_LEFT: f = OpenSeadragon.ControlAnchor.BOTTOM_LEFT; break;
                case AVENZA.QUAD.BOTTOM_RIGHT: f = OpenSeadragon.ControlAnchor.BOTTOM_RIGHT; break; case AVENZA.QUAD.TOP_LEFT: f = OpenSeadragon.ControlAnchor.TOP_LEFT
            }e.addControl(d, { anchor: f }); a(d); return d
        }; c._addLayer = function (a) {
            var b = null; if (a.tileSet) {
                var d = a.tileSet, f = [], g = null, h = null; jQuery(d.displayRects).each(function () { f.push(new OpenSeadragon.DisplayRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height, this.minLevel, this.maxLevel)); g = this.minLevel; h = this.maxLevel }); d = new OpenSeadragon.DziTileSource(d.width,
                    d.height, d.tileSize, 0, c._options.prefixUrl + d.prefixUrl + "/", d.format, f, g, h); if (e.isOpen()) { var i = { tileSource: d }, d = e.world.getItemCount(); e.addTiledImage(i); i = e.world.getItemCount(); if (i == d + 1) a.tiledImage = e.world.getItemAt(i - 1) } else e.open(d), a.tiledImage = e.world.getItemAt(0)
            } else a.dzi ? OpenSeadragon.createFromDZI(c._options.prefixUrl + a.dzi, function (c) { b = e.isOpen() ? e.addLayer(c) : e.open(c).canvas; jQuery(b).attr("id", a.id) }) : a.svg && (b = document.createElement("img"), jQuery(b).attr("class", "avz-svg-layer").attr("width",
                c._contentSize.width + "px").attr("height", c._contentSize.height + "px").attr("src", c._options.prefixUrl + a.svg), c._addContentElement(b, c._contentSize.width, c._contentSize.height)); b && jQuery(b).attr("id", a.id)
        }; c.isLayerVisible = function (a) { if (!a) return !1; var b = a.visible; a.scaleLayer && void 0 !== a.hiddenBelow && void 0 !== a.hiddenAbove && (b = c._getCurrentZoom(), b = b > a.hiddenBelow && b <= a.hiddenAbove); return b }
    } var m = new OpenSeadragon.Profiler; m.beginUpdate(); var l = 0.2, o = 2, r = 1 / o; AVENZA.DEBUG_DRAWING = !1; AVENZA.DEBUG_INFO_ON_DOCUMENT =
        !1; AVENZA._initializePanZoomViewer = function (a) {
            var b = {
                id: a._options.id, prefixUrl: a._options.prefixUrl, showNavigationControl: !1, showNavigator: !1, mouseNavEnabled: !(a._options.disableMousePan && a._options.disableMouseZoom), autoHideControls: !1, maxZoomPixelRatio: 1, minZoomImageRatio: a._options.hasOwnProperty("minZoomImageRatio") ? a._options.minZoomImageRatio : 0.9, visibilityRatio: a._options.hasOwnProperty("visibilityRatio") ? a._options.visibilityRatio : 0.5, animationTime: 0.5, minPixelRatio: 0.5, immediateRender: !0,
                blendTime: 0, fastAnimations: a._options.fastAnimations, useCanvas: OpenSeadragon.Browser.vendor != OpenSeadragon.BROWSERS.IE && OpenSeadragon.Browser.vendor != OpenSeadragon.BROWSERS.EDGE && OpenSeadragon.Browser.vendor != OpenSeadragon.BROWSERS.SAFARI
            }, d = new OpenSeadragon.Viewer(b); d.clearControls(); if (a._options.showZoomAdjScaleBar && 0 < a._options.pixelsPerMeter) {
                var g = null; switch (a._options.zoomAdjScaleBarPosition) {
                    case AVENZA.QUAD.TOP_LEFT: g = OpenSeadragon.ScalebarLocation.TOP_LEFT; break; case AVENZA.QUAD.TOP_RIGHT: g =
                        OpenSeadragon.ScalebarLocation.TOP_RIGHT; break; case AVENZA.QUAD.BOTTOM_LEFT: g = OpenSeadragon.ScalebarLocation.BOTTOM_LEFT; break; case AVENZA.QUAD.BOTTOM_RIGHT: g = OpenSeadragon.ScalebarLocation.BOTTOM_RIGHT
                }var l = null; switch (a._options.scaleBarUnit) { case AVENZA.SCALE_BAR_UNITS.IMPERIAL: l = OpenSeadragon.ScalebarSizeAndTextRenderer.IMPERIAL_LENGTH; break; case AVENZA.SCALE_BAR_UNITS.METRIC: l = OpenSeadragon.ScalebarSizeAndTextRenderer.METRIC_LENGTH }d.scalebar({
                    type: OpenSeadragon.ScalebarType.MAP, pixelsPerMeter: a._options.pixelsPerMeter,
                    minWidth: "75px", location: g, xOffset: 5, yOffset: 10, stayInsideImage: !0, color: "rgb(150, 150, 150)", fontColor: "rgb(100, 100, 100)", backgroundColor: "rgba(255, 255, 255, 0.5)", fontSize: "small", barThickness: 2, sizeAndTextRenderer: l
                })
            } d.innerTracker.clickHandler = null; if (a._options.disableMousePan) d.innerTracker.dragHandler = null; if (a._options.disableMouseZoom) d.innerTracker.scrollHandler = null; AVENZA._isTouchDevice() && new AVENZA.TouchController(d, a); i(a, d); d.addHandler("animation-start", function () {
            b.fastAnimations &&
                jQuery(d.drawer.overlays).css("visibility", "hidden"); a._isAnimating = !0
            }); d.addHandler("animation-finish", function () { b.fastAnimations && jQuery(d.drawer.overlays).css("visibility", "visible"); f(a, d); a._isAnimating = !1 }); d.addHandler("update-viewport", function () { m.endUpdate(); m.beginUpdate() }); if (AVENZA.DEBUG_FPS) OpenSeadragon.DEBUG_FPS = !0, h(a, d); if (AVENZA.DEBUG_DRAWING) OpenSeadragon.DEBUG_DRAWING = !0; AVENZA.DEBUG_INFO && n(a, d); c(a, d); if (a._options.enableZoomSelection) a.zoomSelectionHandler = new AVENZA._SelectionHandler({
                onSelection: function (b) { a.handleZoomSelection(b) },
                viewer: d, avenzaViewer: a, selectionClass: "avz-zoomMarqueeRect", selectionCursor: "crosshair"
            }); $(document).on("keydown", function (b) {
                var c = document.activeElement; if ("body" == c.localName || "button" == c.localName) {
                    c = !1; if (b.ctrlKey && b.shiftKey && "Control" != b.key && "Shift" != b.key) if ("z" == b.key || "Z" == b.key || 90 == b.keyCode) a.zoomSelectionElement.toggleSel(), e(a, d), c = !0; else if ("H" == b.key || "h" == b.key || 72 == b.keyCode) a.panHome(), c = !0; else if ("+" == b.key || 187 == b.keyCode) a.zoomIn(), c = !0; else if ("_" == b.key || 189 == b.keyCode) a.zoomOut(),
                        c = !0; return c ? (b.preventDefault && b.preventDefault(), b.stopPropagation && b.stopPropagation(), !1) : !0
                }
            }); a._element = d.element; jQuery(a._element).css("position", "relative"); if (g = jQuery("#" + a._options.id).css("max-width")) jQuery(d.canvas).css("max-width", g), jQuery(d.container).css("max-width", g); l = jQuery("#" + a._options.id).css("max-height"); g && (jQuery(d.canvas).css("max-height", l), jQuery(d.container).css("max-height", l))
        }; AVENZA._addInitializer(function () {
            var a = OpenSeadragon.isFunction(document.createElement("canvas").getContext),
            b = !1; if (a) for (var c = ["transform", "WebkitTransform", "msTransform", "MozTransform"], d = document.documentElement || {}, e = c.shift(); e;) { if ("undefined" != typeof d.style[e]) { b = !0; break } e = c.shift() } (!a || !b) && AVENZA._missingHtml5Feature()
        })
})();