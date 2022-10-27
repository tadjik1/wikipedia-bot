import mongoose from 'mongoose';
import { MONGODB_URL } from '../config.js';

mongoose.connect(MONGODB_URL, {
    dbName: 'wikipedia-bot',
});