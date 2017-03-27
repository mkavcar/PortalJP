angular
  .module('rsp.core')
  .factory("quickViewService", quickViewService);

quickViewService.$inject = ['$timeout', '$document'];

function quickViewService ($timeout, $document) {
    var _isOpen = false,
        _el = null,
        openedAt = null,
        isFixed = false,
        quickViewService = {
          isOpen: isOpen,
          show: show,
          hide: hide,
          init: init,
          destroy: destroy
        };
  
    return quickViewService;
    
    ////////////  
    function isOpen() {
        return _isOpen;
    }

    function init() {
        _isOpen = false;
        openedAt = null;
        isFixed = false;
        _el = $("#mySidenav");
    }

    function destroy() {
        //unbind scroll event
        $document.off('scroll', onScroll);
    }

    function show(){
        _isOpen = true;
        openedAt = now();

        //fix on open based on scroll position
        toggleViewPosition();
        
        $timeout(function() { _el.css('right','0px'); });

        //bind scroll event
        $document.on('scroll', onScroll);
    };
  
    function hide() {
        //unfix on close
        unFix();
        _el.css('right','-255px');
        
        var closedAt = now();
        $timeout(function() { 
            if (closedAt > openedAt) 
                _isOpen = false
        }, 600);

        destroy();
    };

    function now() {
        var d = new Date();
        return d.getTime();
    }

    function onScroll(e) {
        //********************** TBD GET THROTTLING TO WORK **********************
        //_.throttle(function () {
            if (_isOpen) {
                toggleViewPosition();
            }
        //}, 100);
    }

    function toggleViewPosition() {
        if((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) > 372) {
            if (!isFixed) {
                isFixed = true;
                _el.css('transition', 'none');
                _el.addClass("rsp-qv-fixed");
            }
        }
        else {
            unFix();
        }
    }

    function unFix() {
        if (isFixed) {
            isFixed = false;
            _el.css('transition', '0.5s');
            _el.removeClass("rsp-qv-fixed");
        }
    }
  };
