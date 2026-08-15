import { db } from "../db/database.js";

const getBoard = (req, res, next) => {
  try {
    const boardId = Number(req.params.id);

    if (!Number.isInteger(boardId)) {
      return res.status(400).json({
        error: "Board id must be a number.",
      });
    }
    // console.log("boardId : ", boardId);
    const board = db.prepare("SELECT * FROM boards WHERE id = ?").get(boardId);

    if (!board) {
      return res.status(404).json({
        error: `Board ${boardId} was not found.`,
      });
    }

    const columns = db
      .prepare("SELECT * FROM columns WHERE board_id = ? ORDER BY id ASC")
      .all(boardId);

    const taskStmt = db.prepare(`
      SELECT *
      FROM tasks
      WHERE column_id = ?
      ORDER BY created_at DESC, id DESC
    `);

    const columnsWithTasks = columns.map((column) => ({
      ...column,
      tasks: taskStmt.all(column.id),
    }));

    res.json({
      ...board,
      columns: columnsWithTasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskCountsPerColumn = (req, res, next) => {
  try {
    const boardId = Number(req.params.id);

    if (!Number.isInteger(boardId)) {
      return res.status(400).json({
        error: "Board id must be a number.",
      });
    }

    const board = db.prepare("SELECT id FROM boards WHERE id = ?").get(boardId);

    if (!board) {
      return res.status(404).json({
        error: `Board ${boardId} was not found.`,
      });
    }

    const taskCounts = db
      .prepare(
        `
        SELECT
          c.id AS column_id,
          c.name AS column_name,
          COUNT(t.id) AS task_count
        FROM columns c
        LEFT JOIN tasks t
          ON t.column_id = c.id
        WHERE c.board_id = ?
        GROUP BY c.id, c.name
        ORDER BY c.id ASC
      `,
      )
      .all(boardId);

    res.json(taskCounts);
  } catch (error) {
    next(error);
  }
};

const getFilteredTask = (req,res,next) => {
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
        .prepare(
          `
          SELECT *
          FROM tasks
          WHERE priority = ?
          ORDER BY created_at DESC, id DESC
        `,
        )
        .all(priority);

      return res.json(tasks);
    }

    const tasks = db
      .prepare(
        `
        SELECT *
        FROM tasks
        ORDER BY created_at DESC, id DESC
      `,
      )
      .all();

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export { getBoard, getTaskCountsPerColumn, getFilteredTask };
