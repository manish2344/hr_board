const express = require('express');
const { createCandidate, getCandidates, updateCandidate, deleteCandidate ,moveToEmployee,downloadResume} = require('../controllers/Candidate.js');
const router = express.Router();
const upload = require('../middleware/upload.js');


router.post('/',  upload.single('resume'), createCandidate);

router.post('/', createCandidate);
router.get('/', getCandidates);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);
router.get('/:id/resume', downloadResume);
router.post('/:id/move-to-employee', moveToEmployee);

module.exports = router;
