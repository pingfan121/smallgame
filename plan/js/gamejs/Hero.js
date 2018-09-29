import Bullet from './Bullet'
//英雄对
//英雄图片
var heroImg = new Image();
heroImg.src = "images/herofly.png";

//子弹图片
let bulletImg1 = new Image();
bulletImg1.src = "images/bullet1.png";

let bullet1_w = 6 * flyscale;
let bullet1_h = 14 * flyscale;



let bulletImg2 = new Image();
bulletImg2.src = "images/bullet2.png";

let bullet2_w = 48 * flyscale;
let bullet2_h = 14 * flyscale;


let hero_w = 66 * flyscale;
let hero_h = 82 * flyscale;

export default class Hero 
{

    constructor(main) 
    {
        //属性
       
        this.main=main;
    }

    init()
    {
        this.x = canvas.width / 2 - hero_w/2;
        this.y = canvas.height/10*7;
        this.w = hero_w;
        this.h = hero_h;

        this.i = 0; //第几张图片(从0开始算)
        this.flagI = 0; //图片切换的频率
        this.bullets = []; //用于记录发射出去的子弹
        this.flagShot = 0; //子弹发射频率
        this.armType = 0; //武器类型(0: 单排; 1:双排)
        this.boom = false; //是否爆炸
        this.touched=false;  //
    }

    //方法
  draw(ctx) 
  {
        //控制图片切换
        this.flagI++;
        if (this.flagI == 20) {
            if (this.boom) {
                this.i++;
                if (this.i == 10) {
                    //英雄死亡
                    this.main.gameOver();
                    this.boom = false;
                }
            } else {
                this.i = (this.i++) % 2;
            }
            //重置
            this.flagI = 0;
        }

        //把图片的某一部分画到canvas上某个区域
    ctx.drawImage(heroImg, this.i * hero_w / flyscale, 0, hero_w / flyscale, hero_h / flyscale, this.x, this.y, hero_w, hero_h);

    this.shot(ctx);
    }

    //发射子弹
  shot(ctx) {
        //爆炸后, 不能发射子弹
        if (!this.boom) {
            this.flagShot++;
        }
        if (this.flagShot == 5) {
            //播放发射子弹音乐
            getmusic().play(0);
            
            if (this.armType) {
                //创建双排子弹对象
              var bullet = new Bullet(this.x + hero_w / 2 - bullet2_w / 2, this.y, bullet2_w, bullet2_h, bulletImg2, 2);
            } else {
                //创建单排子弹对象
              var bullet = new Bullet(this.x + hero_w / 2 - bullet1_w / 2, this.y - bullet1_h/2, bullet1_w, bullet1_h, bulletImg1, 1);
            }
            //记录子弹
            this.bullets.push(bullet);
            //重置
            this.flagShot = 0;
        }

        //移动每一颗子弹
        for (var i = 0; i < this.bullets.length; i++) {
            //判断子弹是否超出屏幕
            if (this.bullets[i].y <= -this.bullets[i].h) {
                //删除子弹
                this.bullets.splice(i, 1);
                i--;
            } else {
                //移动子弹
                this.bullets[i].move();
                this.bullets[i].draw(ctx);
            }
        }

        
    }
}