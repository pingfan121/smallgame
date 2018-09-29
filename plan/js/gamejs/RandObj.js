import Prop from './Prop'
import Enemy from './Enemy'


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


export default class RandObj
 {
    constructor(main)
     {
             this.main=main;
    }

    random(x, y) {
        return parseInt(Math.random() * (y - x + 1) + x);
    }

    //获取敌机对象
    getEnemy() {
        //控制飞机产生的概率
        var num = this.random(1, 1000);

        if (num <= 50) {
            if (num <= 40) { //小飞机
                //随机位置
              var randomX = this.random(0, canvas.width - plan1_w);

                var max = 10;

                if (this.main.gametime < 10) {
                    max = 5;
                }
                else if (this.main.gametime < 20) {
                    max = 6;
                }
                else if (this.main.gametime < 30) {
                    max = 7;
                }
                else if (this.main.gametime < 50) {
                    max = 10;
                }
                else if (this.main.gametime < 100) {
                    max = 11;
                }
                else if (this.main.gametime < 150) {
                    max = 12;
                }
                //随机速度
                var randomSpeed = this.random(2, max);
                //创建小飞机
                var enemy = new Enemy(randomX, -plan1_h, plan1_w, plan1_h, enemyImg1, randomSpeed, 1, 100, 5);
                //记录飞机
                return enemy;
            }
            else if (num <= 48) { //中型飞机
                //随机位置
              var randomX = this.random(0, canvas.width - plan2_w);

                var max = 6;
                var min = 2;

                if (this.main.gametime < 10) {
                    max = 4;
                }
                else if (this.main.gametime < 20) {
                    max = 5;
                    min = 3;
                }
                else if (this.main.gametime < 50) {
                    max = 6;
                }
                else if (this.main.gametime < 100) {
                    max = 7;
                    min = 4;
                }
                else if (this.main.gametime < 200) {
                    max = 8;
                }
                //随机速度
                var randomSpeed = this.random(2, max);
                //创建中型飞机
              var enemy = new Enemy(randomX, -plan2_h, plan2_w, plan2_h, enemyImg2, randomSpeed, 5, 500, 6);
                //记录飞机
                return enemy;
            }
            else {
                //大型飞机
                //随机位置
              var randomX = this.random(0, canvas.width - plan3_w);

                var max = 5;
                var min = 2;

                if (this.main.gametime < 10) {
                    max = 3;
                }
                else if (this.main.gametime < 20) {
                    max = 4;
                }
                else if (this.main.gametime < 30) {
                    max = 5;
                }
                else if (this.main.gametime < 50) {
                    max = 6;
                    min = 3;
                }
                else if (this.main.gametime < 100) {
                    max = 7;
                    min = 4;
                }
                else if (this.main.gametime < 200) {
                    max = 8;
                }
                //随机速度
                var randomSpeed = this.random(min, max);
                //创建小飞机
              var enemy = new Enemy(randomX, -plan3_h, plan3_w, plan3_h, enemyImg3, randomSpeed, 10, 1000, 10);
                //记录飞机
                return enemy;
            }
        }
        return null;
    }

    //随机产生道具
    getProp() {
        //控制道具产生的概率
        if (this.random(1, 1000) <= 5) {
            var randomX = this.random(0, canvas.width - 38);
            var randomType = this.random(0, 1);
            var randomSpeed = this.random(3, 8);
            var prop = new Prop(randomX,randomType, randomSpeed);

            return prop;
        }
        return null;
    }


}



