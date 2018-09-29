
//道具图片
var propImg = new Image();
propImg.src = "images/prop.png";

let prop_w=38 * flyscale;
let prop_h = 68 * flyscale;

//道具类
export default class Prop
{
    constructor(x, type, speed) 
    {
        this.x = x;
        this.y = -prop_h;
        this.w = prop_w;
        this.h=prop_h;
        this.type = type; //道具类型(0:炸弹, 1:双排子弹)
        this.speed = speed;
        this.isUsed = false; //道具有没有被使用
    }

    //方法
  draw(ctx) {
    ctx.drawImage(propImg, this.type * prop_w / flyscale, 0, prop_w / flyscale, prop_h / flyscale, this.x, this.y, prop_w, prop_h);
    }
    //移动
    move()
    {
        this.y += this.speed;
    }
   
}
