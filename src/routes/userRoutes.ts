import { Router } from 'express';
import {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/userController';
import { userSchema } from '../validations/userValidation';
import validate from '../middlewares/validateRequest';

const router = Router();

router.post('/', validate(userSchema), createUserHandler);
router.get('/', getUsersHandler);
router.get('/:id', getUserByIdHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

export default router;
