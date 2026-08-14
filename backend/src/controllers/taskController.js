import { db } from "../db/database.js";

const getTasks = (req, res, next) => {
  try {
    const { priority } = req.query;

    if (priority) {
      const allowedPriorities = ["Low", "Medium", "High"];

      if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({
          error: "Priority must be Low, Medium, or High.",
        });
      }

      const tasks = db
        .prepare(`
          SELECT *
          FROM tasks
          WHERE priority = ?
          ORDER BY created_at DESC, id DESC
        `)
        .all(priority);

      return res.json(tasks);
    }

    const tasks = db
      .prepare(`
        SELECT *
        FROM tasks
        ORDER BY created_at DESC, id DESC
      `)
      .all();

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = (req, res, next) => {
  try {
    const {
      title,
      description,
      priority = "Medium",
      column_id,
    } = req.body;

    if(!column_id || !priority){
      return res.status(404).json({
        error: " column_id or priority is required"
      })
    }

    

    const allowedPriorities = ["Low", "Medium", "High"];

    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({
        error: "Priority must be Low, Medium, or High.",
      });
    }

    const column = db
      .prepare("SELECT id FROM columns WHERE id = ?")
      .get(column_id);

    if (!column) {
      return res.status(404).json({
        error: `Column ${column_id} was not found.`,
      });
    }

    const result = db
      .prepare(`
        INSERT INTO tasks (
          column_id,
          title,
          description,
          priority
        )
        VALUES (?, ?, ?, ?)
      `)
      .run(
        column_id,
        title.trim(),
        description || null,
        priority
      );

    const newTask = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(newTask);

  } catch (error) {
    next(error);
  }
};

const updateTask = (req, res, next) => {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        error: "Task id must be a number.",
      });
    }

    const { title, description, priority } = req.body;

    if (!priority) {
      return res.status(400).json({
        error: "Task priority is required.",
      });
    }

    const allowedPriorities = ["Low", "Medium", "High"];

    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({
        error: "Priority must be Low, Medium, or High.",
      });
    }

    const task = db
      .prepare("SELECT id FROM tasks WHERE id = ?")
      .get(taskId);

    if (!task) {
      return res.status(404).json({
        error: `Task ${taskId} was not found.`,
      });
    }

    db.prepare(`
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        priority = ?
      WHERE id = ?
    `).run(
      title.trim(),
      description || null,
      priority,
      taskId
    );

    const updatedTask = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(taskId);

    res.json(updatedTask);

  } catch (error) {
    next(error);
  }
};

const deleteTask = (req, res, next) => {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        error: "Task id must be a number.",
      });
    }

    const task = db
      .prepare("SELECT id FROM tasks WHERE id = ?")
      .get(taskId);

    if (!task) {
      return res.status(404).json({
        error: `Task ${taskId} was not found.`,
      });
    }

    db.prepare(`
      DELETE FROM tasks
      WHERE id = ?
    `).run(taskId);

    res.json({
      message: `Task ${taskId} deleted successfully.`,
    });

  } catch (error) {
    next(error);
  }
};

const moveTask = (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const { column_id } = req.body;

    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        error: "Task id must be a number.",
      });
    }

    if (!Number.isInteger(Number(column_id))) {
      return res.status(400).json({
        error: "Column id must be a number.",
      });
    }

    const newColumnId = Number(column_id);

    const task = db
      .prepare("SELECT id FROM tasks WHERE id = ?")
      .get(taskId);

    if (!task) {
      return res.status(404).json({
        error: `Task ${taskId} was not found.`,
      });
    }

    const column = db
      .prepare("SELECT id FROM columns WHERE id = ?")
      .get(newColumnId);

    if (!column) {
      return res.status(404).json({
        error: `Column ${newColumnId} was not found.`,
      });
    }

    db.prepare(`
      UPDATE tasks
      SET column_id = ?
      WHERE id = ?
    `).run(newColumnId, taskId);

    const updatedTask = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(taskId);

    res.json(updatedTask);

  } catch (error) {
    next(error);
  }
};

const getTask = (req, res, next) => {
  try {
    const taskId = Number(req.params.id);


    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        error: "Task id must be a number.",
      });
    }

    const task = db
      .prepare(`
        SELECT *
        FROM tasks
        WHERE id = ?
      `)
      .get(taskId);

    if (!task) {
      return res.status(404).json({
        error: `Task ${taskId} was not found.`,
      });
    }

    res.json(task);

  } catch (error) {
    next(error);
  }
};

export {getTasks,getTask,createTask,updateTask,deleteTask,moveTask};