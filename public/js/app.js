(() => {
  const copyButtons = document.querySelectorAll(".copy-btn");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const copiedDvi = document.querySelector(".copied");
  const sendButton = document.querySelector(".request_input button");
  const queryInput = document.getElementById("query");
  const outputElement = document.getElementById("books");
  const resultElement = document.querySelector(".result");
  const prettifyButton = document.getElementById("prettify");
  const minifyButton = document.getElementById("minify");
  const endpointSpans = document.querySelectorAll(".endpoints span");
  const defaultURL = "https://bookstore-api-lx5m.onrender.com/api/v1/books";
  // const defaultURL = "http://localhost:8000/api/v1/books";

  function viewPoint() {
    document.body.style.height = `${window.innerHeight}px`;
  }
  viewPoint();
  window.addEventListener("resize", viewPoint);

  // copy url
  function CopyUrl() {
    const url = queryInput.value;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        copiedDvi.classList.add("active");
        setTimeout(() => {
          copiedDvi.classList.remove("active");
        }, 3000);
      })
      .catch(() => {
        console.log(err.message);
      });
  }

  //Copy to clipboard
  function copyToClipboard(button) {
    const textToCopy = button.getAttribute("data-clipboard-text");
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copiedDvi.classList.add("active");
        setTimeout(() => {
          copiedDvi.classList.remove("active");
        }, 3000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  if (queryInput) {
    queryInput.value = defaultURL;
  }

  if (endpointSpans) {
    endpointSpans.forEach((span) => {
      span.addEventListener("click", () => {
        queryInput.value = `https://bookstore-api-lx5m.onrender.com/api/v1/${span.textContent.trim()}`;
      });
    });
  }

  // Function to display the fetched data
  function displayData(data, format = "prettify") {
    outputElement.textContent =
      format === "prettify"
        ? JSON.stringify(data, null, 2)
        : JSON.stringify(data);

    resultElement.textContent = Array.isArray(data)
      ? `Result: ${data.length} books`
      : `Result: 1 book - ${data.title}`;
  }

  function getBooks() {
    let fetchedData = null;

    // Fetch data from the URL
    async function fetchData(url) {
      try {
        // Show the loading indicator
        outputElement.textContent = "Loading...";

        const response = await fetch(url);
        const statusCode = response.status;

        if (!response.ok) {
          throw new Error(`Error: ${statusCode} ${response.statusText}`);
        }

        const data = await response.json();
        displayData(data, "prettify");
        fetchedData = data;
      } catch (error) {
        outputElement.textContent = `Failed to fetch data: ${error.message}`;
        resultElement.textContent = `Result: Error - ${error.message}`;
      }
    }

    // Fetch default data when page loads
    fetchData(defaultURL);

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
  }

  //RUN
  document.addEventListener("DOMContentLoaded", () => {
    // Navigation
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Copied
    if (copyButtons) {
      copyButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          copyToClipboard(event.target);
          if (queryInput) {
            CopyUrl();
          }
        });
      });
    }

    //Fech books
    if (queryInput) {
      getBooks();
    }
  });
})();
