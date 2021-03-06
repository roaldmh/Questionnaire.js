# Questionnaire.js

A JavaScript library for generating questionnaires from JSON definition files.

The following features are implemented:

- Given a valid JSON definition file, a questionnaire will be generated as HTML on your webpage.
- Form inputs: 
 - single line: input type=text
 - multiple line input: textarea
 - single choice list: radio buttons
 - multiple choice list: check boxes
- Multiple sets of questions, implemented as fieldsets
- Nesting of question sets 
- Generates a JSON questionnaire response file containing questionnaire information and all the questions with the answers

Road map:

- More form inputs:
 - single choice list: drop down list
- Validate input:
 - Check for empty
 - Validate numerical input
- Style class arrays for the different parts of the form in JSON definition file

How to use:

- Drop the **questionnaire.js** file into your project
- Create a html form ``` <form class="questionnaireForm">...</form>``` in your web page
- In a javascript file set up something like the script below.
- Notice that you add the *submit button* yourself and set up the *event handler* to use ```QuestionnaireJS.response()``` to get the response json file

```javascript
window.onload = init;

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
        title: "Example questionnaire 1",
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
                                values: ["man", "woman"],
                                texts: ["Man", "Woman"],
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
                            questionSetDefinitions: subQuestionSetDefinitions}
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
```


