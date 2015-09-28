var directives = angular.module('directives', []);

directives.directive('tabHomeSubHeader', function ($state, $location) {
  return function (scope, elem, attr) {
    //初始化 tab
    if ( attr['state'] == $state.current.name ) {
      $(elem[0]).addClass('active');
    }

    $('#home-subheader').click(function (e) {
      //console.log($location.path());
      console.log($(e.target).attr('data-state'));
      if ( attr['state'] == $(e.target).attr('data-state') ) {
        $(elem[0]).addClass('active');
      } else {
        $(elem[0]).removeClass('active');
      }
    });
  }
});
directives.directive('tabOrderSubHeader', function ($state, $location) {
  return function (scope, elem, attr) {
    //初始化 tab
    if ( attr['state'] == $state.current.name ) {
      $(elem[0]).addClass('active');
    }

    $('#order-subheader').click(function (e) {
      console.log($(e.target).attr('data-state'));
      if ( attr['state'] == $(e.target).attr('data-state') ) {
        $(elem[0]).addClass('active');
      } else {
        $(elem[0]).removeClass('active');
      }
    });
  }
});

directives.directive('dropDown', [ function() {

  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
      function adjustSize() {
        var oMenu = $(elem[0]).next('.drop-content'),
            elemWidth = $(elem[0]).width(),
            posLeft = elemWidth > 80 ? $(elem[0]).offset().left + elemWidth/2-40 : $(elem[0]).offset().left;
        console.log(elemWidth);
        oMenu.css({
          'top': $(elem[0]).height(),
          'left': posLeft
        });
      }
      adjustSize();

    }
  }
}]);

directives.directive( 'amendNumber', [function () {
  return {
    restrict: 'A',
    link: function( scope, elem, attr ) {
      $(elem[0]).on( 'blur', function () {
        var val = $(elem[0]).val(),
            minVal = attr['minnum'],
            sVal = new String(val/100);

        if ( val.length < 3 || val < minVal ) {
          $(elem[0]).val( minVal );
        } else if ( val.length >= 3 && val > minVal ) {
          val = sVal.split('.')[0] * 100;
          $(elem[0]).val( val );
        }
      })
    }
  }
}]);
