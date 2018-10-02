
import getmusic from './Music'

window.getmusic = getmusic;



window.g_width = canvas.width;
window.g_height = canvas.height;
window.s_scale = 750 / g_width;

canvas.width = 750;
canvas.height = g_height * window.s_scale;

//飞机的缩放比
window.flyscale = window.s_scale;

let openDataContext = wx.getOpenDataContext()
let sharedCanvas = openDataContext.canvas;
sharedCanvas.width=canvas.width
sharedCanvas.height=canvas.height

window.isSameWeek=function(old,now)
{
    var oneDayTime = 1000*60*60*24;
    var old_count =parseInt(old.getTime()/oneDayTime);
    var now_other =parseInt(now.getTime()/oneDayTime);
    return parseInt((old_count+4)/7) == parseInt((now_other+4)/7);
}
window.sliceText=function(text)
{
    try
    {
        if(text.length<=7)
        {
            return text;
        }
        else
        {
            return text.substr(0,5)+"...";
        }
    }
    catch(e)
    {
        return "";
    }
   
}
