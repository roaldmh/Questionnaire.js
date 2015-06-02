/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 */
"use strict";

var QuestionnaireJS = (function() {

    function Questionnaire(definition) {
        this.id = definition.id;
        this.title = definition.title;
        this.description = definition.description;
        this.fieldsetDefinitions = definition.fieldsetDefinitions;
        var questionSets = [];

        console.log(definition);
        console.log(definition.fieldsetDefinitions);

        for (var i = 0; i < definition.fieldsetDefinitions.length; i++) {
            questionSets.push(new QuestionSet(this.fieldsetDefinitions[i]));
        }

        this.print = function() {
            var fieldsetsDiv = document.createElement("div");
            var titleHeading = document.createElement("h1");
            titleHeading.innerHTML = definition.title;
            fieldsetsDiv.appendChild(titleHeading);

            for (var j = 0; j < questionSets.length; j++) {
                fieldsetsDiv.appendChild(questionSets[j].questions);
            }

            return fieldsetsDiv;
        }
    }

    function QuestionSet(definition) {
        var questionsArray = [];

        for (var i = 0; i < definition.questionDefinitions.length; i++) {
            questionsArray.push(new Question(definition.questionDefinitions[i]));
        }

        this.questions = (function() {
            var fieldset = document.createElement("fieldset");
            var legend = document.createElement("legend");
            legend.innerHTML = definition.label;
            fieldset.appendChild(legend);

            for (var i = 0; i < questionsArray.length; i++){
                fieldset.appendChild(questionsArray[i].question);
            }

            return fieldset;
        })()
    }

    function Question(definition) {
        this.question = (function() {
            var questionDiv = document.createElement("div");
            var questionText = document.createElement("p");
            var textInput = document.createElement("input");

            textInput.setAttribute("type", definition.inputType);
            questionText.innerHTML = definition.text;

            questionDiv.appendChild(questionText);
            questionDiv.appendChild(textInput);

            if(definition.subFieldsets != null) {
                for (var i = 0; i < definition.subFieldsets.length; i++) {
                    var subQuestionnaireConfig = definition.subFieldsets[i];

                    var subQuestionSet = new QuestionSet(definition.subFieldsets[i]);
                    questionDiv.appendChild(subQuestionSet.questions);
                }
            }

            return questionDiv;
        })();
    }

    return {
        newQuestionnaire: function(jsonDefinition) {
            var definition = JSON.parse(jsonDefinition);
            return new Questionnaire(definition);
        }
    };

})();


