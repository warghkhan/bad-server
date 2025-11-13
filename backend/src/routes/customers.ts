// routes/customers.ts
import { Router } from 'express'
import rateLimit from 'express-rate-limit';
import {
    deleteCustomer,
    getCustomerById,
    getCustomers,
    updateCustomer,
} from '../controllers/customers'
import auth, { roleGuardMiddleware } from '../middlewares/auth'
import { Role } from '../models/user'

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  statusCode: 429,
  message: { success: false, message: 'Rate limit exceeded for /customers' },
  standardHeaders: false,
});

const customerRouter = Router()
customerRouter.use(strictLimiter);

customerRouter.get('/', auth, roleGuardMiddleware(Role.Admin), getCustomers)
customerRouter.get('/:id', auth, getCustomerById)
customerRouter.patch('/:id', auth, updateCustomer)
customerRouter.delete('/:id', auth, deleteCustomer)

export default customerRouter
