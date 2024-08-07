document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#data-table tbody");
  const popup = document.getElementById("popup");
  const popupDetails = document.getElementById("popup-details");
  const closeBtn = document.querySelector(".close-btn");

  // Function to fetch and parse CSV data
  fetch("cleaned_data2024.csv")
    .then((response) => response.text())
    .then((data) => {
      const rows = data.trim().split("\n").slice(1);
      rows.forEach((row) => {
        const columns = row.split(",").map((col) => col.trim());

        // Check if the row has columns
        if (columns.length > 0) {
          const lastColumnValue = columns[columns.length - 1]; // Get the last column's value
          const isValidated = lastColumnValue === "Y"; // Check if it's 'Y'
          if (isValidated) {
            const timestamp = columns[0];
            const location = columns[12];
            const rowElement = document.createElement("tr");
            rowElement.innerHTML = `<td>${timestamp}</td><td>${location}</td>`;
            rowElement.addEventListener("click", () => {
              showDetails(columns);
            });
            tableBody.appendChild(rowElement);
          }
        }
      });
    })
    .catch((error) => console.error("Error fetching the CSV file:", error));

  // Function to show details in the popup
  function showDetails(columns) {
    popupDetails.innerHTML = `
              <p><strong>Timestamp:</strong> ${columns[0]}</p>
              <p><strong>Attack Status:</strong> ${columns[5]}</p>
              <p><strong>Location:</strong> ${columns[12]}</p>
              <p><strong>Description:</strong> ${columns[14]}</p>
          `;
    popup.style.display = "block";
  }

  // Function to close the popup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close the popup if user clicks outside of it
  window.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});
