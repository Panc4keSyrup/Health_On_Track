const questions = [
  {
  question:"Do you have poor memory?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have misplaced items?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have trouble thinking?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have hard to find the decisions?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have less flexible?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have feeling more thirsty?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have urinating often?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have feeling irritable?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have blurry vision?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have slow-healing sores?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have getting a lot of infections?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have uncontrolled high blood pressure?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have overtreatment with blood thinners?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have bulges in blood vessel walls?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have ischemic stroke?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have trauma?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have changes in mental awareness?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have cough with phlegm?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have low body temperature?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have diarrhea?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have cough with mucus?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have fatigue?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have fever?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have cough up blood?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have chest pain when breathing?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have night sweats?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have not hungry?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have tiredness?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have extreme thirst?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have less frequent urination?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have dark-colored urine?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have dizziness?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have confusion?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have shortness of breath?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have chest pain?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have hoarseness?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have bone pain?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have headache?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have easily bleeding?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have loss of appetite?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have nausea?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have swelling?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have weight loss?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have itchy skin?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have redness in the palms of the hands?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have muscle aches and joint pain?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have rash?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have cough?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have sore throat?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Do you have feeling tired?",
  answers:{
      a: "YES",
      b: "NO",
  },
},
{
  question:"Result",
  answers:{
      a: " ",
      b: " ",
  },
},
]

