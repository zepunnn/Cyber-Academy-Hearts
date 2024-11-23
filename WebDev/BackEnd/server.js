const express = require("express"); // Panggil library Express.js
const app = express();
const cors = require("cors");
const PORT = 3000; // Port untuk server, bisa disesuaikan dengan kebutuhan
const corsOptions = {
  origin: "http://localhost:5500", // Replace with the frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow only specific methods
};

app.use(cors(corsOptions));


app.use(cors()); // Allow all origins by default
// Middleware to parse JSON
app.use(express.json());

// Mock data
let groups = [
  {
    group_name: "Hearts", // Nama kelompok
    student1: { student_name: "Fakhri", student_id: "101012300055", student_class: "TT-47-02" }, // Data mahasiswa 1
    student2: { student_name: "Rafif", student_id: "101012300320", student_class: "TT-47-02" }, // Data mahasiswa 2
    student3: { student_name: "Guntur", student_id: "101012330062", student_class: "TT-47-07" }, // Data mahasiswa 3
    student4: { student_name: "Addys", student_id: "101042330086", student_class: "TF-47-01" }, // Data mahasiswa 4
  },
];

// Routes

// Get all groups
app.get("/groups", (req, res) => {
  res.json(groups); // Tampilkan variable kelompok
});

// Get a specific group by name
app.get("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" }); // Response status data not found: 404
  res.json(group);
});

// Add a new group
app.post("/groups", (req, res) => {
  const { group_name, student1, student2, student3, student4 } = req.body;

  if (!group_name) {
    return res.status(400).json({ error: "Group name is required" }); // Response status bad request: 400
  }

  const newGroup = { group_name, student1, student2, student3, student4 };
  groups.push(newGroup);
  res.status(201).json(newGroup);
});

// Update a group by name
app.put("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const { group_name, student1, student2, student3, student4 } = req.body;

  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" });

  if (group_name) group.group_name = group_name;
  if (student1) group.student1 = student1;
  if (student2) group.student2 = student2;
  if (student3) group.student3 = student3;
  if (student4) group.student4 = student4;

  res.json(group);
});

// Delete a group by name
app.delete("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const groupIndex = groups.findIndex((g) => g.group_name === groupName);

  if (groupIndex === -1) {
    return res.status(404).json({ error: "Group not found" });
  }

  // Remove the group from the array
  groups.splice(groupIndex, 1);

  res.status(200).json({
    message: `The Group "${groupName}" has been deleted successfully.`,
    remaining_groups: groups,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});