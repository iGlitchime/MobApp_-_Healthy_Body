var Welcome = "Welcome to Healthy Body — Biological Age! This app is designed specially to rejuvenate you and your inner health. We will help you to determine your biological age and to successfully lower it. In order to start, please complete the following test";

var bmi_test = [
    {
        title:"How often do you work out?",
        img: "css/img/q1.jpg",
        answers:["Every week", "Once in a while", "Seldom", "(Almost) never"]
    },
    {
        title:"How often do you go by foot instead of using private/public transport?",
        img: "css/img/q2.jpg",
        answers:["Regularly", "Once in a while", "Sometimes", "Rarely"]
    },
    {
        title:"Do you prefer eating healthy/green food?",
        img: "css/img/q3.jpg",
        answers:["I keep a balanced diet of meat and vegetables", "I tend to eat less/no meat", "Sometimes I eat at fast-food", "I don't really care what I eat"]
    },
    {
        title:"Do you smoke?",
        img: "css/img/q4.jpg",
        answers:["No, I never did", "I did, but stopped a while back", "Occasionally", "Regularly"]
    },
    {
        title:"How can you describe the place where you live?",
        img: "css/img/q5.jpg",
        answers:["Small village/town", "Average-size town", "Big crowded city", "Huge megalopolis"]
    },
    {
        title:"Do you sleep regularly and well?",
        img: "css/img/q6.jpg",
        answers:["I tend to follow strict schedule", "Sometimes I go to sleep too late", "I work day/night shifts", "Sometimes I don't sleep for 2+ days"]
    },
    {
        title:"Do you drink alcohol?",
        img: "css/img/q7.jpg",
        answers:["(Almost) never/moderately", "Every week or so", "3-4 days a week", "Regularly"]
    },
    {
        title:"How often do you go out/socialize?",
        img: "css/img/q8.jpg",
        answers:["Regularly", "Every week or so", "About once a month", "(Almost) never"]
    },
    {
        title:"Do you have an active sex life?",
        img: "css/img/q9.jpg",
        answers:["Yes", "(Not) quite active", "Not really", "Not at all"]
    },
    {
        title:"How often do you check with a doctor?",
        img: "css/img/q10.jpg",
        answers:["Sometimes/regularly", "Only when strictly necessary", "Seldomly", "Rarely/never"]
    }
    
];

var Tasks_variants=[
    [
        "Congratulations, your biological age is equal to your real age! Complete our daily recommendations to stay healthy!",
        "Walk at least 1 km (0.62 mi) by foot",
        "Do a 150 m (492 ft) fast-paced walk",
        "Walk at least 3 staircases",
        "Jog in place for 1 minute",
        "Do 10 slight crouches",
        "Do 5 reverse push-ups using a chair",
        "Do 5 push-ups using a table",
        "Do 20 (rope) jumps",
        "Do a warm-up in the morning",
        "Have a green salad for lunch or dinner",
        "Drink at least 1 liter of water",
        "Restrain from sweets or fast-food for the evening",
        "Spend 10 minutes outside at least 3 times",
        "Restrain from sugary drinks and coffee",
        "Plan your schedule to sleep at least 7 hours tonight",
        
    ],
    [
        "Your biological age is higher than your real age. We recommend you to complete our daily tasks to reduce it.",
        "Walk at least 1.5 km (0.93 mi) by foot",
        "Do a 200 m (656 ft) fast-paced walk",
        "Walk at least 4 staircases",
        "Jog in place for 2 minute",
        "Do 15 slight crouches",
        "Do 8 reverse push-ups using a chair",
        "Do 8 push-ups using a table",
        "Do 30 (rope) jumps",
        "Do a warm-up in the morning and during the day",
        "Have a green salad for lunch or dinner",
        "Drink at least 1.5 liter of water",
        "Restrain from sweets or fast-food for today",
        "Spend 15 minutes outside at least 3 times",
        "Restrain from sugary drinks and coffee",
        "Plan your schedule to sleep at least 7 hours tonight"
    ],
    [
        "Your biological age is much higher than your real age. We advise you to complete our daily tasks to reduce it and to review your daily routine.",
        "Walk at least 2 km (1.24 mi) by foot",
        "Do a 250 m (820 ft) fast-paced walk",
        "Walk at least 5 staircases",
        "Jog in place for 3 minute",
        "Do 20 slight crouches",
        "Do 10 reverse push-ups using a chair",
        "Do 10 push-ups using a table",
        "Do 35 (rope) jumps",
        "Do a warm-up in the morning and during the day",
        "Have a green salad for lunch or dinner",
        "Drink at least 2 liter of water",
        "Restrain from sweets or fast-food for today",
        "Spend 20 minutes outside at least 3 times",
        "Restrain from sugary drinks and coffee",
        "Plan your schedule to sleep at least 7 hours tonight"
    ],
    [
        "Your biological age is severely higher than your real age. We strictly advise you to do our daily tasks to reduce it and to review your daily routine and diet.",
        "Walk at least 2.5 km (1,55 mi) by foot",
        "Do a 300 m (984 ft) fast-paced walk",
        "Walk at least 7 staircases",
        "Jog in place for 4 minute",
        "Do 30 slight crouches",
        "Do 14 reverse push-ups using a chair",
        "Do 15 push-ups using a table",
        "Do 45 (rope) jumps",
        "Do a warm-up 3 times during the day",
        "Have a green salad for lunch and dinner",
        "Drink at least 2.5 liter of water",
        "Restrain from sweets or fast-food for today",
        "Spend 25 minutes outside at least 3 times",
        "Restrain from sugary drinks and coffee"
    ]
];

var info=[
    {
        title: "What is biological age?",
        img: "css/img/info1.jpg",
        txt: "Biological age can be shortly described as the “inner” age of your body. It may and usually does differ from your real (chronological) age, sometimes greatly. Basically, when you refer to biological age of your body, you refer to how worn out your inner organs are, how they and your body are affected by your lifestyle and/or bad habits. There are no strict and definite ways to determine your biological age precisely, but we tend to be as accurate as possible. Unlike your real age, you have chances to reduce your biological age, i.e. make and keep your body young. Good luck!"
    },
    {
        title: "What is BMI?",
        img: "css/img/info2.jpg",
        txt: "Body mass index (BMI) is a measure of body fat based on your weight in relation to your height, and applies to most adult men and women aged 20 and over. BMI won't be accurate and shouldn't be used for children. Essentially, BMI is a simple mathematical formula, based on height and weight, that is used to measure fatness. You should be aware of your BMI because of the health risks of being overweight (that is, having a BMI of 25 or over). We calculate your BMI automatically as you pass the test. BMI and calculated biological age will help you to understand how your lifestyle and routine should be changed."
    },
    {
        title: "Real and biological age",
        img: "css/img/info3.jpg",
        txt: "Your biological age represents the state of your body – inner organs, body systems, etc. Sometimes (actually it is often the case), your body is “worn out” thus making your biological “inner” age higher than your real “chronological” age. This is usually the result of passive lifestyle and work in the office, bad habits and lack of physical exercises. Other things, like environment, sex life and even regular sleep also affect your biological age. Hopefully it can always be reduced to be equal your real age. And even if you are lucky to have your biological and real ages being equal, you have to keep them that way. It requires dedication and guidance. We hope than our application will help with this task."
    }
];
