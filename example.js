/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 *
 * This is an example on a client for creating a questionnaire form using QuestionnaireJS.
 * Notice that the questionnaire definition is made here and the question sets that are going
 * to be used are added here. The question sets are defined in 'questionset.js' and questions
 * are mapped to the sets in 'mapping.js.
 *
 */

"use strict";

window.onload = init;

function init() {
    var form = document.getElementsByClassName("questionnaireForm").item(0);
    form.appendChild(createQuestionnaire());

    // The client implements the saving of the questionnaire
    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("value", "Submit questionnaire");
    submitButton.setAttribute("class", "submitButton");
    submitButton.onclick = save;

    form.appendChild(submitButton);
}

// Define the quesationnaire.
// Make a JSON string out of the questionnaire definition
// and build the questionnaire
function createQuestionnaire() {
    var questionnaireDefinition = {
        id: "higherEducationQuestionnaire",
        title: "Higher education",
        description: "This is an example questionnaire made by using QuestionnaireJS. " +
        "You can play around with the configuration and see how that changes the questionnaire. " +
        "This questionnaire uses several question sets and nested question set.",

        questionSetDefinitions: [
            questionSets.personalInformationSet,
            questionSets.contactInformationSet,
            questionSets.studyProgramSet
        ]
    };


    var jsonDefinition = JSON.stringify(questionnaireDefinition);
    return QuestionnaireJS.build(jsonDefinition).questionnaire();
}

// QuestionnaireJS produces a JSON string as the questionnaire response
// but the client decides how to handle the client.
function save() {
    console.log(QuestionnaireJS.response());
}
