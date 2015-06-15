/**
 * Create your sets of questions here. 'id' and 'label' must have values
 * and questions should be an empty array. This empty array will be filled from
 * 'mapping.js' if it is needed.
 *
 * Created by Roald Martin Hamnvik on 01.06.15.
 */

// --- QUESTION SET (fieldset) ---

"use strict";

var questionSets = (function () {
    return {

        personalInformationSet: {
            id: "personalInformation",
            label: "Personal information",
            questions: []
        },

        contactInformationSet: {
            id: "contactInformation",
            label: "Contact information",
            questions: []
        },

        studyProgramSet: {
            id: "studyProgramSet",
            label: "Study program interests",
            questions: []
        },

        biologyQuestionSet: {
            id: "biologyCourses",
            label: "Biology courses",
            questions: []
        }
    }

})();

