let card = document.querySelectorAll(".crd");
let play = document.createElement("img") 
for(let i=0 ;i<card.length;i++)
{ 
   card[i].addEventListener("mouseover",()=>{
  
   play.setAttribute("src","./svg/play.svg")
   play.setAttribute("class", "play");
   card[i].append(play);}
  
   
)
card[i].addEventListener("mouseleave",()=>[
         play.remove()
   ])

   
   
}