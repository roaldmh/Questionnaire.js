/**
 * Created by Roald Martin Hamnvik on 09.06.15.
 *
 * This is how you can bind questions and question sets together
 */

"use strict";

(function mapping() {

    // Mapping questions to question sets
    questionSets.personalInformationSet.questions.push(questions.questionName);
    questionSets.personalInformationSet.questions.push(questions.questionAge);
    questionSets.personalInformationSet.questions.push(questions.questionGender);
    questionSets.personalInformationSet.questions.push(questions.questionAboutYourself);

    questionSets.contactInformationSet.questions.push(questions.questionAddress);
    questionSets.contactInformationSet.questions.push(questions.questionZipCode);
    questionSets.contactInformationSet.questions.push(questions.questionCity);

    questionSets.studyProgramSet.questions.push(questions.questionNaturalSciences);

    questionSets.biologyQuestionSet.questions.push(questions.questionHumanBiology);
    questionSets.biologyQuestionSet.questions.push(questions.questionBotany);
    questionSets.biologyQuestionSet.questions.push(questions.questionZoology);

    // Mapping question sets to checkbox choices. The question set will become a sub-fieldset
    questions.questionNaturalSciences.choices.values[2].questions.push(questionSets.biologyQuestionSet);

})();
