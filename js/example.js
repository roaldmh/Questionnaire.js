/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 */

"use strict";

window.onload = init;

function init() {
    var form = document.getElementsByClassName("questionnaireForm").item(0);
    form.appendChild(createQuestionnaire());

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("value", "Submit questionnaire");
    submitButton.onclick = save;

    form.appendChild(submitButton);
}

function createQuestionnaire() {

    var id = "exampleQuestionnaire";
    var title = "Example";

    var subSubQuestionSetDefinitions = [
        {
            id:"questionSet05",
            label: "Personal information",
            questionDefinitions:
                [
                    {id:"questionSet05question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", questionSetDefinitions: null},
                    {id:"questionSet05question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", questionSetDefinitions: null},
                    {id:"questionSet05question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "text", questionSetDefinitions: null}
                ]
        }
    ];

    var subQuestionSetDefinitions =
        [
            {
                id:"questionSet03",
                label: "Personal information",
                questionDefinitions:
                    [
                        {id:"questionSet03question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", questionSetDefinitions: subSubQuestionSetDefinitions},
                        {id:"questionSet03question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", questionSetDefinitions: null},
                        {id:"questionSet03question03", valueType: "characters", numChar: 1, text: "Gender:", inputType: "text", questionSetDefinitions: null}
                    ]
            },
            {
                id:"questionSet04",
                label: "Contact information",
                questionDefinitions:  [
                    {id:"questionSet04question01", valueType: "characters", numChar: 2000, text: "Adresse:", inputType: "text", questionSetDefinitions: null},
                    {id:"questionSet04question02", valueType: "characters", numChar: 2000, text: "Zip code:", inputType: "text", questionSetDefinitions: null},
                    {id:"questionSet04question03", valueType: "characters", numChar: 2000, text: "City:", inputType: "text", questionSetDefinitions: null}
                ]
            }
        ];

    var questionnaireDefinition = {
        id: "ExampleQuestionnaire01",
        title: "Example 1",
        description: "This is an example questionnaire made by using QuestionnaireJS. " +
        "You can play around with the configuration and see how that changes the questionnaire. " +
        "This questionnaire uses several questionSets and nested questionSets.",

        questionSetDefinitions:
            [
                {
                    id:"questionSet01",
                    label: "Personal information",
                    questionDefinitions:
                        [
                            {id:"questionSet01question01", valueType: "characters", numChar: 2000, text: "Name:", inputType: "text", questionSetDefinitions: null},
                            {id:"questionSet01question02", valueType: "number", numChar: 3, text: "Age:", inputType: "text", questionSetDefinitions: null},
                            {id:"questionSet01question03", valueType: "characters", numChar: 2000, text: "Tell us about yourself:", inputType: "textarea", questionSetDefinitions: null},
                            {id:"questionSet01question04",
                                valueType: "characters",
                                numChar: 2000,
                                text: "Gender:",
                                inputType: "radio",
                                name: "gender",
                                values: ["male", "female", "mix"],
                                texts: ["Male", "Female", "Mix"],
                                questionSetDefinitions: null}
                        ]
                },
                {
                    id:"questionSet02",
                    label: "Contact information",
                    questionDefinitions:  [
                        {id:"questionSet02question01", valueType: "characters", numChar: 2000, text: "Adresse:", inputType: "text", questionSetDefinitions: null},
                        {id:"questionSet02question02", valueType: "characters", numChar: 2000, text: "Zip code:", inputType: "text", questionSetDefinitions: null},
                        {id:"questionSet02question03", valueType: "characters", numChar: 2000, text: "City:", inputType: "text", questionSetDefinitions: null}
                    ]
                },
                {
                    id:"questionSet05",
                    label: "Study program interests",
                    questionDefinitions:  [
                        {id:"questionSet05question01",
                            valueType: "characters",
                            numChar: 2000, text: "Study programs:",
                            inputType: "checkbox",
                            name: "StudyPrograms",
                            values: ["Mathematics", "Physics", "Chemistry", "Biology"],
                            texts: ["Mathematics", "Physics", "Chemistry", "Biology"],
                            questionSetDefinitions: null}
                    ]
                }
            ]
    };

    var jsonDefinition = JSON.stringify(questionnaireDefinition);
    return QuestionnaireJS.build(jsonDefinition).questionnaire();
}

function save() {
    var utP = document.getElementById("ut");
    utP.innerHTML = QuestionnaireJS.response();
    console.log(QuestionnaireJS.response());
}
