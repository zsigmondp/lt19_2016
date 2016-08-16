var droppables = $("#cross, #cube, #cylinder, #pentagon, #star, #triangle");
var targets = $("#cross-target, #cube-target, #cylinder-target, #pentagon-target, #star-target, #triangle-target");
var overlapThreshold = "50%";
var polys = document.querySelectorAll('polygon,polyline');
[].forEach.call(polys,convertPolyToPath);
var clicked;
var prevClicked;

function convertPolyToPath(poly){
  var svgNS = poly.ownerSVGElement.namespaceURI;
  var path = document.createElementNS(svgNS,'path');
  var points = poly.getAttribute('points').split(/\s+|,/);
  var id = poly.getAttribute('id');
  var fill = poly.getAttribute('fill');
  var stroke = poly.getAttribute('stroke');
  var style = poly.getAttribute('style');
  var x0=points.shift(), y0=points.shift();
  var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
  if (poly.tagName=='polygon') pathdata+='z';
  path.setAttribute('d',pathdata);
  path.setAttribute('id',id);
  path.setAttribute('fill',fill);
  path.setAttribute('stroke',stroke);
  path.setAttribute('style',style);
  poly.parentNode.replaceChild(path,poly);
}

function animateSVG(from, to, clb){
  var f = document.getElementById(from);
  var t = document.getElementById(to);
  var fromSnap = Snap(f);
  var path = t.getAttribute('d');
  fromSnap.stop().animate({ d: path }, 600, mina.linear, clb);
}

function fallInHole (shapeID) {
  switch (shapeID) {
    case 'triangle':
      animateSVG("triangle-top", "triangle-top-target", null);
      animateSVG("triangle-side1", "triangle-side1-target", null);
      animateSVG("triangle-side2", "triangle-side2-target", function(){loadpage(shapeID);});
      break;
    case 'cube':
      animateSVG("cube-top", "cube-top-target", null);
      animateSVG("cube-side1", "cube-side1-target", null);
      animateSVG("cube-side2", "cube-side2-target", function(){loadpage(shapeID);});
      break;
    case 'pentagon':
      animateSVG("pentagon-top", "pentagon-top-target", null);
      animateSVG("pentagon-side1", "pentagon-side1-target", null);
      animateSVG("pentagon-side2", "pentagon-side2-target", function(){loadpage(shapeID);});
      break;
    case 'cylinder':
      animateSVG("cylinder-top", "cylinder-top-target", null);
      animateSVG("cylinder-side", "cylinder-side-target", function(){loadpage(shapeID);});
      break;
    case 'star':
      animateSVG("star-top", "star-top-target", null);
      animateSVG("star-side1", "star-side1-target", null);
      animateSVG("star-side2", "star-side2-target", null);
      animateSVG("star-side3", "star-side3-target", null);
      animateSVG("star-side4", "star-side4-target", null);
      animateSVG("star-side5", "star-side5-target", function(){loadpage(shapeID);});
      break;
    case 'cross':
      animateSVG("cross-top", "cross-top-target", null);
      animateSVG("cross-side1", "cross-side1-target", null);
      animateSVG("cross-side2", "cross-side2-target", null);
      animateSVG("cross-side3", "cross-side3-target", null);
      animateSVG("cross-side4", "cross-side4-target", null);
      animateSVG("cross-side5", "cross-side5-target", null);
      animateSVG("cross-side6", "cross-side6-target", function(){loadpage(shapeID);});
      break;
    }
  }

  function backFromHole (prevClicked, clicked) {
    switch (prevClicked) {
      case 'triangle':
        animateSVG("triangle-top", "triangle-top-original", null);
        animateSVG("triangle-side1", "triangle-side1-original", null);
        animateSVG("triangle-side2", "triangle-side2-original", function() {fallInHole(clicked);});
        break;
      case 'cube':
        animateSVG("cube-top", "cube-top-original", null);
        animateSVG("cube-side1", "cube-side1-original", null);
        animateSVG("cube-side2", "cube-side2-original", function() {fallInHole(clicked);});
        break;
      case 'pentagon':
        animateSVG("pentagon-top", "pentagon-top-original", null);
        animateSVG("pentagon-side1", "pentagon-side1-original", null);
        animateSVG("pentagon-side2", "pentagon-side2-original", function() {fallInHole(clicked);});
        break;
      case 'cylinder':
        animateSVG("cylinder-top", "cylinder-top-original", null);
        animateSVG("cylinder-side", "cylinder-side-original", function() {fallInHole(clicked);});
        break;
      case 'star':
        animateSVG("star-top", "star-top-original", null);
        animateSVG("star-side1", "star-side1-original", null);
        animateSVG("star-side2", "star-side2-original", null);
        animateSVG("star-side3", "star-side3-original", null);
        animateSVG("star-side4", "star-side4-original", null);
        animateSVG("star-side5", "star-side5-original", function() {fallInHole(clicked);});
        break;
      case 'cross':
        animateSVG("cross-top", "cross-top-original", null);
        animateSVG("cross-side1", "cross-side1-original", null);
        animateSVG("cross-side2", "cross-side2-original", null);
        animateSVG("cross-side3", "cross-side3-original", null);
        animateSVG("cross-side4", "cross-side4-original", null);
        animateSVG("cross-side5", "cross-side5-original", null);
        animateSVG("cross-side6", "cross-side6-original", function() {fallInHole(clicked);});
        break;
      }
    }

