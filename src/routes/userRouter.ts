import app from '../../server';
import { userController } from '../controllers';

app.get('/login', userController.login)
app.get('/signup', userController.signUp)
