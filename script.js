window.onload = (event) => {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         let mark = Math.floor(Math.random() * json.length);
         document.getElementById("missionTarget").innerHTML = `
          <h2>Current Mission Destination: ${json[mark].name}</h2>
          <ol>
             <li>Name: ${json[mark].name}</li>
             <li>Diameter: ${json[mark].diameter}</li>
             <li>Star: ${json[mark].star}</li>
             <li>Distance from Earth: ${json[mark].distance}</li>
             <li>Number of Moons: ${json[mark].moons}</li>
          </ol>
          <img src="${json[mark].image}">
         `;
      });
      console.log("Is there anybody out there?");
   });


   let submissionForm = document.querySelector("form");

   submissionForm.addEventListener("submit", function () {
      event.preventDefault();

      let pilotField = document.querySelector("input[name=pilotName]");
      let copilotField = document.querySelector("input[name=copilotName]");
      let fuelField = document.querySelector("input[name=fuelLevel]");
      let cargoField = document.querySelector("input[name=cargoWeight]");
      let pilotStatus = document.getElementById("pilotStatus");
      let faultyItems = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");

      let allFieldsValid = () => 
      pilotField.value !== "" && isNaN(pilotField.value) && 
      copilotField.value !== "" && isNaN(copilotField.value) && 
      fuelField.value !== "" && !isNaN(fuelField.value) && 
      cargoField.value !== "" && !isNaN(cargoField.value);

      if (allFieldsValid()) {
         pilotStatus.innerHTML = `${pilotField.value} is ready for launch!`;
         copilotStatus.innerHTML = `${copilotField.value} is ready for launch!`;
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "green";
         launchStatus.innerHTML = `MISSION A-GO FOR LAUNCH!`;
      };

      if (pilotField.value === "" || !isNaN(pilotField.value)) {
         alert("Proper pilot designation required");
         pilotStatus.innerHTML = `Pilot is not aboard!`;
         pilotStatus.style.color = "red";
         event.preventDefault();
      };

      if (copilotField.value === "" || !isNaN(copilotField.value)) {
         alert("Proper co-pilot designation required");
         copilotStatus.innerHTML = `Co-pilot is not aboard!`;
         copilotStatus.style.color = "red";
         event.preventDefault();
      };

      if (fuelField.value === "" || isNaN(fuelField.value)) {
         alert("Fuel(lbs) available required");
         event.preventDefault();
      } else if (fuelField.value <= 10000) {
         fuelStatus.innerHTML = "Not enough fuel(lbs) to complete necessary propulsion!";
         fuelStatus.style.color = "red";
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = "SHUTTLE NOT READY FOR LAUNCH!";
         launchStatus.style.color = "red";
         event.preventDefault();
      };

      if (cargoField.value === "" || isNaN(cargoField.value)) {
         alert("Cargo(Tonage) loaded required");
         event.preventDefault();
      } else if (cargoField.value >= 10000) {
         cargoStatus.innerHTML = "Cargo(Tonage) exceeds optimal weight limits!";
         cargoStatus.style.color = "red";
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = "SHUTTLE NOT READY FOR LAUNCH!";
         launchStatus.style.color = "red";
         event.preventDefault();
      };
   }); 
}
