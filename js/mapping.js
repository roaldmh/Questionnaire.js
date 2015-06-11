/**
 * Created by rmh on 09.06.15.
 */

(function mapping() {
    questionSets.personalInformationSet.questions.push(questions.questionName);
    questionSets.personalInformationSet.questions.push(questions.questionAge);
    questionSets.personalInformationSet.questions.push(questions.questionGender);
    questionSets.personalInformationSet.questions.push(questions.questionAboutYourself);

    questionSets.contactInformationSet.questions.push(questions.questionAdresse);
    questionSets.contactInformationSet.questions.push(questions.questionZipCode);
    questionSets.contactInformationSet.questions.push(questions.questionCity);

    questionSets.studyProgramSet.questions.push(questions.naturalSciencesQuestion);

    questionSets.biologyQuestionSet.questions.push(questions.questionHumanBiology);
    questionSets.biologyQuestionSet.questions.push(questions.questionBotany);
    questionSets.biologyQuestionSet.questions.push(questions.questionZoology);

    questions.questionZoology.choices.values[0].questions.push(questionSets.contactInformationSet)


})();
