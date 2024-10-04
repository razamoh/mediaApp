import { Router } from 'express';
import subTitleRoute from '@routes/subTitleRoutes';
import mediaRoute from '@routes/mediaRoutes';
import audioRoute from '@routes/audioRoutes';
import videoRoute from '@routes/videoRoutes';

const router = Router();

// Subtitle  Routes
router.use('/subtitle', subTitleRoute);

// media  Routes
router.use('/subtitle', mediaRoute);


// audio  Routes
router.use('/audio', audioRoute);

// video  Routes
router.use('/video', videoRoute);

export default router;

