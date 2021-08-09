// var addCssRule = function() {
//   // 创建一个 style， 返回其 stylesheet 对象
//   function createStyleSheet() {
//       var style = document.createElement('style');
//       style.t = 'text/css';
//       document.head.appendChild(style);
//       return style.sheet;
//   }

//   // 创建 stylesheet 对象
//   var sheet = createStyleSheet();

//   // 返回接口函数
//   return function(selector, rules, index) {
//       index = index || 0;
//       sheet.insertRule(selector + "{" + rules + "}", index);
//   }
// }();


function ready()
{
  let u_l = ["topCollections", "bottomCollections"];
  let usr_count = 0;
  for (let part of u_l)
  {
    for (let user in data[part])
    {
      let user_info = data[part][user]["User"];
      let name = user_info["nickname"];
      if (user_info["avatar"])
      {
        var cover = user_info["avatar"];
      }
      else
      {
        var cover = user_info["weixin_code"];
      }

      let icons = data[part][user]["icons"];
      let icon_cls = document.getElementsByClassName("icons")[usr_count];
      let pic = document.getElementsByClassName("cover")[usr_count];
      pic.getElementsByTagName("img")[0].src = cover;
      console.log(pic.getElementsByTagName("img")[0].src);
      document.getElementsByClassName("nickname")[usr_count].innerHTML
        = name;

      if (usr_count < 3)
      {
        let file = '';
        for(let icon_num=0; icon_num<icons.length; ++icon_num)
        {
         file += icons[icon_num]["show_svg"]+"\n"; 
        } 
        icon_cls.innerHTML=file;
      }
      else 
      {
      for(let icon_num=0; icon_num<icons.length; ++icon_num)
        {
          let img = document.createElement("img");
          img.src = icons[icon_num]["file"];
          img.alt = "icon";
          icon_cls.appendChild(img);
        }
      }
        
      usr_count ++;
    }
  }
}
document.addEventListener("DOMContentLoaded", ready) 