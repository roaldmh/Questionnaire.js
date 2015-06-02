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
                    {id:"question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", subFieldsets: null},
                    {id:"question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", subFieldsets: null},
                    {id:"question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "text", subFieldsets: null}
                ]
        },
    ];

    var subFieldsetsDefinition =
        [
            {
                id:"fieldset01",
                label: "Personal information",
                questionDefinitions:
                    [
                        {id:"question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", subFieldsets: subSubFieldsetDefinition},
                        {id:"question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", subFieldsets: null},
                        {id:"question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "text", subFieldsets: null}
                    ]
            },
            {
                id:"fieldset02",
                label: "Contact information",
                questionDefinitions:  [
                    {id:"question01", valueType: "characters", numChar: 2000, text: "Adresse:", inputType: "text", subFieldsets: null},
                    {id:"question02", valueType: "characters", numChar: 2000, text: "Zip code:", inputType: "text", subFieldsets: null},
                    {id:"question03", valueType: "characters", numChar: 2000, text: "City:", inputType: "text", subFieldsets: null}
                ]
            }
        ];

    var definition = {
        id: "ExampleQuestionnaire01",
        title: "Example 1",
        description: "This is an example questionnaire made by using QuestionnaireJS. " +
        "You can play around with the configuration and see how that changes the questionnaire. " +
        "This questionnaire uses several fieldsets and nested fieldsets.",

        fieldsetDefinitions:
            [
                {
                    id:"fieldset01",
                    label: "Personal information",
                    questionDefinitions:
                        [
                            {id:"question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", subFieldsets: null},
                            {id:"question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", subFieldsets: null},
                            {id:"question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "radio", subFieldsets: subFieldsetsDefinition}
                        ]
                },
                {
                    id:"fieldset02",
                    label: "Contact information",
                    questionDefinitions:  [
                        {id:"question01", valueType: "characters", numChar: 2000, text: "Adresse:", inputType: "text", subFieldsets: null},
                        {id:"question02", valueType: "characters", numChar: 2000, text: "Zip code:", inputType: "text", subFieldsets: null},
                        {id:"question03", valueType: "characters", numChar: 2000, text: "City:", inputType: "text", subFieldsets: null}
                    ]
                }
            ]
    };

    var jsonDefinition = JSON.stringify(definition);
    var questionnaire = QuestionnaireJS.newQuestionnaire(jsonDefinition);
    return questionnaire.print();
}
