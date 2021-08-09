function calc_minute(second)
{
  let minute = Math.floor(second/60);
  second = second % 60;
  minute += '';
  second += '';
  minute = (minute.length == 1)? "0"+minute: minute;
  second = (second.length == 1)? "0"+second: second
  return minute + ":" + second;
}

function abbr_play_num(num)
{
  if (num > 1e4)
    return (num/1e4).toFixed(1)+'万';
  else
    return num+'';
}

// TODO: add img automatically 
function create_mask_img()
{
  let mask = document.createElement("img");
  mask.src = "img/cover_play.png";
  // The following list is a parent div class btn list
  cover_list = ["video", "song-cover", "mv-cover"];
  for (let cls of cover_list)
  {
    let c_list = document.getElementsByClassName(cls);
    
    for (let i=0; i<c_list.length; i++)
    {
      // c_list[i].appendChild(mask);
      c_list[i].innerHTML += "<img src='"+mask.src+">'";
    }
  }
}

function ready()
{
  var url = "task.json";
  var request = new XMLHttpRequest();
  request.open("get", url);
  request.send(null);
  request.onload = function ()
  {
    if (request.status == 200)
    {
      // create_mask_img();
      var json = JSON.parse(request.responseText);
      for (var i=0; i<json["playlist"].length; i++)
      {
        let cover = json["playlist"][i]["cover"];
        let title = json["playlist"][i]["title"];
        let listen_num = json["playlist"][i]["listen_num"]; 
        listen_num /= 1e4;
        listen_num = listen_num.toFixed(1);
        document.getElementsByClassName("cover")[i].src = cover;
        document.getElementsByClassName("album-title")[i].innerHTML = title;
        document.getElementsByClassName("play-number-count")[i].innerHTML = listen_num;
        document.getElementsByClassName("play-title")[i].innerHTML = "播放量：";
        document.getElementsByClassName("play-unit")[i].innerHTML = "万";
      }
      for (let i=0; i<json["songlist"].length; i++)
      {
        let second = json["songlist"][i]["interval"];
        let time = calc_minute(second);
        let singer = json["songlist"][i]["singer"].join(" / ");
        let abbr = json["songlist"][i];
        let title = (abbr["subtitle"])? abbr["name"]+ " "
          + abbr["subtitle"] : abbr["name"];
        let cover = abbr["cover"];
        let div_list = ["song-cover", "song-title", 
          "song-singer", "interval"];
        let val_list = [cover, title, singer, time];
        for (let j=0; j<div_list.length; ++j)
        {
          if (j===0) 
          {
            let t = document.getElementsByClassName(div_list[j])[i];
            t.getElementsByTagName("img")[0].src = val_list[j];
          }            
          else 
            document.getElementsByClassName(div_list[j])[i].innerHTML
              = val_list[j];     
        }        
      }
      let logo = "img/video.svg";
      for (let i=0; i<json["mvlist"].length; i++)
      {
        let abbr = json["mvlist"][i];
        title = abbr["title"];
        singer = abbr["singer"];
        listen_num = abbr["listen_num"];
        listen_num = abbr_play_num(listen_num);
        cover = abbr["cover"];
        let t = document.getElementsByClassName("mv-cover")[i];
        t.getElementsByTagName("img")[0].src = cover;
        let p = document.getElementsByClassName("mv-logo")[i];
        p.getElementsByTagName("img")[0].src = logo;
        let div_list = ["mv-title", "mv-author", "mv-play-num"];
        let val_list = [title, singer, listen_num];
        for (let j=0; j<div_list.length; ++j)
        {
          document.getElementsByClassName(div_list[j])[i].innerHTML
            = val_list[j];
        }

      }
    }
  }
} 
document.addEventListener("DOMContentLoaded", ready) 