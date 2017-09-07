//search.service.js
angular
  .module('rsp.core')
  .factory("modalService", modalService);

modalService.$inject = ["$rootScope", '$document', '$timeout', '$compile'];

function modalService ($rootScope, $document, $timeout, $compile) {
    var currentId,
        minTabIdx = 1,
        maxTabIdx = -1,
        modalService = {
          open: open,
          close: close
        };
  
    return modalService;
    
    ////////////  
    function open(id, component, params) {
        var scope,
            el,
            body;

        //store id
        currentId = id;    
        
        //create new scope
        scope = $rootScope.$new(true);
        scope.params = params;
        
        //compile modal
        el = angular.element($compile('<r-modal id="' + id + '"> ' + component + '</r-modal>')(scope));
        
        //append moda to document body
        body = angular.element($document[0].body);
        body.css('overflow', 'hidden');
        body.append(el);        

        //show modal
        $timeout(function() {
            el.toggleClass('r-is-visible');
            angular.element($document[0].getElementsByClassName('r-modal-wrapper')).css('top', ($document[0].body.scrollTop + 150) + 'px');

            //get min/max tabindexes
            var tabElements = $('#' + id + ' [tabindex]').not(':disabled');
            tabElements.attr('tabindex', function (a, b) {
                minTabIdx = Math.min(minTabIdx, +b);
                maxTabIdx = Math.max(maxTabIdx, +b);
            });

            //set focus on first tabbable element
            $timeout(function() {
                tabElements.first().focus();
            }, 250);

            //bind TAB event handler
            el.on('keydown', tabOverride);

            //bind ESC event handler
            body.on('keyup', closeOnEsc);
        });        
    }
  
    function close(id) {
        var el = $('#' + id),
            body = angular.element($document[0].body);

        //unbind TAB event handler
        el.off('keydown', tabOverride);

        //unbind ESC event handler
        body.off('keyup', closeOnEsc);

        //hide modal 
        if (el) {
            el.toggleClass('r-is-visible');
            body.css('overflow', 'visible');

            //remove modal from document body
            $timeout(function() {
                el.remove();
            }, 1000);
        }
    }

    function closeOnEsc(e) {
        //close modal on ESC key
        if (e.keyCode === 27) { 
            close(currentId); 
        }
    }

    function tabOverride(e) {
        //override any tab key that tries to leave the modal
        if (e.keyCode === 9) {
            if (e.shiftKey) {
                if (e.target.tabIndex <= minTabIdx) {
                    e.preventDefault();
                    $('#' + currentId + ' [tabindex="' + maxTabIdx + '"]').focus();
                }
            }
            else {
                if (e.target.tabIndex >= maxTabIdx) {
                    e.preventDefault();
                    $('#' + currentId + ' [tabindex="' + minTabIdx + '"]').focus();
                }
            }            
        }
    }
  };
