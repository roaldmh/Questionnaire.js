/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 */

"use strict";

window.onload = init;

function init() {
    var form = document.getElementsByClassName("questionnaireForm").item(0);
    form.appendChild(createQuestionnaire());
}

function createQuestionnaire() {

    var id = "exampleQuestionnaire";
    var title = "Example";

    var subSubQuestionSetDefinitions = [
        {
            id:"fieldset05",
            label: "Personal information",
            questionDefinitions:
                [
                    {id:"fieldset05question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", questionSetDefinitions: null},
                    {id:"fieldset05question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", questionSetDefinitions: null},
                    {id:"fieldset05question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "text", questionSetDefinitions: null}
                ]
        },
    ];

    var subQuestionSetDefinitions=
        [
            {
                id:"fieldset03",
                label: "Personal information",
                questionDefinitions:
                    [
                        {id:"fieldset03question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", questionSetDefinitions: subSubQuestionSetDefinitions},
                        {id:"fieldset03question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", questionSetDefinitions: null},
                        {id:"fieldset03question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "text", questionSetDefinitions: null}
                    ]
            },
            {
                id:"fieldset04",
                label: "Contact information",
                questionDefinitions:  [
                    {id:"fieldset04question01", valueType: "characters", numChar: 2000, text: "Adresse:", inputType: "text", questionSetDefinitions: null},
                    {id:"fieldset04question02", valueType: "characters", numChar: 2000, text: "Zip code:", inputType: "text", questionSetDefinitions: null},
                    {id:"fieldset04question03", valueType: "characters", numChar: 2000, text: "City:", inputType: "text", questionSetDefinitions: null}
                ]
            }
        ];

    var questionnaireDefinition = {
        id: "ExampleQuestionnaire01",
        title: "Example 1",
        description: "This is an example questionnaire made by using QuestionnaireJS. " +
        "You can play around with the configuration and see how that changes the questionnaire. " +
        "This questionnaire uses several fieldsets and nested fieldsets.",

        questionSetDefinitions:
            [
                {
                    id:"fieldset01",
                    label: "Personal information",
                    questionDefinitions:
                        [
                            {id:"fieldset01question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", questionSetDefinitions: null},
                            {id:"fieldset01question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", questionSetDefinitions: null},
                            {id:"fieldset01question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "radio", questionSetDefinitions: subQuestionSetDefinitions}
                        ]
                },
                {
                    id:"fieldset02",
                    label: "Contact information",
                    questionDefinitions:  [
                        {id:"fieldset02question01", valueType: "characters", numChar: 2000, text: "Adresse:", inputType: "text", questionSetDefinitions: null},
                        {id:"fieldset02question02", valueType: "characters", numChar: 2000, text: "Zip code:", inputType: "text", questionSetDefinitions: null},
                        {id:"fieldset02question03", valueType: "characters", numChar: 2000, text: "City:", inputType: "text", questionSetDefinitions: null}
                    ]
                }
            ]
    };

    var jsonDefinition = JSON.stringify(questionnaireDefinition);
    return QuestionnaireJS.builder(jsonDefinition).questionnaire();
}
