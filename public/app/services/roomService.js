app.service("RoomService", function($http, $q, lodash) {

    function getAllRoomsByLanguageAndTopic(langCode, topic) {
        var deferred = $q.defer();
        $http.get('/app/data/rooms.json').then(function(response) {
            var topicRooms = filterRoomsByTopic(response.data, topic);
            var rooms = applyLangCode(topicRooms, langCode);
            deferred.resolve(rooms);
        });

        return deferred.promise;
    }

    function filterRoomsByTopic(rooms, topic) {
        return lodash.find(rooms, { "topic": topic }).rooms;
    }

    function applyLangCode(rooms, langCode) {
        var convertedRooms = [];
        lodash.forEach(rooms, function(value) {
            convertedRooms.push({
                room: langCode + '-' + value.room,
                name: value.name
            });
        });
        return convertedRooms;
    }

    return { getAllRoomsByLanguageAndTopic: getAllRoomsByLanguageAndTopic };

});