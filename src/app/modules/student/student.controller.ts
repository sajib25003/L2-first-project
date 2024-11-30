import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    console.error();
    err;
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student Data Received Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
  }
};
const getAStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getAStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student Data Received Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getAStudent,
};
