//util.service.js
angular
    .module('rsp.core')
    .factory("utilService", utilService);


function utilService() {
    var _obj = null,
        utilService = {
            getObj: getObj,
            setObj: setObj,
            filter: filter,
            filterArray: filterArray,
            filterByEquals: filterByEquals,
            filterByContains: filterByContains,
            filterByArray: filterByArray
        };

    return utilService;

    ////////////  
    function getObj() {
        return _obj;
    }

    function setObj(obj) {
        _obj = obj;
    }

    function filterArray(data, fields, search, sort, func) {
        var res = data;

        if (search && data.length > 0) {
            if (angular.isString(search)) search = search.toLowerCase();
            res = _.filter(data, function (item) {
                return filter(item, fields, search, func);
            });
        }

        if (sort && res.length > 0) {
            var _sort = sort.split(' ');
            var _dir = (_sort.length === 2 && _sort[1].toLowerCase() === 'desc') ? 'desc' : 'asc';

            res = _.orderBy(res, [_sort[0]], [_dir]);
        }

        return res;
    }

    function filter(item, fields, search, func) {
        var res = null;

        if (search && item && fields) {
            for (var i = 0; i < fields.length; i++) {
                if (res === null && item[fields[i]])
                    res = func(item[fields[i]], search);
                else {
                    if (!res && item[fields[i]]) {
                        res = func(item[fields[i]], search);
                    }
                }
            }
        }

        return (res === null) ? true : res;
    }

    function filterItem(item, search) {
        if (_.isArray(item)) {
            return _.some(item, function (_item) {
                return (_item.toLowerCase().indexOf(search) >= 0);
            });
        }
        else
            return (item.toLowerCase().indexOf(search) >= 0);
    }

    function filterByEquals(item, search) {
        if (angular.isString(item))
            return (item.toLowerCase() === search);
        else
            return (item === search);
    }

    function filterByContains(item, search) {
        return (item.toLowerCase().indexOf(search) >= 0);
    }

    function filterByArray(item, searchArr) {
        return _.some(searchArr, function(search) {
            return filterByEquals(item, search);
        });
    }
}