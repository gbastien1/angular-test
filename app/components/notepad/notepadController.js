angular.module('app')
	.controller('NotepadController', function($scope, $filter, $http) {

  	$http.get('assets/json/notes.json')
  	.success(function(data, status, headers, config) {
        $scope.notes = data;
    });

  	$scope.notesCount = 0;

  	$scope.getDatetime = function() {
	  	return $filter('date')(new Date(), 'yyyy-mm-dd');
	};

	$scope.addNoteToJson = function() {
		$("#noteTitle").val("");
		$("#noteField").val("");
		var note = {"title": $scope.noteTitle, "description": $scope.noteContent, "date" : $scope.getDatetime() };
		$scope.notes.push(note);	
	};

	$scope.showDeleteIcon = function(event) {
		var element = $(event.currentTarget);
		element.find(".delete-note-icon").removeClass("hide");
	}
	$scope.hideDeleteIcon = function(event) {
		var element = $(event.currentTarget);
		element.find(".delete-note-icon").addClass("hide");
	}
	$scope.darkenDeleteIcon = function(event) {
		var icon = $(event.currentTarget);
		icon.css("color", "grey");
	}
	$scope.lightenDeleteIcon = function(event) {
		var icon = $(event.currentTarget);
		icon.css("color", "lightgrey");
	}
	$scope.deleteCurrentNote = function(event) {
		var parent = $(event.currentTarget).parent();
		$scope.notes.splice(parent.attr("data-id"), 1);
	}
});