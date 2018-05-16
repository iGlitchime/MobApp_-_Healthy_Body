var formData;
var Count=0;
var SumAnswers=0;
var bmi;
var num_difference;

// add Framework7 libs
var myApp = new Framework7({
    modalTitle: "Healthy Body",
	init: false,
  	fastClicks: true
});
var $$ = Dom7;

// get the view
var mainView = myApp.addView('#view-main', {
        dynamicNavbar: true,
        domCache: true
    });
    
// download full app
document.addEventListener('DOMContentLoaded', function(){
    // if i's first open
    if(localStorage["HealthyBody_userData"]){
        var UserData = JSON.parse(localStorage.getItem("HealthyBody_userData"));

        if(UserData.bio_age !== ""){
            UserData.user_age;
            UserData.user_growth;
            UserData.user_weight;
            // UserData.test_variants;
            UserData.bio_age;
            UserData.SumAnswers;
            

            bmi = calculate_bmi(UserData.user_growth, UserData.user_weight);

            num_difference = result_differ(UserData.user_age, UserData.bio_age);

            mainView.loadPage('#user_home');
                $$('#bmi_count_data').html("BMI Results: " + bmi.toFixed(2));
                $$('#real_age').html("Your Age: " + UserData.user_age);
                $$('#Biometrical_age').html("Your Biological Age: " + UserData.bio_age);
                $$('#result_comments').html(num_difference);
                $$('#circle_user_age').html(UserData.user_age + "<br>" + "years");
                $$('#circle_user_biomAge').html(UserData.bio_age + "<br>" + "years");
                
                var realAgePercent = UserData.user_age * 100 / 130;
                var BioAgePercent = UserData.bio_age * 100 / 130;
                $$ ('#ProgBar_realAge').css({
                    width: realAgePercent + "%"
                });

                $$ ('#ProgBar_BioAge').css({
                    width: BioAgePercent + "%"//видимость = 0
                });
        }else{
            mainView.loadPage('#Welcome');
    }
    }
            $$('#Welcome').html(Welcome);
            $$('#start_test').on('click', function(){
                mainView.loadPage('#enter_data'); 
            });
            
            Three_pickers_ready();
            
            $$('#next-test').on('click', function(){
                formData = {
                    user_age: $$('#user_age').val().split(' ')[0],
                    user_growth: $$('#user_growth').val().split(' ')[0],
                    user_weight: $$('#user_weight').val().split(' ')[0],
                    bio_age: ""
                }
                if(formData.user_age == "" || formData.user_age == 0){
                    myApp.alert('Your age is required');
                    return;
                }else if(formData.user_growth == "" || formData.user_growth == 0){
                    myApp.alert('Your Growth is required');
                    return;
                }else if (formData.user_weight == "" || formData.user_weight == 0){
                    myApp.alert('Your Weight is required');
                    return;
                }
                    
                localStorage.setItem("HealthyBody_userData", JSON.stringify(formData));
                
                bmi = calculate_bmi(formData.user_growth, formData.user_weight);
                mainView.loadPage('#test_page');
                $$('#bmi_count_data').html("Count BMI: " + bmi.toFixed(2));
            });

            test_quest();
            
            $$('.info_page').on('click', function(){
                mainView.loadPage('#info_page'); 
            });
            $$('.Main_page_result').on('click', function(){
                mainView.loadPage('#Main_page_result'); 
            });
            $$('.tasks_page').on('click', function(){
                mainView.loadPage('#tasks_page');
            });
});

function test_quest (){
    var array_id_answer = [0, 1, 2, 3];
    var shuffle_answer = shuffle_Array(array_id_answer);
    $$('#test_question').html(bmi_test[Count].title);

    $$ ('#test_picture').css({
                 background: "url('" + bmi_test[Count].img + "') no-repeat",
                 backgroundSize: "100% 100%",
                 backgroundPosition: "center"
             });

    $$('.test_question_num').html(Count + 1 + "/10");
    $$('#answer_variant_1').html(bmi_test[Count].answers[shuffle_answer[0]]);
    $$('#answer_variant_2').html(bmi_test[Count].answers[shuffle_answer[1]]);
    $$('#answer_variant_3').html(bmi_test[Count].answers[shuffle_answer[2]]);
    $$('#answer_variant_4').html(bmi_test[Count].answers[shuffle_answer[3]]);
    
    $$('#answer_variant_1').attr('data-point', shuffle_answer[0]);
    $$('#answer_variant_2').attr('data-point', shuffle_answer[1]);
    $$('#answer_variant_3').attr('data-point', shuffle_answer[2]);
    $$('#answer_variant_4').attr('data-point', shuffle_answer[3]);
};


