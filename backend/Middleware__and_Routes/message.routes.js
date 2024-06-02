import express from 'express';
import { getMessage, sendMessage } from '../Controllers/message.controller.js';
import protectRoute from './protectRoute.js';


const Router = express.Router();

Router.post("/send/:id", protectRoute ,sendMessage);
Router.get("/:id", protectRoute, getMessage);

export default Router;