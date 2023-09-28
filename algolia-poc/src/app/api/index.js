const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const algoliasearch = require("algoliasearch");

// Initialize Supabase client
const supabaseUrl = "";
const supabaseKey = "";
const supabase = createClient(supabaseUrl, supabaseKey);

const cors = require("cors");

const algolia = algoliasearch("", "");
const index = algolia.initIndex("book");

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

async function syncDataToAlgolia() {
  // Get supabase data
  const { data, error } = await supabase.from("books").select("*");

  if (error) {
    console.error("Failed to get supabase data:", error.message);
    return;
  }

  // Send supabase data to Algolia
  const objectsToIndex = data.map((item, index) => ({
    objectID: item.id,
    ...item,
  }));

  const { taskIDs } = await index.saveObjects(objectsToIndex);

  console.log("Algolia sync is completed");
}

syncDataToAlgolia();