function onDrop(dragged, dropped) {
  $(dropped).removeClass("highlight");

    var top = dropped.offsetTop + dropped.clientHeight - dragged.clientHeight;
    var left = dropped.offsetLeft;
    var otop = dragged.offsetTop + dragged._gsTransform.y;
    var oleft = dragged.offsetLeft+ dragged._gsTransform.x;
    TweenMax.fromTo(dragged, .3, {
      x:0,
      y:0,
      top: otop,
      left: oleft
    }, {
      top: top,
      left: left,
      onComplete: function() {

        clicked = dragged.id;
        fallInHole(dragged.id);
      }
    });
}

function loadpage(id) {
  $("#container").hide();
  $("#footer").hide();
  $("#sidebar").show();
  $("#" + id + "-page").show();
}

$(".side_links").click(function() {
  $(".page").hide();
  $("#footer").hide();
  var toLoad = $(this)[0].id;
  toLoad = toLoad.substring(0, toLoad.length - 5);
  prevClicked = clicked;
  clicked = toLoad;
  if (clicked !== prevClicked) {
    $("#" + clicked + "-page").show();
    backFromHole(prevClicked, clicked);
  } else {
    $("#" + toLoad + "-page").show();
  }
  console.log(prevClicked);
  console.log(clicked);
});

$("#header").click(function(){
  if (clicked == undefined) {
    return;
  } else {
    $("#sidebar").hide();
    $(".page").hide();
    $("#container").show();
    $("#footer").show();
    backFromHole(clicked, null);
    showMenu();
  }
});

/*$(document).ready*/
$("#ltlogo").click(function() {
  TweenMax.to($("#mask"), 0.5, {
    opacity: 0,
    onComplete: function() {
      $("#mask").hide();
    }
  });
  TweenMax.to($("#info-navigation"), 0.5, {
    opacity: 1
  });
  var headerLeft = $("#header")[0].offsetLeft;
  var headerTop = $("#header")[0].offsetTop - 4;
  TweenMax.to($("#ltlogo"), 1, {
    width: "6.503em",
    top: headerTop,
    left: headerLeft,
    onComplete: function() {
      $("#ltlogo").hide(),
       $("#header_logo").show(),
      showMenu();
    }
  });
});

