import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import todoModel from "./todoModel"; // Import the correct model file
import dotenv from "dotenv";
// import "./dbConnection"; // Database connection file
import todoModel from "./interface/Interface";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("It's like Home Page");
});

// Get all todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// Create a new todo
app.post("/todos", async (req: Request, res: Response) => {
  const { title } = req.body;

  // Validate the incoming request data
  if (typeof title !== "string") {
    res.status(400).json({ message: "Title must be a string" });
    return;
  }

  const newTodo = new todoModel({
    title,
    completed: false,
  });

  try {
    const savedTodo = await newTodo.save(); // Save to MongoDB
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
});

// Update a todo
app.put("/todos/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await todoModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
