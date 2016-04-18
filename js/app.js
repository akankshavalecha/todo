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

			app.controller('todoController', function($scope) {
				window.x = $scope;
				$scope.task = '';
				$scope.inputcolor = 'bgwhite';
				$scope.doneList = [];
				var colorsClasses = ['bgblue','bggreen', 'bgred', 'bgteal', 
									'bgorange', 'bgyellow', 'bggray', 'bgwhite']; 
				$scope.todoList = [
				{text:'learn angular', done:true, card: 'bgwhite', 'drag': true},
				{text:'build an angular app', done:false, card: 'bgwhite', 'drag': true},
				{text:'work', done:true, card: 'bgorange', 'drag': true},
				{text:'gym', done:false, card: 'bggreen', 'drag': true},
				];

				$scope.addTodo = function() {
					if($scope.task.length){
						$scope.inputcolor = colorsClasses[Math.floor((Math.random() * colorsClasses.length))]
						$scope.todoList.push({text:$scope.task, done:false, card: $scope.inputcolor, 'drag': true});
						$scope.task = '';

						$scope.inputcolor = 'bgwhite';
					}
				};
				$scope.removeTodo = function(list, todo){
					var index = list.indexOf(todo);
					if(index > -1){
						list.splice(index,1);
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

				$scope.archive = function() {
					var oldTodos = $scope.todos;
					$scope.todos = [];
					angular.forEach(oldTodos, function(todo) {
						if (!todo.done) $scope.todos.push(todo);
					});
				};

				$scope.notify=function(event,ui){
					console.log('kkk')
        // toaster.pop('success', "BlogBeats", ui.draggable[0].innerHTML+" is dropped into "+event.target.id);
        
      };


				

			});