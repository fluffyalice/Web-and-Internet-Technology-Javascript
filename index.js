window.onload = function () {
  var myCanvas = document.getElementById('myCanvas');
  var btn1 = document.getElementById('btn1');
  var btn2 = document.getElementById('btn2');
  var btn3 = document.getElementById('btn3');
  var btn4 = document.getElementById('btn4');
  ctx = myCanvas.getContext('2d');
  ctx.width = 800;
  ctx.height = 600;
    color = [
        '#D24D57','#EB7347','#FC9D99','#26A65B','#AEDD81',
        '#84AF9B','#00CCFF','#D0D0D0','#2C3E50','gray'
    ];
    // coordinate x and y
  coordinate = new Array();
  WH = null;
  // 10 pictures in total
  img = [1,2,3,4,5,6,7,8,9,10];
  // Move to the picture you want
  num = null;
  document.onmousemove = function (event){
      var e = event || window.event;
      if(coordinate.length ===0){
          return;
      }

      if(
          ((coordinate[0].x < e.pageX && coordinate[0].x+120 > e.pageX) && (coordinate[0].y < e.pageY && coordinate[0].y+120 > e.pageY))||
          ((coordinate[1].x < e.pageX && coordinate[1].x+120 > e.pageX) && (coordinate[1].y < e.pageY && coordinate[1].y+120 > e.pageY))||
          ((coordinate[2].x < e.pageX && coordinate[2].x+120 > e.pageX) && (coordinate[2].y < e.pageY && coordinate[2].y+120 > e.pageY))||
          ((coordinate[3].x < e.pageX && coordinate[3].x+120 > e.pageX) && (coordinate[3].y < e.pageY && coordinate[3].y+120 > e.pageY))||
          ((coordinate[4].x < e.pageX && coordinate[4].x+120 > e.pageX) && (coordinate[4].y < e.pageY && coordinate[4].y+120 > e.pageY))
      ){
          for(var i=0;i<coordinate.length;i++){
              if(((coordinate[i].x < e.pageX && coordinate[i].x+120 > e.pageX) && (coordinate[i].y < e.pageY && coordinate[i].y+120 > e.pageY))){
                num = i;
              }
          }
          myCanvas.addEventListener("click", click,false);
      }else{
          myCanvas.removeEventListener("click", click,false);
      }
  };
  btn1.onclick = function(){
      WH = randWH();
      shuffle(img);
      coordinate = [
          {x:10,y:ctx.height/2-WH[0]/2},
          {x:WH[0]+30,y:ctx.height/2-WH[1]/2},
          {x:WH[1]+30+WH[0]+30,y:ctx.height/2-WH[2]/2},
          {x:WH[2]+30+WH[1]+30+WH[0]+30,y:ctx.height/2-WH[3]/2},
          {x:WH[3]+30+WH[2]+30+WH[1]+30+WH[0]+30,y:ctx.height/2-WH[4]/2}
      ];
      ctx.clearRect(0,0,ctx.width,ctx.height);
      drawImages(ctx,img[0],coordinate[0].x,coordinate[0].y,WH[0]);
      drawImages(ctx,img[1],coordinate[1].x,coordinate[1].y,WH[1]);
      drawImages(ctx,img[2],coordinate[2].x,coordinate[2].y,WH[2]);
      drawImages(ctx,img[3],coordinate[3].x,coordinate[3].y,WH[3]);
      drawImages(ctx,img[4],coordinate[4].x,coordinate[4].y,WH[4]);
  };

  btn2.onclick = function(){
      WH = randWH();
      shuffle(img);
      coordinate = [];
      var i = 0;
      var arr = new Array();
      for(var x=1;x<6;x++){
          for(var y=1;y<5;y++){
              arr[i] = {x:x-1,y:y-1};
              i++;
          }
      }
      shuffle(arr);
      ctx.clearRect(0,0,ctx.width,ctx.height);
      for(var j=0;j<5;j++){
          var index = getRandomNumber(arr.length-1,1);
          drawImages(ctx,img[j],arr[index].x*150,arr[index].y*150,WH[j]);
          coordinate.push({x:arr[index].x*150,y:arr[index].y*150});
          arr.splice(index,1);
      }
  };

  btn3.onclick = function(){
      WH = randWH();
      shuffle(img);
      coordinate = [
          {x:0,y:0},
          {x:ctx.width-WH[1],y:0},
          {x:0,y:ctx.height-WH[2]},
          {x:ctx.width-WH[3],y:ctx.height-WH[3]},
          {x:ctx.width/2-(WH[4]/2),y:ctx.height/2-(WH[4]/2)}
      ];
      ctx.clearRect(0,0,ctx.width,ctx.height);
      drawImages(ctx,img[0],0,0,WH[0]);
      drawImages(ctx,img[1],ctx.width-WH[1],0,WH[1]);
      drawImages(ctx,img[2],0,ctx.height-WH[2],WH[2]);
      drawImages(ctx,img[3],ctx.width-WH[3],ctx.height-WH[3],WH[3]);
      drawImages(ctx,img[4],ctx.width/2-(WH[4]/2),ctx.height/2-(WH[4]/2),WH[4]);
  };

  btn4.onclick = function () {
      ctx.clearRect(0,0,ctx.width,ctx.height);
      // WH = randWH();
      if(coordinate.length === 0){
          return;
      }
      shuffle(color);
      ctx.clearRect(0,0,ctx.width,ctx.height);
      for (var i=0;i<coordinate.length;i++){
          drawImages(ctx,img[i],coordinate[i].x,coordinate[i].y,WH[i]);
      }
  };
};


// draw picture
function drawImages(ctx,num,x,y,wh) {
    ctx.fillStyle = color[num-1];
    ctx.fillRect(x,y,wh,wh);
    ctx.clearRect(x+10,y+10,100,100);
    var img = new Image();
    img.onload = function (){
        ctx.drawImage(img,x+10,y+10,100,100);
    };
    img.src = 'images/'+num+'.jpg';
}
// create random color
function getRandomNumber(max,min) {
    let x = Math.floor(Math.random() * (max - min + 1)) + min;
    return x;
}
// randomly scrambles the array
function shuffle(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
    }
}
function click() {
    var index = getRandomNumber(9,5);
    var temp = img[num];
    img[num] = img[index];
    img[index] = temp;
    drawImages(ctx,img[num],coordinate[num].x,coordinate[num].y,WH[num]);
}
function randWH (){
    var arr = new Array();
    for (var i=0;i<5;i++){
        arr[i] = getRandomNumber(150,110);
    }
    return arr;
}