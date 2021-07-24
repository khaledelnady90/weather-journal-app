/* Global Variables */
//API credentials on OpenWeatherMap.com
let apiKey = '7d8fd33324a788c42de65a6628db30de';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// select generate button
const generate = document.querySelector('#generate')

generate.addEventListener('click', async ()=>{
  const zipCode = document.querySelector('#zip').value;
  const content = document.querySelector('#feelings').value;

  if(!zipCode){
    alert('please, Enter Your Zip Code')
    return
  }
  //The personal API Key for OpenWeatherMap API is saved in res const variable.
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`)
  const data = await res.json()
  const temp = data.main.temp;


  //asynchronous function To Post Data
  await fetch('/receiveData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          date: newDate,
          temp: temp,
          content: content
        })
        
      });

      //asynchronous function to fetch the data from the app endpoint
      const serverRes = await fetch('/getData', {
        credentials: 'same-origin',
      }).then(
        updateUI()
      );

      const allData = await serverRes.json()
      console.log(allData);


})

const updateUI = async ()=> {
  // wait for the data on the route "/getData" then update the object to user with the new data
  const updatedObj = await fetch ("/getData");
  console.log(updatedObj);
  try{
      const weatherData = await updatedObj.json();
      // set the values inside the object weatherData to the updated values 
      document.getElementById("date").innerHTML = 'Date : '+ weatherData.date;
      document.getElementById("temp").innerHTML = 'Temperature : ' + weatherData.temp+ '°C';
      document.getElementById("content").innerHTML = 'Content : ' + weatherData.content;
  }catch(error){
      console.log("error" , error);
  };
};