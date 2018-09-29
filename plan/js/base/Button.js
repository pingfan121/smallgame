import sprite from './sprite'


export default class Button extends sprite
{
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0)
   {
    super(imgSrc, width, height, x, y)

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


   //画按钮

   draw(ctx)
   {
    if (!this.visible)
    return;

     if(this.down==false)
     {
       super.draw(ctx);
     }
     else
     {
      
       ctx.drawImage(
         this.img,
         this.x + this.width/10/2,
         this.y + this.height/10/2,
         this.width/10*9,
         this.height / 10 * 9
       )
     }
   }
}