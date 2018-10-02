

//sharedCanvas = wx.getSharedCanvas();
window.g_width = sharedCanvas.width;
window.g_height = sharedCanvas.height;

window.v_width=sharedCanvas.width;

//window.s_scale = g_width / v_width ;

window.v_height = sharedCanvas.height;

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

