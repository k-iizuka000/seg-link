import { Router, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { SegmentService } from './segment.service';
import { User } from '../user/user.model';

export class SegmentController {
  public router: Router;
  private authService: AuthService;
  private segmentService: SegmentService;

  constructor() {
    this.router = Router();
    this.authService = new AuthService();
    this.segmentService = new SegmentService();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.authService.authenticate, this.getAllSegments);
    this.router.get('/:id', this.authService.authenticate, this.getSegmentById);
    this.router.post('/', this.authService.authenticate, this.createSegment);
  }

  private getAllSegments = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user as User | undefined;
      if (!user?.stravaId) {
        res.status(400).json({ message: 'Invalid user data' });
        return;
      }

      const segments = await this.segmentService.getAllSegments(user);
      res.status(200).json(segments);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ message: errorMessage });
      return;
    }
  };

  // ... existing code ...
}