var currentQuestion = 0;

    function init() {
    nextQuestion();
    }
    
    window.onload = init;

    var responses = {};
    var random = ["#00BDD6FF", "#8353E2FF", "#4069E5FF", "#ED7D2DFF"];    
    

    function randomColor() {
      return Math.ceil(Math.random()*3);
    }

    function nextQuestion() {
      document.getElementById("ans").innerHTML = '';
      var question = questions[currentQuestion];      
    
      document.getElementById("question").innerHTML = question.question;
      
      var answers = question.answers;    

      for (var answer in answers) {
        
        var block_ans = document.createElement("div");

        block_ans.name = question.question;
        block_ans.id = "block-ans";
        block_ans.innerHTML = answers[answer];
        block_ans.style.backgroundColor = random[randomColor()];
        

        document.getElementById("ans").appendChild(block_ans);            

        block_ans.addEventListener("click", function() {         
          responses[question.question] = this.innerHTML;
          nextQuestion();
          if (currentQuestion == questions.length-1){
            submitAnswers();
          }
          else {            
            currentQuestion++;
          }
          console.log(responses)
        });        
      }
    }

  function submitAnswers() {
    document.getElementById("ans").innerHTML = ' ';
    document.getElementById("ans").remove();
    for (const disease in guessDisease(responses)) {
      const li = document.createElement("li");
      li.textContent = disease + ": " + guessDisease(responses)[disease] + "%";
      document.getElementById("message").appendChild(li);
    }
    
  }
  
  var possibleDiseases = {};
  
  var count1 = 0;
  var count2 = 0;
  var count3 = 0;
  var count4 = 0;
  var count5 = 0;
  var count6 = 0;
  var count7 = 0;
  var count8 = 0;
  var count9 = 0;
  var count10 = 0;

  function guessDisease(responses) {
    const tree = {
      'Alzheimers Disease':['poor memory','misplaced items','trouble thinking','hard to find the decisions','less flexible'],
      'Diabetes':['feeling more thirsty','urinating often','feeling tired','feeling irritable','blurry vision','slow-healing sores','getting a lot of infections','weight loss'],
      'Stroke':['uncontrolled high blood pressure','overtreatment with blood thinners','bulges in blood vessel walls','trauma','ischemic stroke'],
      'Pneumonia':['changes in mental awareness','cough with phlegm','low body temperature','diarrhea','fatigue','fever','chest pain when breathing','shortness of breath','nausea'],
      'Bronchitis':['cough with mucus','fatigue','fever','shortness of breath','chest pain'],
      'Tuberculosis':['fever','cough up blood','chest pain when breathing','night sweats','not hungry','tiredness','weight loss'],
      'Dehydration Due To Diarrhea':['fatigue','extreme thirst','less frequent urination','dark-colored urine','dizziness','confusion'],
      'Respiratory Cancer':['cough up blood','shortness of breath','chest pain','hoarseness','bone pain','headache','weight loss'],
      'Cirrhosis':['fatigue','easily bleeding','loss of appetite','nausea','swelling','weight loss','itchy skin','redness in the palms of the hands'],
      'AIDS_HIV':['diarrhea','fever','night sweats','headache','weight loss','muscle aches and joint pain','rash','cough','sore throat'],
  };
// (correct / tree['Alzheimers Disease'].length) * 100
// possibleDiseases.push(percentage + 'Alzheimers Disease');

    for (var question in responses) {

      for (var disease in tree['Alzheimers Disease']) {
        if (responses[question] == "YES" && tree['Alzheimers Disease'][disease].includes(question.slice(12, question.length - 1))) {
          if (count1 < tree['Alzheimers Disease'].length) {
          count1++;            
        }
      } 
      }
      for (var disease in tree['Diabetes']) {
        if (responses[question] == "YES" && tree['Diabetes'][disease].includes(question.slice(12, question.length - 1))) {
          if (count2 < tree['Diabetes'].length) {
          count2++;   
          }
        }
      }
      for (var disease in tree['Stroke']) {
        if (responses[question] == "YES" && tree['Stroke'][disease].includes(question.slice(12, question.length - 1))) {
          if (count3 < tree['Stroke'].length) {
          count3++;
          } 
        }
      }
      for (var disease in tree['Pneumonia']) {
        if (responses[question] == "YES" && tree['Pneumonia'][disease].includes(question.slice(12, question.length - 1))) {
          if (count4 < tree['Pneumonia'].length) {
          count4++;
         }
        }
      }
      for (var disease in tree['Bronchitis']) {
        if (responses[question] == "YES" && tree['Bronchitis'][disease].includes(question.slice(12, question.length - 1))) {
          if (count5 < tree['Bronchitis'].length) {
          count5++;
          } 
        }
      }
      for (var disease in tree['Tuberculosis']) {
        if (responses[question] == "YES" && tree['Tuberculosis'][disease].includes(question.slice(12, question.length - 1))) {
          if (count6 < tree['Tuberculosis'].length) {
          count6++;
          }
        }
      }
      for (var disease in tree['Dehydration Due To Diarrhea']) {
        if (responses[question] == "YES" && tree['Dehydration Due To Diarrhea'][disease].includes(question.slice(12, question.length - 1))) {
          if (count7 < tree['Dehydration Due To Diarrhea'].length) {
          count7++;
          }     
        }
      }
      for (var disease in tree['Respiratory Cancer']) {
        if (responses[question] == "YES" && tree['Respiratory Cancer'][disease].includes(question.slice(12, question.length - 1))) {
          if (count8 < tree['Respiratory Cancer'].length) {
          count8++;
             }
            }
      }
      for (var disease in tree['Cirrhosis']) {
        if (responses[question] == "YES" && tree['Cirrhosis'][disease].includes(question.slice(12, question.length - 1))) {
          if (count9 < tree['Cirrhosis'].length) {
          count9++;
          }
          }
      }
      for (var disease in tree['AIDS_HIV']) {
        if (responses[question] == "YES" && tree['AIDS_HIV'][disease].includes(question.slice(12, question.length - 1))) {
          if (count10 < tree['AIDS_HIV'].length) {
          count10++;
          }
        }
      }
    }

    if (count1 > 0){
      possibleDiseases['Alzheimers Disease'] = (count1/tree['Alzheimers Disease'].length)*100;
      count1 = 0;
    }
    if (count2 > 0){
      possibleDiseases['Diabetes'] = (count2/tree['Diabetes'].length)*100;
      count2 = 0;
    }
    if (count3 > 0){
      possibleDiseases['Stroke'] = (count3/tree['Stroke'].length)*100;
      count3 = 0;
    }
    if (count4 > 0){
      possibleDiseases['Pneumonia'] = (count4/tree['Pneumonia'].length)*100;
      count4 = 0;
    }
    if (count5 > 0){
      possibleDiseases['Bronchitis'] = (count5/tree['Bronchitis'].length)*100;
      count5 = 0;
    }
    if (count6 > 0){
      possibleDiseases['Tuberculosis'] = (count6/tree['Tuberculosis'].length)*100;
      count6 = 0;
    }
    if (count7 > 0){
      possibleDiseases['Dehydration Due To Diarrhea'] = (count7/tree['Dehydration Due To Diarrhea'].length)*100;
      count7 = 0;
    }
    if (count8 > 0){
      possibleDiseases['Respiratory Cancer'] = (count8/tree['Respiratory Cancer'].length)*100;
      count8 = 0;
    }
    if (count9 > 0){
      possibleDiseases['Cirrhosis'] = (count9/tree['Cirrhosis'].length)*100;
      count9 = 0;
    }
    if (count10 > 0){
      possibleDiseases['AIDS_HIV'] = (count10/tree['AIDS_HIV'].length)*100;
      count10 = 0;
    }

    console.log(possibleDiseases);

    return possibleDiseases;
  }
