/*global BiggerSmaller, Backbone, JST*/

BiggerSmaller.Views.QuestionView = Backbone.View.extend({

    template: JST['app/scripts/templates/question.ejs'],
    
    events: {
      "click .animal": "determineResult"
    },

    index: 0,

    initialize: function () {
      this.index = this.options.index;
      var self = this;

      pubSub.on("question:correctAnswer", function(ev) {
        if(ev.questionIndex != self.index){
          self.render();
        }
      } );
      this.render();
      
    },

    render: function(){
      var animals = this.collection.getTwoAnimals();
      this.$el.html(this.template({ animals: animals }));
    },

    clickedRightAnswer: function(div){
      var $clickedDiv = $(div);
      var chosenAnswerSize = $clickedDiv.data().size;
      var otherSize = this.$el.find('.animal').not($clickedDiv).data().size;
      if(chosenAnswerSize > otherSize){
        return true;
      }
      return false;
    },

    determineResult: function(ev){
      if(this.clickedRightAnswer(ev.currentTarget)){
        pubSub.trigger("pageManager:nextQuestion");
        pubSub.trigger("question:correctAnswer", { questionIndex: this.index });
      } else {
        pubSub.trigger("gameOver:wrongAnswer");
        BiggerSmaller.app.navigate('gameover', {trigger: true});
      }
    },





});