function showMenu() {

  var iconPos = [-11, -2.308, -5.769, -7.692, 7.692, -2.308, -5.769, 5.385, 1.923, 5.385, 1.923, -8.077];
  var leftHalf = $(window).width()/2;
  var topHalf = $(window).height()/2;
  var base = parseFloat($("#container").css("font-size"));
  for (var i = 0; i < 12; i+=2) {
    iconPos[i] = leftHalf + iconPos[i]*base;
    iconPos[i+1] = topHalf + iconPos[i+1]*base;
  }

  $("#shapes").show();
  TweenMax.to($("#cross"), 1, {left: iconPos[0], onComplete: function() {
    $("#cross")[0].style.left = "calc(50% - 11em)";
  }});
  TweenMax.to($("#cube"), 1, {left:iconPos[2],top:iconPos[3], onComplete: function() {
    $("#cube")[0].style.left = "calc(50% -  5.769em)";
    $("#cube")[0].style.top = "calc(50% - 7.692em)";
  }});
  TweenMax.to($("#cylinder"), 1, {left:iconPos[4],top:iconPos[5], onComplete: function() {
    $("#cylinder")[0].style.left = "calc(50% +  7.692em)";
    $("#cylinder")[0].style.top = "calc(50% - 2.308em)";
  }});
  TweenMax.to($("#pentagon"), 1, {left:iconPos[6],top:iconPos[7], onComplete: function() {
    $("#pentagon")[0].style.left = "calc(50% -  5.769em)";
    $("#pentagon")[0].style.top = "calc(50% + 5.385em)";
  }});
  TweenMax.to($("#star"), 1, {left:iconPos[8],top:iconPos[9], onComplete: function() {
    $("#star")[0].style.left = "calc(50% +  1.923em)";
    $("#star")[0].style.top = "calc(50% + 5.385em)";
  }});
  TweenMax.to($("#triangle"), 1, {left:iconPos[10],top:iconPos[11], onComplete: function() {
    $("#triangle")[0].style.left = "calc(50% +  1.923em)";
    $("#triangle")[0].style.top = "calc(50% - 8.077em)";
  }});

}
$("#application").on('hide.bs.modal', function() {
	if (forceClose) {
		forceClose = false;
		return true;
	} else {
		return false;
	}
});

$("#registration").on('hide.bs.modal', function() {
	if (forceClose) {
		forceClose = false;
		return true;
	} else {
		return false;
	}
});

$("#login").click(function() {
  $("#logged-out").hide();
  $("#logged-in").show();
});

$("#logout").click(function() {
  $("#logged-out").show();
  $("#logged-in").hide();
});

$("#info-lezaratlan").click(function() {
  var lezaratlanTop = $("#info-lezaratlan")[0].offsetTop + $("#info-lezaratlan")[0].clientHeight + 10;
  $("#help-lezaratlan")[0].style.top = lezaratlanTop + "px";
  $("#help-lezaratlan").toggle();
});

$("#info-lezart").click(function() {
  var lezaratTop = $("#info-lezart")[0].offsetTop + $("#info-lezart")[0].clientHeight + 10;
  $("#help-lezart")[0].style.top = lezaratTop + "px";
  $("#help-lezart").toggle();
});

$("#info-nyomtatas").click(function() {
  var nyomtatasTop = $("#info-nyomtatas")[0].offsetTop + $("#info-nyomtatas")[0].clientHeight + 10;
  $("#help-nyomtatas")[0].style.top = nyomtatasTop + "px";
  $("#help-nyomtatas").toggle();
});

$("#to-content").click(function() {
  fallInHole("cube");
  clicked = "cube";
});

Draggable.create(droppables, {
  bounds: window,
  onDrag: function(e) {
    var i = targets.length;
    while (--i > -1) {
      if (this.hitTest(targets[i], overlapThreshold)) {
        if (targets[i].id.indexOf(this.target.id) == 0) {
          $(targets[i]).addClass("highlight");
        }
      } else {
        $(targets[i]).removeClass("highlight");
      }

    }
  },
  onDragEnd: function(e) {
    var i = targets.length;
    while (--i > -1) {
      if (this.hitTest(targets[i], overlapThreshold)) {
        if (targets[i].id.indexOf(this.target.id) == 0) {
          onDrop(this.target, targets[i]);
        }
      }
    }
  }
});
