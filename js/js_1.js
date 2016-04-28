// last version 2016-02-09

var formData;
var Count=0;
var SumAnswers=0;
var bmi;
var num_difference;

// подключаем библиотеку фреймворка
var myApp = new Framework7({
    modalTitle: "Healthy Body",
	init: false,
  	fastClicks: true
});
var $$ = Dom7;

// определяем видимые области (первая страница)
var mainView = myApp.addView('#view-main', {
        dynamicNavbar: true,
        domCache: true,
    });
    
// загружаем всю страницу и функционал
document.addEventListener('DOMContentLoaded', function(){
    // проверка на случай вторичного запуска
    if(localStorage["HealthyBody_userData"]){
        // парсим сохраненное в LocalStorage
        var UserData = JSON.parse(localStorage.getItem("HealthyBody_userData"));
        // если счет биовозраста не нулевой, значит есть данные к работе
        if(UserData.bio_age !== ""){
            UserData.user_age; // возраст юзера
            UserData.user_growth; //рост юзера
            UserData.user_weight; //вес юзера
            // UserData.test_variants; // ключ к блоку с заданиями для юзера (номер порядковый к блоку в bmi_test)
            UserData.bio_age; // значение биовозраста
            UserData.SumAnswers; //кол-во баллов по тесту
            
            //вычисляем bmi (обращаясь к функции вне этого метода)
            bmi = calculate_bmi(UserData.user_growth, UserData.user_weight);
            // console.log("bmi " + bmi);
            
            // вычисляем разницу в возрасте
            num_difference = result_differ(UserData.user_age, UserData.bio_age);
            // console.log("num_difference " + num_difference);
            
            mainView.loadPage('#user_home');
                $$('#bmi_count_data').html("BMI Results: " + bmi.toFixed(2));
                $$('#real_age').html("Your Age: " + UserData.user_age);
                $$('#Biometrical_age').html("Your Biological Age: " + UserData.bio_age);
                $$('#result_comments').html(num_difference);
                $$('#circle_user_age').html(UserData.user_age + "<br>" + "years");
                $$('#circle_user_biomAge').html(UserData.bio_age + "<br>" + "years");
                
                var realAgePercent = UserData.user_age * 100 / 130;
                // console.log("realAgePercent " + realAgePercent);
                var BioAgePercent = UserData.bio_age * 100 / 130;
                // console.log("BioAgePercent " + BioAgePercent);
                
                // отрисовываем прогрессбар реального возраста
                $$ ('#ProgBar_realAge').css({
                    width: realAgePercent + "%" //видимость = 0
                });
                
                // отрисовываем прогресс-бар биометрического возраста
                $$ ('#ProgBar_BioAge').css({
                    width: BioAgePercent + "%"//видимость = 0
                });
        }else{
            // если LocalStorage пуст, то загружаем первую страницу
            mainView.loadPage('#Welcome');
    }
    }
            // подгружаем первую страницу
            $$('#Welcome').html(Welcome);
            $$('#start_test').on('click', function(){
                mainView.loadPage('#enter_data'); 
            });
            
            // подключаем функцию пикеров(для возраста, веса и роста) из файла Pickers.js
            Three_pickers_ready();
            
            // подгружаем вторую страницу по нажатию на клавишу Start
            $$('#next-test').on('click', function(){
                formData = {
                    user_age: $$('#user_age').val().split(' ')[0],
                    user_growth: $$('#user_growth').val().split(' ')[0],
                    user_weight: $$('#user_weight').val().split(' ')[0],
                    bio_age: ""
                }
            // проверка на верность введенных данных, алерт в случае, если пусто или 0
                if(formData.user_age == "" || formData.user_age == 0){
                    // console.log("formData.user_age" + formData.user_age);
                    myApp.alert('Your age is required');
                    return;
                }else if(formData.user_growth == "" || formData.user_growth == 0){
                    // console.log("formData.user_growth" + formData.user_growth);
                    myApp.alert('Your Growth is required');
                    return;
                }else if (formData.user_weight == "" || formData.user_weight == 0){
                    // console.log("formData.user_weight" + formData.user_weight);
                    myApp.alert('Your Weight is required');
                    return;
                } else{
                    // console.log("SAVED");
                }
                    
                // сохранение в ЛокалСторадждждж
                localStorage.setItem("HealthyBody_userData", JSON.stringify(formData));
                
                bmi = calculate_bmi(formData.user_growth, formData.user_weight);
                mainView.loadPage('#test_page');
                //выводим данные, обрезая до двух символов после запятой
                $$('#bmi_count_data').html("Count BMI: " + bmi.toFixed(2));
                // console.log("bmi.toFixed(2) " + bmi.toFixed(2));
                
            });

            // запускаем третью страницу с тестом и ответами юзера
            test_quest();
            
            // прописываем навигацию постранично
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
// шаффлим варианты ответов, подвязывая к подсчетам
function test_quest (){
    var array_id_answer = [0, 1, 2, 3]; //массив ответов
    var shuffle_answer = shuffle_Array(array_id_answer); //момент шаффла
    $$('#test_question').html(bmi_test[Count].title); //подбираем вопрос
    //подвязываем картинку к вопросу
    $$ ('#test_picture').css({
                 background: "url('" + bmi_test[Count].img + "') no-repeat",
                 backgroundSize: "100% 100%",
                 backgroundPosition: "center"
             })
    //считаем вопросы
    console.log("count " + Count);
    $$('.test_question_num').html(Count + 1 + "/10");
    // отрисовываем тест на странице
    $$('#answer_variant_1').html(bmi_test[Count].answers[shuffle_answer[0]]);
    $$('#answer_variant_2').html(bmi_test[Count].answers[shuffle_answer[1]]);
    $$('#answer_variant_3').html(bmi_test[Count].answers[shuffle_answer[2]]);
    $$('#answer_variant_4').html(bmi_test[Count].answers[shuffle_answer[3]]);
    
    // выполняем рассчет баллов на каждый из шаффл-расположенных ответов
    $$('#answer_variant_1').attr('data-point', shuffle_answer[0]);
    $$('#answer_variant_2').attr('data-point', shuffle_answer[1]);
    $$('#answer_variant_3').attr('data-point', shuffle_answer[2]);
    $$('#answer_variant_4').attr('data-point', shuffle_answer[3]);
};


// функция шаффла ответов на вопросы теста
function shuffle_Array(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// собираем с HTML все выбранные ответы
$$('.buttonTest').on('click', function(e){
    //суммируем кол-во баллов по ответам, превращая данные в int
    SumAnswers += e.target.dataset.point * 1; 
    //счетчик вопросов увеличивается
    Count++;
    // console.log("Count " + Count);
    // парсим занчения из localStorage
    var userData = JSON.parse(localStorage.getItem("HealthyBody_userData"))
    // присваиваем данному элементу массива значение, полученное из теста
    userData.SumAnswers = SumAnswers;
    // обновляем данные по позиции в LocalStorage
    localStorage.setItem("HealthyBody_userData", JSON.stringify(userData));
        
    //проверка на количество кликов
    if(Count==10){
        //как только проходят 10 вопросов из 10..
        // console.log("Count " + Count);
        // запрашиваем имеющиеся данные по тесту и
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
        //   console.log("count_bio_age " + count_bio_age);
          
        //   вносим данные по биовозрасту в localStorage
        // парсим значения из localStorage
        var userData = JSON.parse(localStorage.getItem("HealthyBody_userData"))
        // присваиваем данному элементу массива значение, полученное из теста
        userData.bio_age = count_bio_age;
        // обновляем данные по позиции в LocalStorage
        localStorage.setItem("HealthyBody_userData", JSON.stringify(userData));
          
          
        //   вычисляем разницу между реальным и биовозрастом юзера
          var num_difference = result_differ(formData.user_age, userData.bio_age);
        //   console.log("num_difference " + num_difference);
          
          mainView.loadPage('#user_home'); //загружаем страницу с результатами
          $$('#real_age').html("Your Age: " + formData.user_age);
          $$('#result_comments').html(num_difference);
          $$('#Biometrical_age').html("Your Biological Age: " + count_bio_age);
          $$('#circle_user_age').html(formData.user_age + "<br>" + "years");
          $$('#circle_user_biomAge').html(count_bio_age + "<br>" + "years");
          
          //   высчитать процент formData.user_age от 130 и запилить переменную ниже
         var realAgePercent = formData.user_age * 100 / 130;
        //  console.log("realAgePercent " + realAgePercent.toFixed(2));
         var BioAgePercent = count_bio_age * 100 / 130;
        //  console.log("BioAgePercent " + BioAgePercent.toFixed(2));
        
         $$ ('#ProgBar_realAge').css({
             width: realAgePercent + "%" //видимость = 0
         });
         
        //  высчитать процент count_bio_age от 130 и запилисть переменную ниже
          $$ ('#ProgBar_BioAge').css({
             width: BioAgePercent + "%"//видимость = 0
         });
          
    } else{
         //ограничиваем повторные клики до обновления информации
         document.documentElement.style.pointerEvents = "none";
         //исчезает страница (становится невидимой), обращаемся в CSS
         $$ ('.evanescence').css({
             opacity:0 //видимость = 0
         });
         //возвращение элемнтов на экран
         var timer = setTimeout(function () {
            //возвращаем видимость данным на экране. обращаемся в CSS
             test_quest();
             $$ ('.evanescence').css({
                 opacity: 1
             })
         }, 500);
         // блокируем возможность клика по вариантам ответа на 1 секунду
         var block_click = setTimeout(function() {
             document.documentElement.style.pointerEvents = "auto";
         },1000);
    }
});

//вычисляем bmi
function calculate_bmi (height, weight){
    var growth_metres = height/100; //сантиметры превращаем в метры
    bmi = weight / (growth_metres * growth_metres); //высчитываем BMI
    return bmi;
}

//вычисляем биометрический возраст
function Biometr_age(user_age){
//    парсим из LocalStorage данные по возрасту юзера
    var a = JSON.parse(localStorage.getItem("HealthyBody_userData"))
    var i = a.SumAnswers*1 + user_age*1;
    return i;  
}
//вычисляем разницу между биовозрастом и реальным и на этой основе отрисовываем задания с чекбоксами
function result_differ (user_age, bio_age){
    var num = 0;
    var a = bio_age*1 - user_age*1;
    // рассчитываем выбор строковых данных из доп-файла bmi_test.js
    if(a <= 0){
        num=0;
    } else if(a >= 1 && a <= 10){
        num = 1;
    } else if(a >= 11 && a <= 20){
        num = 2;
    } else {
        num = 3;
    }
    // console.log("num " + num);
    
    // подтягиваем строку из bmi_test.js
    var num_difference = Tasks_variants[num][0];
    // console.log("num_difference " + num_difference);
    // console.log("Tasks_variants[num].length " + Tasks_variants[num].length);
    
    // генерим поля с инфой и чекбоксами
    var result_html_string = "";
    // отрисовываем каждую позицию кодом html
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
    
    // формируем функцию сохранения чек-боксов
    $$('input[name="user_tasks"]').on('change', function(e){
        var t = JSON.parse(localStorage.getItem('tasksChecked'));
        var r = t.indexOf($$(this).val()) // r - indexOf (то, что он возвращает)
        if( r < 0) {
            t.push($$(this).val());
        }else{
            t.splice(r, 1);
        }
        // сохраняем отдельный массив в localStorage
        localStorage.setItem('tasksChecked', JSON.stringify(t));
	});
    return num_difference;
}
// проверка отмеченных чек-боксов при отображении страницы
$$('#tab_2').on('click', function(e){
    var check = JSON.parse(localStorage.getItem('tasksChecked'))
    // console.log("check " + check);
    for(var i=0; i<check.length; i++ ){
        // console.log($$('#' + check[i]));
        $$('#' + check[i]).prop('checked', true)
    }
})
// обновление данных по задачкам юзера при наступлении следующего дня
if(!localStorage['newDay']){
    // берем с системы девайса дату
	localStorage['newDay'] = new Date().getDate();
    // заводим в localStorage еще один массив данных
    localStorage.setItem('tasksChecked', JSON.stringify(new Array()));
}
setInterval(newDay , 10000);

function newDay(){
    // берем новую дату, если она не совпадает с данными, уже сохраненными, то..
    if(localStorage['newDay'] != new Date().getDate()){
        // размещаем новый массив в ту же ячейку localStorage
        localStorage.setItem('tasksChecked', JSON.stringify(new Array()));
        // стираем все ранее отмеченные чек-боксы в задачках для юзера
        $$('input[name="user_tasks"]').prop('checked', false);
        // сохраняем массив с новой датой
        localStorage['newDay'] = new Date().getDate();	
    }
    
}
// Info Page
// подгружаем заголовки чтоб отрисовать меню инфы
$$('#info_1').html(info[0].title);
$$('#info_2').html(info[1].title);
$$('#info_3').html(info[2].title);
$$('#info_1_inner').html(info[0].txt);
$$('#info_2_inner').html(info[1].txt);
$$('#info_3_inner').html(info[2].txt);

// выбор кнопки меню инфы
$$('.info_menu_button').on('click', function(e){
    // клик на любой из трех окон FAQ берем данные c HTML
    var page_info = e.target.dataset.info;
    // console.log("e.target " + e.target);
    // прописываем данные и текстовичка для отрисовки страницы FAQ
    $$('#content_info_title').html(info[page_info].title);
    // отрисовываем картинку
    $$('#content_info_img').css({
                 background: "url('" + info[page_info].img + "') no-repeat",
                 backgroundSize: "100% 100%",
                 backgroundPosition: "center"
             });
    // берем данные текстовичка - основной текст
    $$('#content_info_txt').html(info[page_info].txt);
    // поднимаем скролл всегда вверх
    $$('#content_info_txt').scrollTo('top', 0);
    // название инфо-блока прописываем в NavBar
    $$('.center.info_title_inner').html(info[page_info].title);
    
    // переход на страницу с ответом на FAQ
    mainView.loadPage('#info_inner');
});

$$('.infoinner').on('click', function(e){
        mainView.router.back("#info_inner");
});

$$('#reset_button').on('click', function(e){
    myApp.confirm("Are you sure?", function (){
        //спарсить локалсторадж 
        var UserData = JSON.parse(localStorage.getItem("HealthyBody_userData"));
        // если счет биовозраста не нулевой, значит есть данные к работе
        // var a = UserData.user_age;
        // var g = UserData.user_growth;
        // var w = UserData.user_weight;
        
        $$('#user_age').val(UserData.user_age + " years");
        console.log(UserData.user_age + " years");
        $$('#user_growth').val(UserData.user_growth + " cm");
        console.log(UserData.user_growth + " cm");
        $$('#user_weight').val(UserData.user_weight + " kg");
        console.log(UserData.user_weight + " kg");
        
        // localStorage.remove('newDay');
        // localStorage.remove('tasksChecked');
        // localStorage.remove('HealthyBody_userData');
        // UserData.bio_age = "";
        Count=0;
        test_quest();
        
        $$('.test_question_num').html(Count + 1 + "/10");
        // localStorage.setItem("HealthyBody_userData", JSON.stringify(UserData));
        localStorage.clear();
        
        // UserData.user_age = a;
        // UserData.user_growth = g;
        // UserData.user_weight = w;
        
        
        
        mainView.loadPage('#enter_data');
	});
});


myApp.init();