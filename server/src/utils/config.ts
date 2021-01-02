import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || '3005';
export const JWT_SECRET = process.env.JWT_SECRET as string;
