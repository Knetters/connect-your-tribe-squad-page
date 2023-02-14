// Declare variables
const cardContainer = document.getElementById("card-container")

const squadBTN_A = document.getElementById("squadBTN-A")
const squadBTN_B = document.getElementById("squadBTN-B")
const squadBTN_C = document.getElementById("squadBTN-C")

// Add event listener to the button A
squadBTN_A.addEventListener("click", () => {
    squadURL = "squad-a-2022";
    callSquadList(squadURL);
  });
  
  // Add event listener to the button B
  squadBTN_B.addEventListener("click", () => {
    squadURL = "squad-b-2022";
    callSquadList(squadURL);
  });
  
  // Add event listener to the button C
  squadBTN_C.addEventListener("click", () => {
    squadURL = "squat-c-2022";
    callSquadList(squadURL);
  });
  
  // Function to load the squad members based on the given URL
  function callSquadList(squadURL) {
    // Remove all elements with the card-item class
    document.querySelectorAll('.card-item').forEach(e => e.remove());
    
    fetch("https://whois.fdnd.nl/api/v1/squad/" + squadURL)
      .then(res => res.json())
      .then(data => {
        const members = data.squad.members;
        members.forEach(member => {
          const avatarUrl = member.avatar ? member.avatar : '/static/img/fallback-pf.png';
          cardContainer.insertAdjacentHTML("beforeend", `
            <div class="card-item">
                <div class="inner-card">
                    <img class="card-img" src="${avatarUrl}">
                <p class="card-name">${member.name} ${member.surname}</p>
                <p class="card-github">${member.gitHubHandle}</p>
                <button class="card-button">Github</button>
                </div>
            </div>
          `);
        });
      })
      .catch(error => console.error(error));
  }
  
// Startup functions
callSquadList("squad-a-2022")