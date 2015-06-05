/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 */

"use strict";

var QuestionnaireJS = (function() {

    var questionnaireDefinition;

// --- CONSTRUCTOR FUNCTIONS ---

    function Questionnaire(definition) {
        questionnaireDefinition = definition;
        var questionSets = [];

        for (var i = 0; i < definition.questionSetDefinitions.length; i++) {
            questionSets.push(new QuestionSet(definition.questionSetDefinitions[i]));
        }

        this.questionnaire = function() {
            var questionnaireDiv = document.createElement("div");
            questionnaireDiv.setAttribute("class", "questionnaireForm");
            var titleHeading = document.createElement("h1");
            titleHeading.innerHTML = definition.title;
            questionnaireDiv.appendChild(titleHeading);

            for (var j = 0; j < questionSets.length; j++) {
                questionnaireDiv.appendChild(questionSets[j].questions);
            }

            return questionnaireDiv;
        };
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

            var input = createInput(definition);


            var questionText = document.createElement("p");
            questionText.innerHTML = definition.text;
            questionText.setAttribute("class", "questionText");

            var questionDiv = document.createElement("div");
            questionDiv.setAttribute("id", definition.id);
            questionDiv.setAttribute("class", "question");
            questionDiv.appendChild(questionText);
            questionDiv.appendChild(input);

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

    function QuestionnaireJsError(message) {
        this.name = 'QuestionnaireJSError';
        this.message = message || 'QuestionnaireJS error';
    }
    QuestionnaireJsError.prototype = Object.create(Error.prototype);
    QuestionnaireJsError.prototype.constructor = QuestionnaireJsError;

// --- FUNCTIONS ---

    function createInput(questionDefinition) {
        switch (questionDefinition.inputType) {
            case "text":
                var textInput = document.createElement("INPUT");
                textInput.setAttribute("type", questionDefinition.inputType);
                textInput.setAttribute("class", "textInput");
                return textInput;
            case "textarea":
                var textarea = document.createElement("TEXTAREA");
                textarea.setAttribute("class", "textarea");
                return textarea;
            case "radio":
                var radioUl = document.createElement("ul");
                radioUl.setAttribute("class", "radioUl");

                for(var i = 0; i < questionDefinition.values.length; i++) {
                    var radioLi = document.createElement("li");
                    radioLi.setAttribute("class", "radioLi");

                    var radio = document.createElement("INPUT");
                    radio.setAttribute("type", "radio");
                    radio.setAttribute("name", questionDefinition.name);
                    radio.setAttribute("value", questionDefinition.values[i]);
                    radioLi.appendChild(radio);

                    var radioText = document.createElement("span");
                    radioText.innerHTML = questionDefinition.texts[i];
                    radioText.setAttribute("class", "radioText");
                    radioLi.appendChild(radioText);

                    radioUl.appendChild(radioLi);
                }

                return radioUl;
            case "checkbox":
                var checkboxUl = document.createElement("ul");
                checkboxUl.setAttribute("class", "checkboxUl");

                for(var i = 0; i < questionDefinition.values.length; i++) {
                    var checkboxLi = document.createElement("li");
                    checkboxLi.setAttribute("class", "checkboxLi");

                    var checkbox = document.createElement("INPUT");
                    checkbox.setAttribute("type", "checkbox");
                    checkbox.setAttribute("name", questionDefinition.name);
                    checkbox.setAttribute("value", questionDefinition.values[i]);
                    checkboxLi.appendChild(checkbox);

                    var checkboxText = document.createElement("span");
                    checkboxText.innerHTML = questionDefinition.texts[i];
                    checkboxText.setAttribute("class", "checkboxText");
                    checkboxLi.appendChild(checkboxText);

                    checkboxUl.appendChild(checkboxLi);
                }

                return checkboxUl;
            default:
                throw new QuestionnaireJsError("Input type not supported: " + questionDefinition.inputType);
        }


    }

    function getResponse() {
        var response = {};
        response.questionnaireDefinition = questionnaireDefinition.id;
        response.questionnaireTitle = questionnaireDefinition.title;
        response.questionnaireDescription = questionnaireDefinition.description;
        response.responseId = "QJS_" + questionnaireDefinition.id + "_" + new Date().getTime();
        response.answers = getAnswers();
        return response;
    }

    function getAnswers() {
        var questions = document.getElementsByClassName("question");
        var answers = [];
        for (var i = 0; i < questions.length; i++){
            var div = questions[i];
            var id = div.getAttribute("id");
            var questionP = div.firstChild;
            var question = questionP.firstChild.data;
            var answer = getAnswer(div);
            answers.push(new Answer(id, question, answer));
        }
        return answers
    }

    function getAnswer(div)  {
        var answer = "";
        var input = div.lastChild;
        var inputStyleClass = input.getAttribute("class");
        switch(inputStyleClass) {
            case "textInput":
                answer = input.value;
                break;
            case "textarea":
                answer = input.value;
                break;
            case "radioUl":
                var liList = input.getElementsByTagName("li");
                var answers = [];
                for (var i = 0; i < liList.length; i++) {
                    var li = liList[i];
                    var checkBox = li.firstChild;
                    if(checkBox.checked) {
                        answer = li.lastChild.innerHTML;
                        break;
                    }
                }
                break;
            case "checkboxUl":
                var liList = input.getElementsByTagName("li");
                var answers = [];
                for (var i = 0; i < liList.length; i++) {
                    var li = liList[i];
                    var checkBox = li.firstChild;
                    if(checkBox.checked) {
                        answers.push(li.lastChild.innerHTML);
                    }
                }
                answer = answers;
                break;
            default:
                throw new QuestionnaireJsError("Input type not supported: " + input.inputType);
        }
        return answer;
    }


// --- RETURN OBJECT LITERAL ---

    return {
        build: function(jsonDefinition) {
            try {
                var definition = JSON.parse(jsonDefinition);
            }
            catch (error) {
                throw new QuestionnaireJsError("JSON questionnaire definition input error");
            }

            return new Questionnaire(definition);
        },
        response: function () {
            var response = getResponse();
            return JSON.stringify(response);
        }
    }

})();