const express = require("express");
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabaseUrl = "";
const supabaseKey = "";
const supabase = createClient(supabaseUrl, supabaseKey);
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Define a route to fetch all books from your Supabase table
app.get("/books", async (req, res) => {
  try {
    // Replace 'books' with the name of your table
    const { data, error } = await supabase.from("books").select();

    if (error) {
      throw error;
    }

    console.log("Books data:", data);

    res.json(data);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
