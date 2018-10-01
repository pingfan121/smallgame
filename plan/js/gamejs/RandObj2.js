import Prop from './Prop'
import Enemy from './Enemy'
import TextEnemy from './TextEnemy';


//敌机图片
let enemyImg1 = new Image();
enemyImg1.src = "images/enemy1.png";
let enemyImg2 = new Image();
enemyImg2.src = "images/enemy2.png";
let enemyImg3 = new Image();
enemyImg3.src = "images/enemy3.png";

let plan1_w = 38 * flyscale;
let plan1_h = 34 * flyscale;

let plan2_w = 46 * flyscale;
let plan2_h = 64 * flyscale;

let plan3_w = 110 * flyscale;
let plan3_h = 164 * flyscale;

let gametime=0;

let interval=20;

let outarr=[40,8,2];


export default class RandObj2
 {
    constructor(main)
    {
        this.main=main;
    }


    setTextArr(arr)
    {
        this.arr=arr;
    }

    

    random(x, y) 
    {
        return parseInt(Math.random() * (y - x + 1) + x);
    }

    //获取敌机对象
    getEnemy() {
        //控制飞机产生的概率
        var num = this.random(1, this.getEnemyRand());

        if (num <= 50) 
        {
            this.getPlanRand(outarr);

            if (num <= outarr[0]) { //小飞机
                //随机位置
                var randomX = this.random(0, canvas.width - plan1_w);

                var min=5;
                var max = 15;

                var curr=min+(max-min)*this.getSpeedRand()/100;
                curr=Math.floor(curr);

                //随机速度
                var randomSpeed = this.random(min, curr);

                //创建小飞机
                var enemy = new Enemy(randomX, -plan1_h, plan1_w, plan1_h, enemyImg1, randomSpeed, 1, 100, 5);
                //记录飞机
                return enemy;
            }
            else if (num <= outarr[0]+outarr[1]) { //中型飞机
                //随机位置
                var randomX = this.random(0, canvas.width - plan2_w);

                var min=3;
                var max = 10;

                var curr=min+(max-min)*this.getSpeedRand()/100;
                curr=Math.floor(curr);

                //随机速度
                var randomSpeed = this.random(min, curr);
                    //创建中型飞机
                var enemy = new Enemy(randomX, -plan2_h, plan2_w, plan2_h, enemyImg2, randomSpeed, 5, 500, 6);
                //记录飞机
                return enemy;
            }
            else {
                //大型飞机
                //随机位置
              var randomX = this.random(0, canvas.width - plan3_w);

              var min=2;
              var max = 7;

              var curr=min+(max-min)*this.getSpeedRand()/100;
              curr=Math.floor(curr);

              //随机速度
              var randomSpeed = this.random(min, curr);
                
              var enemy = new Enemy(randomX, -plan3_h, plan3_w, plan3_h, enemyImg3, randomSpeed, 10, 1000, 10);
                //记录飞机
                return enemy;
            }
        }
        else if(num <= 55)
        {
            if(this.arr.length>0)
            {

                let index=this.random(0,this.arr.length-1);

            


                let item =this.arr[index];
                //随机一个词
                var randomX = this.random(0, canvas.width - 60);


                var min=5;
                var max = 18 - item.length;
  
                var curr=min+(max-min)*this.getSpeedRand()/100;
                curr=Math.floor(curr);
  
                //随机速度
                var randomSpeed = this.random(min, curr);
                  
                var enemy = new TextEnemy(randomX, -100, 0, 0, null, randomSpeed, item.length, item.length*100, 5,item);
                  //记录飞机
                  return enemy;
            }
        }
        return null;
    }

    //随机产生道具
    getProp() {
        //控制道具产生的概率
        if (this.random(1, this.getEnemyRand()) <= 2)
         {
            var randomX = this.random(0, canvas.width - 38);
            var randomType = this.random(0, 1);
            var randomSpeed = this.random(3, 8);
            var prop = new Prop(randomX,randomType, randomSpeed);
            return prop;
        }
        return null;
    }

    //获取产生敌机的概率
    getEnemyRand()
    {
        let gametime=this.main.gametime;
        //根据时间
        if(gametime<interval*1)
        {
            return 1000;
        }
        else if(gametime<interval*2)
        {
            return 950;
        }
        else if(gametime<interval*3)
        {
            return 900;
        }
        else if(gametime<interval*4)
        {
            return 850;
        }
        else if(gametime<interval*5)
        {
            return 800;
        }
        else if(gametime<interval*6)
        {
            return 750;
        }
        else if(gametime<interval*7)
        {
            return 700;
        }
        else if(gametime<interval*8)
        {
            return 650;
        }
        else if(gametime<interval*9)
        {
            return 600;
        }
        else if(gametime<interval*10)
        {
            return 550;
        }
        else if(gametime<interval*11)
        {
            return 500;
        }
        else
        {
            return this.random(400,600);
        }
    }

    //获取产生各种敌机的概率
    getPlanRand(arr)
    {

        let gametime=this.main.gametime;

        arr[0]=40;
        arr[1]=8;
        arr[2]=2;

        
          //根据时间
        if(gametime<interval*1)
        {
            arr[0]=40;
            arr[1]=8;
            arr[2]=2;
        }
        else if(gametime<interval*2)
        {
            arr[0]=40;
            arr[1]=7;
            arr[2]=3;
        }
        else if(gametime<interval*3)
        {
            arr[0]=45;
            arr[1]=4;
            arr[2]=1;
        }
        else if(gametime<interval*4)
        {
            arr[0]=40;
            arr[1]=7;
            arr[2]=3;
        }
        else if(gametime<interval*5)
        {
            arr[0]=40;
            arr[1]=5;
            arr[2]=5;
        }
        else if(gametime<interval*6)
        {
            arr[0]=30;
            arr[1]=17;
            arr[2]=3;
        }
        else if(gametime<interval*7)
        {
            arr[0]=30;
            arr[1]=17;
            arr[2]=3;
        }
        else if(gametime<interval*8)
        {
            arr[0]=40;
            arr[1]=6;
            arr[2]=4;
        }
        else if(gametime<interval*9)
        {
            arr[0]=40;
            arr[1]=3;
            arr[2]=7;
        }
        else if(gametime<interval*10)
        {
            arr[0]=35;
            arr[1]=10;
            arr[2]=5;
        }
        else if(gametime<interval*11)
        {
            arr[0]=25;
            arr[1]=17;
            arr[2]=8;
        }
    }


    //难度 从1 到100;
    getSpeedRand()
    {
        let gametime=this.main.gametime;

        if(gametime<interval*1)
        {
            return 30;
        }
        else if(gametime<interval*2)
        {
            return 40;
        }
        else if(gametime<interval*3)
        {
            return 50;
        }
        else if(gametime<interval*4)
        {
            return 40;
        }
        else if(gametime<interval*5)
        {
            return 40;
        }
        else if(gametime<interval*6)
        {
            return 50;
        }
        else if(gametime<interval*7)
        {
            return 60;
        }
        else if(gametime<interval*8)
        {
            return 70;
        }
        else if(gametime<interval*9)
        {
            return 40;
        }
        else if(gametime<interval*10)
        {
            return 60;
        }
        else if(gametime<interval*11)
        {
            return 80;
        }
        else
        {
            return this.random(70,100);
        }
    }


}



