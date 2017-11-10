(function() {
    "use strict";

    angular
        .module("TendrlModule")
        .component("eventList", {

            restrict: "E",
            templateUrl: "/modules/events/event-list/event-list.html",
            bindings: {},
            controller: eventListController,
            controllerAs: "eventListCntrl"
        });

    /*@ngInject*/
    function eventListController($rootScope, $scope, $interval, $state, $timeout, $filter, config, eventStore, utils) {

        var vm = this,
            eventTimer;

        vm.isDataLoading = true;

        init();

        function startEventTimer() {
            eventTimer = $interval(function() {
                init();
            }, 1000 * config.eventsRefreshIntervalTime, 1);
        }
        
        function init() {
            eventStore.getEventList()
                .then(function(list) {
                    $interval.cancel(eventTimer);
                    vm.eventList = list;
                    vm.isDataLoading = false;
                    startEventTimer();
                });
        }


        $scope.$on("$destroy", function() {
            $interval.cancel(eventTimer);
        });

    }

})();
