  
        fetch('http://localhost:5000/getData')                                                                  //Request to our own server!
        .then((res) => res.json())
        .then((res) => 
        {
        let n=res.cities.length;                                                                            //checking how many objects we have in the array
        //populating hte header part
        document.getElementById("header").innerHTML=`                                                       
                <h1> Weather and air quality in ${res.cities[n-1].city} on ${res.cities[n-1].date} </h1>
                `;
        //populating the weather part
        document.getElementById("weather").innerHTML=`
                <h2>Weather</h2>
                <p> Temperature: ${res.cities[n-1].temperature} C </p>
                <p> Humidity: ${res.cities[n-1].humidity} % </p>
                <p> Pressure: ${res.cities[n-1].pressure} hPa </p>
                <p> Wind Direction: ${res.cities[n-1].winddirection} dg </p>
                <p> Wind Speed: ${res.cities[n-1].windspeed} m/s </p>
                `;
        //populating the pollutions part
// res.cities[n-1].airquality=230;
        document.getElementById("pollution").innerHTML=`
                <h2>Air quality index</h2>
                <p style="font-size:50pt"> ${res.cities[n-1].airquality} </p>
                `;
                //changing color based on the airquality number
                if (res.cities[n-1].airquality <= 50)
                    {
                    document.getElementById("reccomendation").innerHTML=`
                    <h2 style="color:green">The air quality is very good!</h2>`
                    }
                else if (res.cities[n-1].airquality <= 100)
                    {document.getElementById("reccomendation").innerHTML=`
                    <h2 style="color:yellow">The air quality is moderate!</h2>`
                    }
                else if (res.cities[n-1].airquality <= 150)
                    {document.getElementById("reccomendation").innerHTML=`
                    <h2 style="color:orange">The air quality is unhealthy for sensitive people!</h2>`
                    setTimeout(() => alert("The general public should greatly reduce outdoor exertion. Sensitive groups should avoid all outdoor activity. Everyone should take care to wear a pollution mask. Ventilation is discouraged. Air purifiers should be turned on."), 1000);
                    }
                else if (res.cities[n-1].airquality <= 200)
                    {document.getElementById("reccomendation").innerHTML=`
                    <h2 style="color:red">The air quality is unhealthy!</h2>`
                    setTimeout(() => alert("Outdoor exertion, particularly for sensitive groups, should be limited. Everyone should take care to wear a pollution mask. Ventilation is not recommended. Air purifiers should be turned on if indoor air quality is unhealthy."), 1000);
                    }
                else if (res.cities[n-1].airquality <= 300)
                    {document.getElementById("reccomendation").innerHTML=`
                    <h2 style="color:purple"> The air quality is very unhealthy!</h2>`
                    setTimeout(() => alert("The general public should greatly reduce outdoor exertion. Sensitive groups should avoid all outdoor activity. Everyone should take care to wear a pollution mask. Ventilation is discouraged. Air purifiers should be turned on."), 1000);
                    }
                else if (res.cities[n-1].airquality > 300)
                    {document.getElementById("reccomendation").innerHTML=`
                    <h2 style="color:brown">The air quality is hazardous!</h2>`
                    setTimeout(() => alert("The general public should avoid outdoor exertion. Everyone should take care to wear a quality pollution mask. Ventilation is discouraged. Homes should be sealed and air purifiers turned on."), 1000);
                    }
        //populating the history
         document.getElementById("history").innerHTML=`
            <h3>Last 5 recorded measurements of air quality </h3>
            <p>${res.cities[n-2].airquality} measured on ${res.cities[n-2].date}</p>
            <p>${res.cities[n-3].airquality} measured on ${res.cities[n-3].date}</p>
            <p>${res.cities[n-4].airquality} measured on ${res.cities[n-4].date}</p>
            <p>${res.cities[n-5].airquality} measured on ${res.cities[n-5].date}</p>
            <p>${res.cities[n-6].airquality} measured on ${res.cities[n-6].date}</p>
            `;
        //plotting the measurements. Because the mesurements are taken now every minute and my date stamp has no precise time stamp, the x-axis will be just number of measurement
            let arrayx=[];  //x-axis
            let arrayy=[];  //y-axis


        for (i=1; i<res.cities.length; i++)
        {
            arrayx.push(i);                             //populating the x axis
            arrayy.push(res.cities[n-i].airquality);    //populating the y axis
        }
          
            TESTER = document.getElementById('tester'); 
            Plotly.plot( TESTER, [{
            x: arrayx,
            y: arrayy }], {
            margin: { t: 0 } } );
        
         });
    