// Mock Data API
const data = {
  categories: [
    {
      idCategory: "1",
      strCategory: "Beef",
      strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
      strCategoryDescription: "Beef is the culinary name for meat from cattle...",
    },
    {
      idCategory: "2",
      strCategory: "Chicken",
      strCategoryThumb: "https://www.themealdb.com/images/category/chicken.png",
      strCategoryDescription: "Chicken is a type of domesticated fowl...",
    },
    {
      idCategory: "4",
      strCategory: "Lamb",
      strCategoryThumb: "https://www.themealdb.com/images/category/lamb.png",
      strCategoryDescription: "Lamb, hogget, and mutton are the meat of domestic sheep...",
    },
    {
      idCategory: "7",
      strCategory: "Pork",
      strCategoryThumb: "https://www.themealdb.com/images/category/pork.png",
      strCategoryDescription: "Pork is the culinary name for meat from a...",
    },
    {
      idCategory: "8",
      strCategory: "Seafood",
      strCategoryThumb: "https://www.themealdb.com/images/category/seafood.png",
      strCategoryDescription: "Seafood is any form of sea life regarded as food by humans...",
    },
    {
      idCategory: "14",
      strCategory: "Goat",
      strCategoryThumb: "https://www.themealdb.com/images/category/goat.png",
      strCategoryDescription: "The domestic goat or simply goat (Capra aegagrus hircus) is...",
    },
    {
      idCategory: "5",
      strCategory: "Miscellaneous",
      strCategoryThumb: "https://www.themealdb.com/images/category/miscellaneous.png",
      strCategoryDescription: "General foods that don't fit into another category...",
    },
    {
      idCategory: "6",
      strCategory: "Pasta",
      strCategoryThumb: "https://www.themealdb.com/images/category/pasta.png",
      strCategoryDescription: "Pasta is a staple food of traditional Italian cuisine...",
    },
    {
      idCategory: "3",
      strCategory: "Dessert",
      strCategoryThumb: "https://www.themealdb.com/images/category/dessert.png",
      strCategoryDescription: "Dessert is a course that concludes a meal...",
    },
  ],
};

// Step 1: Reorder Categories
const reorderedCategories = [
  ...data.categories.filter((cat) =>
    ["1", "2", "4", "7", "8", "14"].includes(cat.idCategory)
  ),
  ...data.categories.filter(
    (cat) => !["1", "2", "4", "7", "8", "14"].includes(cat.idCategory)
  ),
];

// Step 2: Display Categories Function
function displayCategories(categories, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
      <div class="content">
        <div class="title">${category.strCategory}</div>
        <div class="description">${category.strCategoryDescription}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Step 3: CRUD Operations for Groups
const API_URL = "http://localhost:3000/groups";

// Fetch and display group data
async function fetchGroups() {
  const groupsTable = document.querySelector("#groups-table tbody");

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const groups = await response.json();

    // Display groups in the table
    groupsTable.innerHTML = ""; // Clear previous rows
    groups.forEach((group) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${group.group_name}</td>
        <td>
          <ul>
            <li>${group.student1.student_name} / ${group.student1.student_id} (${group.student1.student_class})</li>
            <li>${group.student2.student_name} / ${group.student2.student_id} (${group.student2.student_class})</li>
            ${
              group.student3
                ? `<li>${group.student3.student_name} / ${group.student3.student_id} (${group.student3.student_class})</li>`
                : ""
            }
            ${
              group.student4
                ? `<li>${group.student4.student_name} / ${group.student4.student_id} (${group.student4.student_class})</li>`
                : ""
            }
          </ul>
        </td>
        <td>
          <button onclick="editGroup(${group.id})">Edit</button>
          <button onclick="deleteGroup(${group.id})">Delete</button>
        </td>
      `;
      groupsTable.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    document.getElementById("group-container").innerHTML =
      `<p style="color: red;">Error loading group data. Please try again later.</p>`;
  }
}

// Add or update group
async function createOrUpdateGroup(group, isEdit = false) {
  try {
    const response = await fetch(`${API_URL}${isEdit ? `/${group.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    fetchGroups();
  } catch (error) {
    console.error("Error saving group:", error);
  }
}

// Delete group
async function deleteGroup(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    fetchGroups();
  } catch (error) {
    console.error("Error deleting group:", error);
  }
}

// Handle form submission
document.getElementById("group-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const group = {
    group_name: document.getElementById("group-name").value,
    student1: {
      student_name: document.getElementById("student1-name").value,
      student_id: document.getElementById("student1-id").value,
      student_class: document.getElementById("student1-class").value,
    },
    student2: {
      student_name: document.getElementById("student2-name").value,
      student_id: document.getElementById("student2-id").value,
      student_class: document.getElementById("student2-class").value,
    },
    student3: {
      student_name: document.getElementById("student3-name").value,
      student_id: document.getElementById("student3-id").value,
      student_class: document.getElementById("student3-class").value,
    },
    student4: {
      student_name: document.getElementById("student4-name").value,
      student_id: document.getElementById("student4-id").value,
      student_class: document.getElementById("student4-class").value,
    },
  };

  createOrUpdateGroup(group);
  document.getElementById("group-form").reset();
});

// Step 4: Initialize and Render Data
document.addEventListener("DOMContentLoaded", () => {
  const topCategories = reorderedCategories.slice(0, 6);
  const bottomCategories = reorderedCategories.slice(6);

  displayCategories(topCategories, "top-categories");
  displayCategories(bottomCategories, "bottom-categories");

  // Fetch and display group data
  fetchGroups();
});