function shuffle_Array(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

$$('.buttonTest').on('click', function(e){
    SumAnswers += e.target.dataset.point * 1;
    Count++;

    var userData = JSON.parse(localStorage.getItem("HealthyBody_userData"))
    userData.SumAnswers = SumAnswers;
    localStorage.setItem("HealthyBody_userData", JSON.stringify(userData));
        
    if(Count==10){
        count_bio_age = Biometr_age(formData.user_age);
        if(bmi <= 20){
              count_bio_age += 0;
          } else if (bmi > 20 && bmi <= 25){
              count_bio_age += 1;
          } else if (bmi > 25 && bmi >= 30){
              count_bio_age += 3;
          } else if (bmi > 30) {
              count_bio_age += 5;
          }
        var userData = JSON.parse(localStorage.getItem("HealthyBody_userData"))
        userData.bio_age = count_bio_age;
        localStorage.setItem("HealthyBody_userData", JSON.stringify(userData));

          var num_difference = result_differ(formData.user_age, userData.bio_age);

          mainView.loadPage('#user_home');

        $$('#real_age').html("Your Age: " + formData.user_age);
          $$('#result_comments').html(num_difference);
          $$('#Biometrical_age').html("Your Biological Age: " + count_bio_age);
          $$('#circle_user_age').html(formData.user_age + "<br>" + "years");
          $$('#circle_user_biomAge').html(count_bio_age + "<br>" + "years");

         var realAgePercent = formData.user_age * 100 / 130;
         var BioAgePercent = count_bio_age * 100 / 130;

         $$ ('#ProgBar_realAge').css({
             width: realAgePercent + "%"
         });
         $$ ('#ProgBar_BioAge').css({
             width: BioAgePercent + "%"
         });
          
    } else{
         document.documentElement.style.pointerEvents = "none";
         $$ ('.evanescence').css({
             opacity:0
         });
         var timer = setTimeout(function () {
             test_quest();
             $$ ('.evanescence').css({
                 opacity: 1
             })
         }, 500);
         var block_click = setTimeout(function() {
             document.documentElement.style.pointerEvents = "auto";
         },1000);
    }
});

function calculate_bmi (height, weight){
    var growth_metres = height/100;
    bmi = weight / (growth_metres * growth_metres);
    return bmi;
}

function Biometr_age(user_age){
    var a = JSON.parse(localStorage.getItem("HealthyBody_userData"))
    var i = a.SumAnswers*1 + user_age*1;
    return i;  
}
function result_differ (user_age, bio_age){
    var num = 0;
    var a = bio_age*1 - user_age*1;
    if(a <= 0){
        num=0;
    } else if(a >= 1 && a <= 10){
        num = 1;
    } else if(a >= 11 && a <= 20){
        num = 2;
    } else {
        num = 3;
    }
    var num_difference = Tasks_variants[num][0];

    var result_html_string = "";
    for(var i=1; i<Tasks_variants[num].length; i++) {
        result_html_string += '<li>'+
                                     '<label class="label-checkbox item-content">'+
                                         '<input type="checkbox" name="user_tasks" id="task_'+ i + '" value="task_' + i + '">' +
                                            '<div class="item-media">'+
                                                '<i class="icon icon-form-checkbox"></i>'+
                                            '</div>'+
                                            '<div class="item-inner">'+
                                                '<div id="task1" class="item-title">' + Tasks_variants[num][i] + '</div>'+
                                            '</div>'+
                                        '</label>'+
                                    '</li>';
    }
    $$('#list-tasks').html('<ul>' + result_html_string + '</ul>');
    
    $$('input[name="user_tasks"]').on('change', function(e){
        var t = JSON.parse(localStorage.getItem('tasksChecked'));
        var r = t.indexOf($$(this).val())
        if( r < 0) {
            t.push($$(this).val());
        }else{
            t.splice(r, 1);
        }
        localStorage.setItem('tasksChecked', JSON.stringify(t));
	});
    return num_difference;
}
$$('#tab_2').on('click', function(e){
    var check = JSON.parse(localStorage.getItem('tasksChecked'))
    for(var i=0; i<check.length; i++ ){
        $$('#' + check[i]).prop('checked', true)
    }
})
if(!localStorage['newDay']){
	localStorage['newDay'] = new Date().getDate();
    localStorage.setItem('tasksChecked', JSON.stringify(new Array()));
}
setInterval(newDay , 10000);

function newDay(){
    if(localStorage['newDay'] != new Date().getDate()){
        localStorage.setItem('tasksChecked', JSON.stringify(new Array()));
        $$('input[name="user_tasks"]').prop('checked', false);
        localStorage['newDay'] = new Date().getDate();
    }
}

$$('#info_1').html(info[0].title);
$$('#info_2').html(info[1].title);
$$('#info_3').html(info[2].title);
$$('#info_1_inner').html(info[0].txt);
$$('#info_2_inner').html(info[1].txt);
$$('#info_3_inner').html(info[2].txt);

$$('.info_menu_button').on('click', function(e){
    var page_info = e.target.dataset.info;
    $$('#content_info_title').html(info[page_info].title);
    $$('#content_info_img').css({
                 background: "url('" + info[page_info].img + "') no-repeat",
                 backgroundSize: "100% 100%",
                 backgroundPosition: "center"
             });
    $$('#content_info_txt').html(info[page_info].txt);
    $$('#content_info_txt').scrollTo('top', 0);
    $$('.center.info_title_inner').html(info[page_info].title);
    
    mainView.loadPage('#info_inner');
});

$$('.infoinner').on('click', function(e){
        mainView.router.back("#info_inner");
});

$$('#reset_button').on('click', function(e){
    myApp.confirm("Are you sure?", function (){
        var UserData = JSON.parse(localStorage.getItem("HealthyBody_userData"));
        $$('#user_age').val(UserData.user_age + " years");
        $$('#user_growth').val(UserData.user_growth + " cm");
        $$('#user_weight').val(UserData.user_weight + " kg");

        Count=0;
        test_quest();
        
        $$('.test_question_num').html(Count + 1 + "/10");
        localStorage.clear();
        
        mainView.loadPage('#enter_data');
	});
});


myApp.init();