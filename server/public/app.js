
//抽奖按钮
var oBtn=document.getElementById('button');
//标志位
var flag=true;
//显示中奖名单
var oBtn1=document.getElementById('button1');
//当前中奖者
var oName=document.getElementById('name');
//数组下标
var step=0;
//已经中奖者的数组下标
var confirmNum=[];
//已经中奖者名单
var confirmName="";
var obj={};
//点击开始抽奖
var timer;
oBtn.onclick=function () {

     $.ajax({
            type:'get',
            url:'http://localhost:3000/getName',
            success:function(data){
                  arr=data.split('\n');
                  console.log("arr:"+arr)
                     if (flag) {
                        //开启定时器
                        timer = setInterval(function () {
                            for (var i = 0; i < confirmNum.length; i++) {
                                //如果下标已经存在于中奖名单里则跳过
                                if (step == confirmNum[i]) {
                                    step++;
                                }
                            }
                            //显示当前中奖者
                            oName.innerHTML = arr[step];
                            console.log(step+arr[step]);
                            step = (step + 1) % (arr.length)
                        }, 50);
                    }
                    else{
                        //停止
                        step=step-1;
                        console.log(step)
                        confirmNum.push(step);
                        confirmName+=arr[step]+" ";
                        clearInterval(timer);

                    }
                    flag=!flag;

            },
            error:function(){
                console.log('error');
            }
    })

   
}

function show() {
    // for(var i=0;i<confirmName.length;i++){
    //     console.log(confirmName[i]);
    // }
    
    obj.name=confirmName;
    console.log("zhongjiang:"+obj);
    $.ajax({
        type:"get",
        url:"http://localhost:3000/save",
        data:obj,
        success:function(data){
            consol.log(data)
        },
        error:function(err){
            console.log(err);
        }
    })
}
oBtn1.onclick=function () {
    show();
}

 