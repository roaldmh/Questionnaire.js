/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 *
 * This JavaScript library builds a the content for a questionnaire form
 * based on a definition given as a JSON string and gives gave another JSON string
 * with all the answers mapped to the questions.
 *
 * It is implemented as a IIFE that give you an object with two methods:
 *  - QuestionnaireJS.build(definition) that builds the form content for the questionnaire
 *  - QuestionnaireJS.response() that gives the response as a JSON string
 *
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
        if(definition && definition.questions) {
            for (var i = 0; i < definition.questions.length; i++) {
                localQuestionsArray.push(new Question(definition.questions[i]));
            }

            this.questions = (
                function() {
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
                }()
            )
        }
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

            if(definition.questionSet != null) {
                for (var i = 0; i < definition.questionSet.length; i++) {
                    var subQuestionSet = new QuestionSet(definition.questionSet[i]);
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

    // A few of HTML input are supported so far
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
            case "radio": // Makes a question and several possible answers as a set of radio buttons
                var radioUl = document.createElement("ul");
                radioUl.setAttribute("class", "radioUl");

                // possible answers
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
            case "checkbox": // Makes a question and several possible answers as a set of checkboxes
                var checkboxUl = document.createElement("ul");
                checkboxUl.setAttribute("class", "checkboxUl");

                // possible answers
                var choices = questionDefinition.choices;
                for(var j = 0; j < choices.values.length; j++) {
                    var choiceValue = choices.values[j];

                    var checkboxLi = document.createElement("li");
                    checkboxLi.setAttribute("class", "checkboxLi");

                    var checkbox = document.createElement("INPUT");
                    checkbox.setAttribute("type", "checkbox");
                    checkbox.setAttribute("name", choiceValue.name);
                    checkbox.onclick = toggleSubQuestionSets; // Show hide sub-fieldsets

                    checkboxLi.appendChild(checkbox);

                    var checkboxText = document.createElement("span");
                    checkboxText.innerHTML = choiceValue.text;
                    checkboxText.setAttribute("class", "checkboxText");
                    checkboxLi.appendChild(checkboxText);

                    var setOfQuestions = choiceValue.questions;
                    if(setOfQuestions != null && setOfQuestions.length > 0) {
                        for (var k = 0; k < setOfQuestions.length; k++) {
                            var questionSet = new QuestionSet(setOfQuestions[k]);
                            var questions = questionSet.questions;
                            questions.setAttribute("hidden", "true");
                            checkboxLi.appendChild(questions);
                        }
                    }

                    checkboxUl.appendChild(checkboxLi);
                }

                return checkboxUl;
            default:
                throw new QuestionnaireJsError("Input type not supported: " + questionDefinition.inputType);
        }
    }

    // Show hide sub-fieldsets
    function toggleSubQuestionSets(e) {
        var children = e.target.parentElement.children;
        if (children.length >= 3) {
            for (var i = 2; i < children.length; i++) {
                var child = children[i];
                child.hidden = !child.hidden;
            }
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

    // Includes basic validation
    function getAnswer(div)  {
        var answer = "";
        var input = div.lastChild;
        var inputStyleClass = input.getAttribute("class");
        switch(inputStyleClass) {
            case "textInput":
                answer = input.value;
                if(answer == null || answer.trim().length == 0) {
                    alert("Question '" + div.firstChild.innerHTML + "' must be filled in");
                }
                break;
            case "textarea":
                answer = input.value;
                if(answer == null || answer.trim().length == 0) {
                    alert("Question '" + div.firstChild.innerHTML + "' must be filled in");
                }
                break;
            case "radioUl":
                var liListRadio = input.getElementsByTagName("li");
                for (var i = 0; i < liListRadio.length; i++) {
                    var liRadio = liListRadio[i];
                    var radio = liRadio.firstChild;
                    if(radio.checked) {
                        answer = liRadio.lastChild.innerHTML;
                        break;
                    }
                }
                if(answer == null || answer.trim().length == 0) {
                    alert("Question '" + div.firstChild.innerHTML + "' must be filled in");
                }
                break;
            case "checkboxUl":
                var answers = [];
                var liListCheckbox = input.getElementsByTagName("li");
                for (var j = 0; j < liListCheckbox.length; j++) {
                    var liCheckbox = liListCheckbox[j];
                    var checkBox = liCheckbox.firstChild;
                    if(checkBox.checked) {
                        var children = liCheckbox.children;
                        answers.push(children[1].innerHTML);
                    }
                }
                answer = answers;

                if(answers.length == 0 ) {
                    alert("At least one option in the question '" + div.firstChild.innerHTML + "' must be selected");
                }
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