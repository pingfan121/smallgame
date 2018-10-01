import Hero from './Hero'
import RandObj2 from './RandObj2'
import Sprite from '../base/sprite';
import Button from '../base/Button';


let that = null;

let gamescore = 0;

let proptime=5000;

let hero=null;


let randobj =null;

let timeout=null;
let timeout2=null;

let enemies=[];
let props=[];

export default class GamePage extends Sprite {

  constructor() {

    super();

    that = this;

    //定义一些常量
    hero = new Hero(this);
    randobj = new RandObj2(this);
    this.initEvent();

    this.gametime=0;


    this.hide();
  }



  start() 
  {
    enemies = [];  //所有的敌人
    props = [];     //所有的道具
    hero.init();

    randobj.setTextArr(window.main.getTextEnemyArr());

    gamescore = 0;       //游戏得分
    that.gametime=0;

    //播放背景音乐
    window.getmusic().playBGM();

    //设置计时器
    timeout2 = setInterval(function () {
      if(window.playflag==true)
      {
        that.gametime += 1;
      }
      
    }, 1000);

    this.show();

  }

  addscore(val)
  {
    gamescore += val;
  }

  gameOver() 
  {
    window.getmusic().stopBGM();
    clearInterval(timeout2);
    window.main.gameOver(gamescore);
  }

  //碰撞检测
  //两个矩形碰撞检测
  crash(obj1, obj2) 
  {
    //两个物体上下左右的位置
    var left1 = obj1.x;
    var right1 = obj1.x + obj1.w;
    var top1 = obj1.y;
    var bottom1 = obj1.y + obj1.h;
    var left2 = obj2.x;
    var right2 = obj2.x + obj2.w;
    var top2 = obj2.y;
    var bottom2 = obj2.y + obj2.h;

    //判断是否发生碰撞
    if (right1 < left2 || bottom1 < top2 || left1 > right2 || top1 > bottom2) {
      return false;
    }
    else {
      return true;
    }
  }

  justify()
   {
    //道具和英雄
    for (var i = 0; i < props.length; i++)
     {
      if (hero.boom) 
      {
        continue;
      }
      if (!this.crash(props[i], hero)) 
      {
        continue;
      }
      //发生碰撞
      if (props[i].type)
       { //双排子弹
        hero.armType = 1;
        //清除之前的定时器
        clearTimeout(timeout);
        //双排子弹持续5秒
        timeout = setTimeout(function () {
          hero.armType = 0;
        }, proptime);
      }
      else 
      { //炸弹
        //所有飞机爆炸
        for (var j = 0; j < enemies.length; j++) 
        {
          enemies[j].boom = true;
          //计分
          this.addscore(enemies[j].score);
        }
      }
      //修改道具状态为使用
      props[i].isUsed = true;
    }

    //子弹(hero.bullets)和敌机(enemies)
    for (var i = 0; i < enemies.length; i++) {
      for (var j = 0; j < hero.bullets.length; j++) {
        if (enemies[i].boom) {
          break;
        }
        //检测是否发生碰撞
        if (!this.crash(enemies[i], hero.bullets[j])) {
          continue;
        }
        //发生碰撞💥
        //1.掉血
        enemies[i].hp -= hero.bullets[j].hurt;
        //2.判断敌机是否死亡
        if (enemies[i].hp <= 0) {
          enemies[i].boom = true;
          //计分
          this.addscore(enemies[i].score);

          //判断飞机类型
          switch (enemies[i].score) {
            case 100:
              window.getmusic().play(1);
              break;
            case 500:
            window.getmusic().play(2);
              break;
            case 1000:
            window.getmusic().play(3);
              break;
            default:
              break;
          }
        }
        //3.子弹消失
        hero.bullets.splice(j, 1);
        j--;
      }
    }

    //敌机和英雄
    for (var i = 0; i < enemies.length; i++) 
    {
      
      if (hero.boom == true) {
        break;
      }
      //如果敌机已经爆炸, 不做碰撞检测
      if (enemies[i].boom) {
        continue;
      }

      if (this.crash(enemies[i], hero)) {
        //英雄爆炸
        hero.boom = true;
        window.getmusic().play(5);
        break;
      }
    }
  }




  //游戏主程序

  draw(ctx) {


    if(this.visible==false)
    {
      return;
    }

      //画英雄
    hero.draw(ctx);

      //suiji敌机
      var enemy = randobj.getEnemy();
      if (enemy != null) {
        enemies.push(enemy);
      }

      //移动敌机
      for (var i = 0; i < enemies.length; i++) {
        //判断飞机是否超出屏幕
        if (enemies[i].y >= canvas.height || enemies[i].isDie) {
          //删除飞机
          enemies.splice(i, 1);
          //数组中删除某个元素, 为了保证相邻的下一个元素能够遍历到, 需要i--
          i--;
        } else {
          enemies[i].move();
          enemies[i].draw(ctx);
        }
      }

      //显示游戏时间
      //显示积分
      ctx.font = "30px serif";
      ctx.textAlign = "left";
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      //ctx.fillText("时间:" + gametime + "秒", 10, 40);

      ctx.fillText("积分:" + gamescore, 10, 35);




      var prop = randobj.getProp();
      if (prop != null) {
        props.push(prop);
      }

      //移动道具
      for (var i = 0; i < props.length; i++) {
        //当道具超出屏幕, 或者道具被使用
        if (props[i].y >= canvas.height || props[i].isUsed) {
          props.splice(i, 1);
          i--;
        } else {
          props[i].move();
          props[i].draw(ctx);
        }
      }

      if (!hero.boom) {
        //检测
        this.justify();
      }
  }



  /**
 * 玩家响应手指的触摸事件
 * 改变战机的位置
 */
  initEvent() {
    let that = this;
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      // if(playflag==false)
      // {
      //   return;
      // }


      //1.手指的位置
      var x = e.touches[0].clientX * window.s_scale
      var y = e.touches[0].clientY * window.s_scale
      //2.判断是否选中飞机
      if (x >= hero.x && x <= hero.x + hero.w && y >= hero.y && y <= hero.y + hero.h) {
        //选中飞机, 才能移动

        //飞机的中心在鼠标的位置
        hero.x = x - hero.w / 2;
        hero.y = y - hero.h / 2;
        hero.touched = true;

      }

    }));

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      // if(playflag==false)
      // {
      //   return;
      // }

      if (hero.touched == false) {
        return;
      }

      let x = e.touches[0].clientX * window.s_scale
      let y = e.touches[0].clientY * window.s_scale

      //飞机的中心在鼠标的位置
      hero.x = x - hero.w / 2;
      hero.y = y - hero.h / 2;

    }));

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      // if(playflag==false)
      // {
      //   return;
      // }

      hero.touched = false;
    }));
  }

}

