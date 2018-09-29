
let musicNames = ["bullet.mp3", "enemy1_down.mp3", "enemy2_down.mp3", "enemy3_down.mp3", "game_music.mp3", "game_over.mp3"];

let musics = [];

window.musicflag=true;

class Music
{
  constructor()
   {
    for (var i = 0; i < musicNames.length; i++) {
      var music = wx.createInnerAudioContext();
      music.src = "audio/" + musicNames[i];
      musics.push(music);
    }
  }

  //播放背景音乐
  playBGM()
  {
    if(window.musicflag==false)
    {
      return ;
    }
    musics[4].loop=true;
    musics[4].volume=0.5;
    musics[4].play();
  }
  
  stopBGM()
  {
    musics[4].pause();
  }

  //暂停音乐
  stopMusic()
  {
    musics[4].pause();

    window.musicflag=false;
  }

  startMusic()
  {
    musics[4].play();
    window.musicflag=true;
  }


  play(index)
  {
    if(window.musicflag==false)
    {
      return ;
    }
    musics[index].play();
  }



  loop(index,flag)
  {
    musics[index].loop=flag;
  }

  volume(index,val)
  {
    musics[index].volume = val;
  }
}

let musicmanges = new Music();

export default function()
{
  return musicmanges;
}