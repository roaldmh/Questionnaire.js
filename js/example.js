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

    var subSubFieldsetDefinition = [
        {
            id:"fieldset02",
            label: "Personal information",
            questionDefinitions:
                [
                    {id:"question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", questionSetDefinitions: null},
                    {id:"question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", questionSetDefinitions: null},
                    {id:"question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "text", questionSetDefinitions: null}
                ]
        },
    ];

    var questionSetDefinitions=
        [
            {
                id:"fieldset01",
                label: "Personal information",
                questionDefinitions:
                    [
                        {id:"question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", questionSetDefinitions: subSubFieldsetDefinition},
                        {id:"question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", questionSetDefinitions: null},
                        {id:"question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "text", questionSetDefinitions: null}
                    ]
            },
            {
                id:"fieldset02",
                label: "Contact information",
                questionDefinitions:  [
                    {id:"question01", valueType: "characters", numChar: 2000, text: "Adresse:", inputType: "text", questionSetDefinitions: null},
                    {id:"question02", valueType: "characters", numChar: 2000, text: "Zip code:", inputType: "text", questionSetDefinitions: null},
                    {id:"question03", valueType: "characters", numChar: 2000, text: "City:", inputType: "text", questionSetDefinitions: null}
                ]
            }
        ];

    var definition = {
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
                            {id:"question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", questionSetDefinitions: null},
                            {id:"question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", questionSetDefinitions: null},
                            {id:"question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "radio", questionSetDefinitions: questionSetDefinitions}
                        ]
                },
                {
                    id:"fieldset02",
                    label: "Contact information",
                    questionDefinitions:  [
                        {id:"question01", valueType: "characters", numChar: 2000, text: "Adresse:", inputType: "text", questionSetDefinitions: null},
                        {id:"question02", valueType: "characters", numChar: 2000, text: "Zip code:", inputType: "text", questionSetDefinitions: null},
                        {id:"question03", valueType: "characters", numChar: 2000, text: "City:", inputType: "text", questionSetDefinitions: null}
                    ]
                }
            ]
    };

    var jsonDefinition = JSON.stringify(definition);
    return QuestionnaireJS.builder(jsonDefinition).questionnaire();
}
