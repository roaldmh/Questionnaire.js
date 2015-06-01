/**
 * Created by Roald Martin Hamnvik on 01.06.15.
 */

window.onload = init;

function init() {
    var form = document.getElementsByClassName("questionnaireForm").item(0);
    form.appendChild(createQuestionnaire());
}

function createQuestionnaire() {
     var configs = [
     ["question01", "characters", 2000, "What is you name?", "text", null],
     ["question02", "characters", 2000,  "Where do you live?", "text", null],
     ["question03", "number", 2, "What is your age?", "text", null]
     ];

     var questions = QuestionnaireJS.questions(configs);
     return QuestionnaireJS.newQuestionnaire("exampleQuestionnaire", "Example", questions).questionnaire();
}
