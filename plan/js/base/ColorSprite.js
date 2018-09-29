import sprite from './sprite'


export default class ColorSprite extends sprite
{
  constructor(color = 'white', width = 0, height = 0, x = 0, y = 0)
   {
    super("", width, height, x, y)

    this.color=color;

    this.btnclick=null;

    this.down=false;
    this.initEvent();
   }

  initEvent() 
  {
    let that=this;
    
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      if(that.visible==false)
      {
        return ;
      }
      
      //1.手指的位置
      var x = e.touches[0].clientX * window.s_scale ;
      var y = e.touches[0].clientY * window.s_scale ;

      if (that.isin(x, y) == true) {
        that.down = true;
      }

    }));

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()
      if (that.visible == false) {
        return;
      }

      let x = e.touches[0].clientX * window.s_scale
      let y = e.touches[0].clientY * window.s_scale

      if (that.down == true) {
        if (that.isin(x, y) == false) {
          that.down = false;
        }
      }

    }));

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      if (that.visible == false) {
        return;
      }

      if (that.down == true)
       {
        
        if(that.btnclick!=null)
        {
          that.btnclick(e);
        }
      }
      that.down = false;
    }));
  }


   //画背景

   draw(ctx)
   {
       if (!this.visible)
         return;



       ctx.fillStyle = this.color;


       ctx.fillRect(
         this.x,
         this.y,
         this.width,
         this.height
       );

   }

  //  yjjx(ctx,x,y,w,h,r)
  //   {
  //   ctx.beginPath();
  //   ctx.moveTo(x+r, y);
  //   ctx.arcTo(x+w, y, x+w, y+h, r);
  //   ctx.arcTo(x+w, y+h, x, y+h, r);
  //   ctx.arcTo(x, y+h, x, y, r);
  //   ctx.arcTo(x, y, x+w, y, r);
  //   // this.arcTo(x+r, y);
  //   ctx.closePath();
  //   ctx.stroke();   
  //   }
}