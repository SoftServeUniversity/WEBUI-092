define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'jqueryui',
	'text!templates/task/taskTemplate.html',
	'views/task/taskCommentsView',
	'collections/task/CommentsCollection',
	'models/task/commentModel'
	], function($, _, Backbone, bootstrap, jqueryui, taskTemplate, taskCommentsView, CommentsCollection, commentModel){
		var TaskView = Backbone.View.extend({
			el: $("#content"),
			collection: new CommentsCollection(),
			events: {
				'click #changebtn': 'showModal',
				'submit #input-log': 'submit'
			},
			showModal: function(){
				$('#change').modal('show');
			},
			closeModal: function(){
				$('#change').modal('hide');
			},
			render: function(){
				var compiledComments = new taskCommentsView({"collection": this.collection});
				var data = {
					comments: compiledComments.$el.html(),
					task: this.model,
					_: _       	
				}
				var compiledTemplate = _.template(taskTemplate, data);
				$("#content").html(compiledTemplate);
				this.slider();
			},
			submit: function(e){
				e.preventDefault();
				var newCommentContent = $(e.currentTarget).find('textarea').val();
				var newTaskProcess = $(e.currentTarget).find('#number-range').val();
			   
				this.model.url = "../";
				this.model.save({"process": newTaskProcess}, {success: function(){console.log('a;a;a;a;aa;a;a;a;a;a;')}});
				// console.log(this.model.url);
			  

				this.model.set("process", newTaskProcess);
				//console.log(newTaskProcess + newCommentContent)
				this.addCommentToCollection("Obi Van Kenobi", newCommentContent);
				this.closeModal();
				this.render();
			},
			addCommentToCollection: function(author, content){
				var currentDate = new Date();
				var commentDate = currentDate.getDate() + " / " + currentDate.getMonth() + " / " +  currentDate.getFullYear();
				var newCommentModel = new commentModel({
					"author": author,
					"date": commentDate,
					"content": content
				});
				console.log(this.collection);
				this.collection.unshift(newCommentModel);
			},
			slider: function(){
				$("#number-range").spinner({min: 0, max: 100});
				$("#number-range").spinner("value", this.model.get('process'));
				$("#number-range").spinner({
					spin: function(){
						$("#line-range").slider({value: $("#number-range").spinner("value")})
					},
					change: function(){
						$("#line-range").slider({value: $("#number-range").spinner("value")})
					}
				})
				$("#line-range").slider({ min: 0, max: 100, range: 100, value: this.model.get('process'),
					slide: function(){
						$("#number-range").spinner("value", $("#line-range").slider("value"));
					},
					change: function(){
						$("#number-range").spinner("value", $("#line-range").slider("value"));
					}
				});
			},
			initialize: function(){
				this.collection.fetch({async:false});
			}
			});

			return TaskView;

			});