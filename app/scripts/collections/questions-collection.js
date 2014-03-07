/*global BiggerSmaller, Backbone*/

BiggerSmaller.Collections.QuestionsCollection = Backbone.Collection.extend({

    model: BiggerSmaller.Models.QuestionModel,

    getTwoAnimals: function(){
      var rndmArray = _.shuffle(this.models);
      return [rndmArray[0].toJSON(), rndmArray[1].toJSON()];
    }
});
