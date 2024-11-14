// import {jwt_decode} from "jwt-decode";
async function get_all_authors() {
  const response = await fetch("/api/authors/get_all_authors");
  const data = await response.json();
  console.log(data);
  console.log(document.cookie);
}

document.addEventListener("DOMContentLoaded", get_all_authors());
