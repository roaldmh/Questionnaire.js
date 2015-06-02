/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 */

var QuestionnaireJS = (function() {
    function Questionnaire(id, title, questions) {
        this.id = id;
        this.title = title;
        this.questions = questions;

        this.fieldset = function() {
            var fieldset = document.createElement("fieldset");
            var legend = document.createElement("legend");
            legend.innerHTML = title;
            fieldset.appendChild(legend);

            for (var i = 0; i < this.questions.length; i++){
                fieldset.appendChild(questions[i].getQuestion());
            }

            return fieldset;
        }
    }

    function Question(config) {
        this.id = config[0];
        this.valueType = config[1];
        this.numChar = config[2];
        this.questionText = config[3];
        this.inputType = config[4];
        this.subQuestionnaires = config[5];

        this.getQuestion = function() {
            var questionDiv = document.createElement("div");
            var questionText = document.createElement("p");
            var textInput = document.createElement("input");
            textInput.setAttribute("type", this.inputType);
            questionText.innerHTML = this.questionText;
            questionDiv.appendChild(questionText);
            questionDiv.appendChild(textInput);
            return questionDiv;
        }
    }

    return {
        newQuestionnaire: function (id, title, configs) {

            var questions = (function(configs) {
                var newQuestions = [];
                for (var i = 0; i < configs.length; i++) {
                    newQuestions.push(new Question(configs[i]));
                }
                return newQuestions;
            })(configs);

            return new Questionnaire(id, title, questions);
        }
    };

})();


