import Enemy from "./Enemy";

let size=40;
let jiange=3;

//敌人类
export default class TextEnemy extends Enemy {
    constructor(x, y, w, h, img, speed, hp, score, maxI, text) {

        super(x, y, w, h, img, speed, hp, score, maxI);

        this.text = text;

        this.arr = this.formatString(text,2);

        this.w=text.length==1?size:size*2;
        this.h=this.arr.length*size+(this.arr.length-1)*jiange;
    }

formatString(result, num) 
{
    var array = new Array();
    var str = result; 　

    let len = num;

     for (var i = 0; i < str.length; i+=num) 
      {
        
         if(str.length-i<num)
         {
            len=str.length-i;
         }

         let str1 = str.substr(i, len); 
         array.push(str1);

         if(len+i == str.length)
         {
            break;;
         }

      }
    return array;
}

draw(ctx)
{
    //爆炸, 切换图片
    if (this.boom) {
        this.flagI++;
        if (this.flagI == 5) {
            this.i++;
            if (this.i == this.maxI) {
                //当图片切换结束,飞机死亡
                this.isDie = true;
            }
            //重置
            this.flagI = 0;
        }
    }

    // ctx.fillStyle = 'black';
    // ctx.fillRect(
    //     this.x,
    //     this.y,
    //     this.w,
    //     this.h
    //   );

      ctx.fillStyle = 'blue';
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';

      let a=parseInt(size*(this.maxI-this.i)/this.maxI);
      if(a>0)
        {
            this.arr.forEach((item,index)=>{
                //画文字
                ctx.font = a+"px 微软雅黑";
          
                ctx.fillText(item, this.x+this.w/2, this.y+(size+jiange)*index+size/2);
           })
        }

   

   
}
move()
{
    this.y += this.speed;
}

}
