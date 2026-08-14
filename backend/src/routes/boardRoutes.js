import express from 'express';

const router = express.Router();


router.get("/:id",getBoard) //todo: add getBoard controller 
router.get("/:id/stats",getTaskCountsPerColumn) //todo: add getTaskCountsPerColumn controller
router.get("/:id/filterTask",getFilteredTask)  // todo: add getFilteredTask controller


export default router;