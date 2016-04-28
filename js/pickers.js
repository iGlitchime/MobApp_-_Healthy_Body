function Three_pickers_ready(){
    
    var pickerDeviceAGE = myApp.picker({
        input: '#user_age',
        cols: [
            {
                values: ['0','1', '2', '3', '4', '5', '6', '7', '8', '9']
            },
            {
                values: ['0','1', '2', '3', '4', '5', '6', '7', '8', '9']
            },
            {
                divider:true,
                content:"years"
            }],
        onOpen: function (pickerWIDTH){
            $$ ('#user_age').css({
                 color: "#F88216"
             })
             },
        onClose: function (pickerAGE){
            $$ ('#user_age').css({
                 color: "#8e8e93"
             })
             
            var resAGE = "";
            if(pickerAGE.cols[0].value != 0){
                resAGE=pickerAGE.cols[0].value+pickerAGE.cols[1].value;
            } else {
                if(pickerAGE.cols[1].value != 0){
                    resAGE=pickerAGE.cols[1].value;
                }else{
                        console.log("WARNING NO AGE");
                    return;
                    }
                
            }
            // console.log("resAGE " + resAGE);
            $$('#user_age').val(resAGE + " years");
            },
        });      //завершена обработка пикера по возрасту
       
    var pickerDeviceGROWTH = myApp.picker({
        input: '#user_growth',
        cols: [{
                values: ['0','1']
            },
            {
                values: ['0','1', '2', '3', '4', '5', '6', '7', '8', '9']
            },
            {
                values: ['0','1', '2', '3', '4', '5', '6', '7', '8', '9']
            },
            {
                divider:true,
                content:"cm"
            }],
            
            onOpen: function (pickerWIDTH){
            $$ ('#user_growth').css({
                 color: "#F88216"
             })
            },
            onClose: function (pickerGROWTH){
                $$ ('#user_growth').css({
                 color: "#8e8e93"
             })
            var resGROWTH = "";
            if(pickerGROWTH.cols[0].value != 0){
                resGROWTH=pickerGROWTH.cols[0].value+pickerGROWTH.cols[1].value+pickerGROWTH.cols[2].value;
            } else {
                if(pickerGROWTH.cols[1].value != 0){
                    resGROWTH=pickerGROWTH.cols[1].value+pickerGROWTH.cols[2].value;
                }else{
                    if(pickerGROWTH.cols[2].value != 0){
                        resGROWTH=pickerGROWTH.cols[2].value;
                    }else{
                        console.log("WARNING NO GROWTH");
                    return;
                    }
                }
            }
            // console.log("resGROWTH " + resGROWTH);
            $$('#user_growth').val(resGROWTH + " cm");
            }
            
    }); //завершена обработка пикера по росту
    
    var pickerDeviceWIDTH = myApp.picker({
        input: '#user_weight',
        cols: [{
                values: ['0','1', '2']
            },
            {
                values: ['0','1', '2', '3', '4', '5', '6', '7', '8', '9']
            },
            {
                values: ['0','1', '2', '3', '4', '5', '6', '7', '8', '9']
            },
            {
                divider:true,
                content:"kg"
            }],
            
        onOpen: function (pickerWIDTH){
            $$ ('#user_weight').css({
                 color: "#F88216"
             })
            },
        onClose: function (pickerWIDTH){
            $$ ('#user_weight').css({
                 color: "#8e8e93"
             })
             
            var resWIDTH = "";
            if(pickerWIDTH.cols[0].value != 0){
                resWIDTH=pickerWIDTH.cols[0].value+pickerWIDTH.cols[1].value+pickerWIDTH.cols[2].value;
            } else {
                if(pickerWIDTH.cols[1].value != 0){
                    resWIDTH=pickerWIDTH.cols[1].value+pickerWIDTH.cols[2].value;
                }else{
                    if(pickerWIDTH.cols[2].value != 0){
                        resWIDTH=pickerWIDTH.cols[2].value;
                    }else{
                        console.log("WARNING NO WIDTH");
                    return;
                    }
                }
            }
            // console.log("resWIDTH " + resWIDTH);
            $$('#user_weight').val(resWIDTH + " kg");
            }
    });      
}