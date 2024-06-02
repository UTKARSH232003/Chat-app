import express from 'express';
import { getUsersForSidebars } from '../Controllers/user.controller.js';
import protectRoute from './protectRoute.js';

const Router = express.Router();

Router.get("/", protectRoute, getUsersForSidebars);

export default Router;