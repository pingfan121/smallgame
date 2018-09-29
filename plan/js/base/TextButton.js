import sprite from './sprite'



export default class TextButton extends sprite 
{
  constructor(text, width = 0, height = 0, x = 0, y = 0) 
  {
    super("", width, height, x, y)

    this.down = false;

    this.text=text;
  }

  draw(ctx)
   {
      if (!this.visible)
        return;




    ctx.fillStyle ="#403E41";
    ctx.fillRect(
        this.x ,
        this.y ,
        this.width,
        this.height
      )

    //本局得分
    ctx.font = Math.floor(this.height / 10 * 4) + "px 宋体";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x+this.width/2, this.y+this.height/2);

    
  }
}