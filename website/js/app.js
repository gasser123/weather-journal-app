/* Global Variables */
const baseURL="http://api.openweathermap.org/data/2.5/weather?zip=";
let zipCode="";
const appId="&appid=489ef6d0e5f591e35e1cc0b612f1e22d&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate =d.getDate()+'/'+(d.getMonth()+1)+'/'+ d.getFullYear();
//clicking the button
document.getElementById('generate').addEventListener('click',function(){
zipCode=document.getElementById('zip').value;    
const url=baseURL+zipCode+appId;
getWeather(url).then(function(info){
    console.log(info);
 const content=document.getElementById('feelings').value;   
 postData('/js',{date:newDate,temp:info.main.temp+'F',content:content}).then(updateUI());
    
});

});


//getting the current weather using API call
const getWeather=async (url='')=>{
const res=await fetch(url);
try {
  const weather=await res.json(); 
    return weather;
} catch (error) {
    console.log(error);
}

}
//post data to server
const postData=async (url='',data={})=>{
 const res=await fetch(url,{
 method:'POST',
 credentials:'same-origin',
 headers:{
 'Content-Type':'application/json'

 },
 body:JSON.stringify(data)
 });
 try {
  const newData=await res.json();
  return newData;   
 } catch (error) {
     console.log(error);
 }

}

//Updating the UI
const updateUI=async ()=>{
 const res=await fetch('/js');
 try {
 const data=await res.json();
 console.log(data);
 document.querySelector(".title").style.visibility='visible';
 document.getElementById('date').innerHTML=`<h3>Date:</h3> ${data.date}`;
 document.getElementById('temp').innerHTML=`<h3>Temperature:</h3> ${data.temp}`;
 document.getElementById('content').innerHTML=`<h3>Feelings:</h3> ${data.content}`;    
     
 } catch (error) {
     console.log(error);
 }

}

