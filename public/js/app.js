const copyButtons = document.querySelectorAll(".copy-btn");

function copyToClipboard(event) {
  const textToCopy = event.target.getAttribute("data-clipboard-text");
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy!");
    });
}
copyButtons.forEach((button) => {
  button.addEventListener("click", copyToClipboard);
});

document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.querySelector(".request_input button");
  const queryInput = document.getElementById("query");
  const outputElement = document.getElementById("books");
  const resultElement = document.querySelector(".result");
  const loadingElement = document.getElementById("loading");
  const prettifyButton = document.getElementById("prettify");
  const minifyButton = document.getElementById("minify");
  const endpointSpans = document.querySelectorAll(".endpoints span");
  // const defaultURL = "http://localhost:8000/api/v1/books";
  const defaultURL = "https://bookstore-api-lx5m.onrender.com/api/v1/books";

  let fetchedData = null; // Store fetched data

  // Set the default URL in the input field when the page loads
  queryInput.value = defaultURL;

  // Function to prettify the JSON
  function prettifyJSON(data) {
    return JSON.stringify(data, null, 2); // Indentation of 2 spaces for prettifying
  }

  // Function to minify the JSON
  function minifyJSON(data) {
    return JSON.stringify(data); // Without indentation for minifying
  }

  // Function to display the fetched data
  function displayData(data, format = "prettify") {
    // Store the fetched data for future formatting
    fetchedData = data;

    // Prettify or Minify the JSON based on user selection
    outputElement.textContent =
      format === "prettify" ? prettifyJSON(data) : minifyJSON(data);

    resultElement.textContent = Array.isArray(data)
      ? `Result: ${data.length}`
      : `Result: 1 book - ${data.title}`;
  }

  // Fetch data from the URL
  async function fetchData(url) {
    try {
      // Show the loading indicator
      // loadingElement.style.display = "block";
      outputElement.textContent = "Loading...";

      const response = await fetch(url);
      const statusCode = response.status; // Capture the status code

      if (!response.ok) {
        throw new Error(`Error: ${statusCode} ${response.statusText}`);
      }

      const data = await response.json();

      // Display the fetched data in the prettified format by default
      setTimeout(() => {
        displayData(data, "prettify");
      }, 1000);
    } catch (error) {
      // Hide the loading indicator on error
      loadingElement.style.display = "none";
      outputElement.textContent = `Failed to fetch data: ${error.message}`;
      resultElement.textContent = `Result: Error - ${error.message}`;
    }
  }

  // Fetch default data when page loads
  fetchData(defaultURL);

  // Handle span clicks to update input field with URL
  endpointSpans.forEach((span) => {
    span.addEventListener("click", () => {
      queryInput.value = `http://localhost:8000/api/v1/${span.textContent.trim()}`;
    });
  });

  // Handle button click to fetch data from the input URL
  sendButton.addEventListener("click", () => {
    const url = queryInput.value.trim();

    // Validate URL
    if (!url || !url.startsWith("http")) {
      outputElement.textContent =
        "Please enter a valid URL starting with http or https.";
      resultElement.textContent = "Result: Error - Invalid URL";
      return;
    }

    // Fetch data from the entered URL
    fetchData(url);
  });

  // Prettify button click handler
  prettifyButton.addEventListener("click", () => {
    if (fetchedData) {
      displayData(fetchedData, "prettify");
    }
  });

  // Minify button click handler
  minifyButton.addEventListener("click", () => {
    if (fetchedData) {
      displayData(fetchedData, "minify");
    }
  });
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
