
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

