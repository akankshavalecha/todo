app = angular.module('todo', ['ngDragDrop','toaster']);

			app.directive('myEnter', function () {
			    return function (scope, element, attrs) {
			        element.bind("keydown keypress", function (event) {
			            if(event.which === 13) {
			                scope.$apply(function (){
			                    scope.$eval(attrs.myEnter);
			                });

			                event.preventDefault();
			            }
			        });
			    };
			});

			app.controller('todoController',['$rootScope', '$scope', 'toaster', function($rootScope,$scope, toaster) { 
				window.x = $scope;
				$scope.task = '';
				$scope.inputcolor = '';
				$scope.editTodo = false;
				$scope.doneListItem = {};
				$scope.doneList = [];
				var colorsClasses = ['bgblue','bggreen', 'bgred', 'bgteal', 
									'bgorange', 'bgyellow', 'bggray', 'bgwhite']; 

				// getting todolist from localstorage
				var todoList = [
				{text:'learn angular', done:true, card: 'bgwhite', 'drag': true},
				{text:'build an angular app', done:false, card: 'bgwhite', 'drag': true},
				{text:'work', done:true, card: 'bgorange', 'drag': true},
				{text:'gym', done:false, card: 'bggreen', 'drag': true}
				];
				$scope.saved = angular.fromJson(localStorage.getItem('todoList'));
				$scope.todoList = (localStorage.getItem('todoList'))!==null ? $scope.saved : todoList;
				localStorage.setItem('todoList', angular.toJson($scope.todoList));
				// getting done list from local storage
				var doneList = [];
				$scope.savedDone = angular.fromJson(localStorage.getItem('doneList'));
				$scope.doneList = (localStorage.getItem('doneList'))!==null ? $scope.savedDone : doneList;
				localStorage.setItem('doneList', angular.toJson($scope.doneList));

				$scope.addTodo = function() {
					if($scope.task.length){
						$scope.inputcolor = ($scope.inputcolor.length) ? $scope.inputcolor : colorsClasses[Math.floor((Math.random() * colorsClasses.length))]
						$scope.todoList.push({text:$scope.task, done:false, card: $scope.inputcolor, 'drag': true});
						$scope.task = '';
						$scope.inputcolor = '';
						localStorage.setItem('todoList', angular.toJson($scope.todoList));
					}
				};
				$scope.removeTodo = function(list, todo){
					var index = list.indexOf(todo);
					if(index > -1){
						list.splice(index,1);
					}
					if(list === 'todoList'){
						localStorage.setItem('todoList', angular.toJson($scope.todoList));
					}else if(list === 'doneList'){
						localStorage.setItem('doneList', angular.toJson($scope.doneList));
					}
					return list;
				}

				$scope.remaining = function() {
					var count = 0;
					angular.forEach($scope.todoList, function(todo) {
						count += todo.done ? 0 : 1;
					});
					return count;
				};

				$scope.updateTodoList = function(){
					var cleantodoList = [];
					$.each($scope.todoList, function(ind, ele){
					  if(!(jQuery.isEmptyObject(ele))){
					    cleantodoList.push(ele);
					  }
					});
					localStorage.setItem('todoList', angular.toJson($scope.todoList));
					return;
				}
				

				$scope.notify=function(event,ui){
					$scope.doneList.push($scope.doneListItem);
					var cleantodoList = [];
					$.each($scope.todoList, function(ind, ele){
					  if(!(jQuery.isEmptyObject(ele))){
					    cleantodoList.push(ele);
					  }
					});
					$scope.todoList = cleantodoList;
					var cleantodoList = [];
					$.each($scope.doneList, function(ind, ele){
					  if(!(jQuery.isEmptyObject(ele))){
					    cleantodoList.push(ele);
					  }
					});
					$scope.doneList = cleantodoList;

					// console.log(ui.draggable[0].index)
					localStorage.setItem('todoList', angular.toJson($scope.todoList));
					localStorage.setItem('doneList', angular.toJson($scope.doneList));
					if(event.target.id === 'TodoList'){
						var type = 'error';
					}else if(event.target.id === 'DoneList'){
						var type = 'success';
					}else{var type = 'warning'; }
			        toaster.pop(type, "To-Do", "A Task is dropped into "+ event.target.id);
        
      			};


				

			}]);