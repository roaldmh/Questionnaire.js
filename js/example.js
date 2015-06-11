/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 */

"use strict";

window.onload = init;


var questions = {};

function init() {
    var form = document.getElementsByClassName("questionnaireForm").item(0);
    form.appendChild(createQuestionnaire());

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("value", "Submit questionnaire");
    submitButton.setAttribute("class", "submitButton");
    submitButton.onclick = save;

    form.appendChild(submitButton);
}

function createQuestionnaire() {

    var id = "exampleQuestionnaire";
    var title = "Example";

    var questionnaireDefinition = {
        id: "ExampleQuestionnaire01",
        title: "Higher education",
        description: "This is an example questionnaire made by using QuestionnaireJS. " +
        "You can play around with the configuration and see how that changes the questionnaire. " +
        "This questionnaire uses several questionSets and nested questionSets.",

        questionSetDefinitions: [
            questionSets.personalInformationSet,
            questionSets.contactInformationSet,
            questionSets.biologyQuestionSet
        ]
    };






    var jsonDefinition = JSON.stringify(questionnaireDefinition);
    //console.log(jsonDefinition);
    return QuestionnaireJS.build(jsonDefinition).questionnaire();
}

function save() {
    var utP = document.getElementById("ut");
    utP.innerHTML = QuestionnaireJS.response();
    console.log(QuestionnaireJS.response());
}
