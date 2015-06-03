/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 */
"use strict";

var QuestionnaireJS = (function() {
    var answers = [];
    var response = {};

    function Questionnaire(definition) {
        var questionSets = [];

        for (var i = 0; i < definition.questionSetDefinitions.length; i++) {
            questionSets.push(new QuestionSet(definition.questionSetDefinitions[i]));
        }

        this.questionnaire = function() {
            var questionSetsDiv = document.createElement("div");
            var titleHeading = document.createElement("h1");
            titleHeading.innerHTML = definition.title;
            questionSetsDiv.appendChild(titleHeading);

            for (var j = 0; j < questionSets.length; j++) {
                questionSetsDiv.appendChild(questionSets[j].questions);
            }

            var submitButton = document.createElement("input");
            submitButton.setAttribute("type", "button");
            submitButton.setAttribute("value", "Submit questionnaire");
            submitButton.onclick = save;

            questionSetsDiv.appendChild(submitButton);

            return questionSetsDiv;
        };

        function save() {
            var questions = document.getElementsByClassName("question");
            for (var i = 0; i < questions.length; i++){
                var div = questions[i];
                var id = div.getAttribute("id");
                var p = div.firstChild;
                var question = p.firstChild.data;
                var input = div.lastChild;
                var answer = input.value;
                answers.push(new Answer(id, question, answer));
                response.questionnaireId = definition.id;
                response.questionnaireTitle = definition.title;
                response.questionnaireDescription = definition.description;
                response.responseId = "QJS_" + definition.id + "_" + new Date().getTime();
                response.answers = answers;
            }
        }
    }

    function QuestionSet(definition) {
        var localQuestionsArray = [];
        for (var i = 0; i < definition.questionDefinitions.length; i++) {
            localQuestionsArray.push(new Question(definition.questionDefinitions[i]));
        }

        this.questions = (function() {
            var legend = document.createElement("legend");
            legend.setAttribute("class", "legend");
            legend.innerHTML = definition.label;

            var fieldset = document.createElement("fieldset");
            fieldset.setAttribute("class", "fieldset");
            fieldset.appendChild(legend);

            for (var i = 0; i < localQuestionsArray.length; i++){
                var questionDiv = localQuestionsArray[i].question;
                fieldset.appendChild(questionDiv);
            }

            return fieldset;
        })()
    }

    function Question(definition) {
        this.question = (function() {
            var textInput = document.createElement("input");
            textInput.setAttribute("type", definition.inputType);

            var questionText = document.createElement("p");
            questionText.innerHTML = definition.text;

            var questionDiv = document.createElement("div");
            questionDiv.setAttribute("id", definition.id);
            questionDiv.setAttribute("class", "question");
            questionDiv.appendChild(questionText);
            questionDiv.appendChild(textInput);

            if(definition.questionSetDefinitions != null) {
                for (var i = 0; i < definition.questionSetDefinitions.length; i++) {
                    var subQuestionSet = new QuestionSet(definition.questionSetDefinitions[i]);
                    questionDiv.appendChild(subQuestionSet.questions);
                }
            }

            return questionDiv;
        })();
    }

    function Answer(id, question, answer) {
        return {
            id: id,
            question: question,
            answer: answer
        }
    }

    return {
        builder: function(jsonDefinition) {
            try {
                var definition = JSON.parse(jsonDefinition);
                return new Questionnaire(definition);
            }
            catch (error) {
                throw new Error("QuestionnaireJS: JSON questionnaire definition input error");
            }
        },
        response: function () {
            return JSON.stringify(response);
        }
    }

})();


