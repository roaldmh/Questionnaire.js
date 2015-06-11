/**
 * Created by rmh on 09.06.15.
 */


// --- QUESTION --- ): question

var questions = (function() {
    return {
        questionName:  {
            id:"questionSet01question01",
            valueType: "characters",
            numChar: 2000,
            text: "Name:",
            inputType: "text"
        },

        questionAge:  {
            id:"questionSet01question02",
            valueType: "number",
            numChar: 3,
            text: "Age:",
            inputType: "text"
        },

        questionAboutYourself:  {
            id:"questionSet01question03",
            valueType: "characters",
            numChar: 2000,
            text: "Tell us about yourself:",
            inputType: "textarea"
        },

        questionGender:  {
            id:"questionSet01question04",
            valueType: "characters",
            numChar: 2000,
            text: "Gender:",
            inputType: "radio",

            name: "gender",
            values: ["man", "woman"],
            texts: ["Man", "Woman"]
        },

        questionAdresse:  {
            id:"questionSet02question01",
            valueType: "characters",
            numChar: 2000,
            text: "Adresse:",
            inputType: "text"
        },

        questionZipCode:  {
            id:"questionSet02question02",
            valueType: "characters",
            numChar: 2000,
            text: "Zip code:",
            inputType: "text"
        },

        questionCity:  {
            id:"questionSet02question03",
            valueType: "characters",
            numChar: 2000,
            text: "City:",
            inputType: "text"
        },

        naturalSciencesQuestion:  {
            id:"naturalSciences",
            valueType: "characters",
            numChar: 2000,
            text: "Study programs:",
            inputType: "checkbox"

            //name: "StudyPrograms",
            //values: ["mathematics", "physics", "biology"],
            //texts: [ // TODO: hvordan definere dette?
            //    {
            //        text: "Physics"
            //    },
            //    {
            //        text: "Mathematics"
            //    },
            //    {
            //        text: "Biology"
            //    }
            //]
        },

        questionZoology:  {
            id:"zoologyCoursesQuestion01",
            valueType: "characters",
            numChar: 2000,
            text: "Zoology courses:",
            inputType: "checkbox",

            choices: {
                id: "choiceZoology",
                name:"zoology",
                values: [
                    {
                        text: "Terrestrial",
                        value: "terrestrial",
                        questions: []
                    },
                    {
                        text: "Marine",
                        value: "marine",
                        questions: []
                    }
                ]
            }
        },

        questionBotany:  {
            id: "questionSet03question02",
            valueType: "characters",
            numChar: 2000,
            text: "Botany:",
            inputType: "checkbox",

            choices: {
                id: "choiceBotany",
                name:"botany",
                values: [
                    {
                        text: "Terrestrial",
                        value: "terrestrial",
                        questions: []
                    },
                    {
                        text: "Marine",
                        value: "marine",
                        questions: []
                    }
                ]
            }
        },

        questionHumanBiology:  {
            id:"questionSet03question03",
            valueType: "characters",
            numChar: 2000,
            text: "Human biology:",
            inputType: "checkbox",

            choices: {
                id: "choiceHumanBiology",
                name:"humanBiology",
                values: [
                    {
                        text: "Anatomy",
                        value: "anatomy",
                        questions: []
                    },
                    {
                        text: "Physiology",
                        value: "physiology",
                        questions: []
                    }
                ]
            }
        }

    };


})();

