import express from 'express';
import { getBoard, getFilteredTask, getTaskCountsPerColumn } from '../controllers/boardController.js';

const router = express.Router();


router.get("/:id",getBoard) //todo: add getBoard controller 
router.get("/:id/countTask",getTaskCountsPerColumn) //todo: add getTaskCountsPerColumn controller
router.get("/:id/filterTask",getFilteredTask)  // todo: add getFilteredTask controller


export default router;