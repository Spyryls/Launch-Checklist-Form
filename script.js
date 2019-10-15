window.onload = (event) => {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `
          <h2>Current Mission Destination: ${json[0].name}</h2>
          <ol>
             <li>Name: ${json[0].name}</li>
             <li>Diameter: ${json[0].diameter}</li>
             <li>Star: ${json[0].star}</li>
             <li>Distance from Earth: ${json[0].distance}</li>
             <li>Number of Moons: ${json[0].moons}</li>
          </ol>
          <img src="${json[0].image}">
         `;
      });
      console.log("Is there anybody out there?");
   });


   let submissionForm = document.querySelector("form");

   submissionForm.addEventListener("submit", function () {


      let pilotField = document.querySelector("input[name=pilotName]");
      let copilotField = document.querySelector("input[name=copilotName]");
      let fuelField = document.querySelector("input[name=fuelLevel]");
      let cargoField = document.querySelector("input[name=cargoWeight]");
      let pilotStatus = document.getElementById("pilotStatus");
      let faultyItems = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");

      let allFieldsValid = () => pilotField.value !== "" && isNaN(pilotField.value) && copilotField.value !== "" && isNaN(copilotField.value) && fuelField.value !== "" && !isNaN(fuelField.value) && cargoField.value !== "" && !isNaN(cargoField.value);

      if (allFieldsValid()) {
         pilotStatus.innerHTML = `${pilotField.value} is ready for launch!`;
         copilotStatus.innerHTML = `${copilotField.value} is ready for launch!`;
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "green";
         launchStatus.innerHTML = `MISSION A-GO FOR LAUNCH!`;
      };


      if (pilotField.value === "" || !isNaN(pilotField.value)) {
         alert("Proper pilot designation required");
         event.preventDefault();
      };

      if (copilotField.value === "" || !isNaN(copilotField.value)) {
         alert("Proper co-pilot designation required");
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
