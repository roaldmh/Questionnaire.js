/**
 * Here you create your questions. Follow the same pattern as these examples.
 *
 * For inputType 'checkbox', you will have to give some choices and observe the
 * empty array assigned to each choice. This will be filled with question sets if
 * it is needed from 'mapping.js'.
 *
 *
 * Created by Roald Martin Hamnvik on 09.06.15.
 */


// --- QUESTION ---

"use strict";

var questions = (function() {
    return {
        questionName:  {
            id:"questionName",
            valueType: "characters",
            numChar: 2000,
            text: "Name:",
            inputType: "text"
        },

        questionAge:  {
            id:"questionAge",
            valueType: "number",
            numChar: 3,
            text: "Age:",
            inputType: "text"
        },

        questionAboutYourself:  {
            id:"questionAboutYourself",
            valueType: "characters",
            numChar: 2000,
            text: "Tell us about yourself:",
            inputType: "textarea"
        },

        questionGender:  {
            id:"questionGender",
            valueType: "characters",
            numChar: 2000,
            text: "Gender:",
            inputType: "radio",

            name: "gender",
            values: ["man", "woman"],
            texts: ["Man", "Woman"]
        },

        questionAddress:  {
            id:"questionAddress",
            valueType: "characters",
            numChar: 2000,
            text: "Adresse:",
            inputType: "text"
        },

        questionZipCode:  {
            id:"questionZipCode",
            valueType: "characters",
            numChar: 2000,
            text: "Zip code:",
            inputType: "text"
        },

        questionCity:  {
            id:"questionCity",
            valueType: "characters",
            numChar: 2000,
            text: "City:",
            inputType: "text"
        },

        questionNaturalSciences:  {
            id:"questionNaturalSciences",
            valueType: "characters",
            numChar: 2000,
            text: "Study programs:",
            inputType: "checkbox",

            choices: {
                id: "choiceZoology",
                values: [
                    {
                        text: "Physics",
                        name: "naturalSciencePhysics",
                        value: "physics",
                        questions: []
                    },
                    {
                        text: "Mathematics",
                        name: "naturalScienceMathematics",
                        value: "mathematics",
                        questions: []
                    },
                    {
                        text: "Biology",
                        name: "naturalScienceBiology",
                        value: "biology",
                        questions: []
                    }
                ]
            }
        },

        questionZoology:  {
            id:"questionZoology",
            valueType: "characters",
            numChar: 2000,
            text: "Zoology courses:",
            inputType: "checkbox",

            choices: {
                id: "choiceZoology",
                values: [
                    {
                        text: "Terrestrial",
                        name: "terrestrialZoology",
                        value: "terrestrial",
                        questions: []
                    },
                    {
                        text: "Marine",
                        name: "marineZoology",
                        value: "marine",
                        questions: []
                    }
                ]
            }
        },

        questionBotany:  {
            id: "questionBotany",
            valueType: "characters",
            numChar: 2000,
            text: "Botany:",
            inputType: "checkbox",

            choices: {
                id: "choiceBotany",
                values: [
                    {
                        text: "Terrestrial",
                        name: "terrestrialBotany",
                        value: "terrestrial",
                        questions: []
                    },
                    {
                        text: "Marine",
                        name: "marineBotany",
                        value: "marine",
                        questions: []
                    }
                ]
            }
        },

        questionHumanBiology:  {
            id:"questionHumanBiology",
            valueType: "characters",
            numChar: 2000,
            text: "Human biology:",
            inputType: "checkbox",

            choices: {
                id: "choiceHumanBiology",
                values: [
                    {
                        text: "Anatomy",
                        name: "humanAnatomy",
                        value: "anatomy",
                        questions: []
                    },
                    {
                        text: "Physiology",
                        name: "humanPhysiology",
                        value: "physiology",
                        questions: []
                    }
                ]
            }
        }

    };


})();

