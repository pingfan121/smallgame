export default class Bullet
 {

  constructor(x, y, w, h, img, hurt) {
    //属性
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.hurt = hurt; //伤害
  }

  //绘制方法
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  //移动方法
  move() {
    this.y -= 15;
  }
}