//背景图对象(只有一个)



export default class Background
{

    constructor()
    {
        //属性
        this.x = 0;
        this.y = 0;

       this.bgImage = new Image();
       this.bgImage.src = "images/background.png";
    }
    
    draw(ctx)
    {
        var row = Math.ceil(canvas.height / 568);
        var col = Math.ceil((canvas.width + 40) / 320);
        //2.循环添加图片
        //为了保证图片无限滚动, 画两张一样的背景图
        for (var i = -row; i < row; i++) { //行
            for (var j = 0; j < col; j++) { //列
                ctx.drawImage(this.bgImage, 320 * j - 20, 568 * i + this.y);
            }
        }
        this.move();
    }

    move()
    {
        this.y++;
        //判断一张图片滚动完成, 重置位置
        var row = Math.ceil(canvas.height / 568);
        if (this.y == row * 568) {
            this.y = 0;
        }
    }

}
