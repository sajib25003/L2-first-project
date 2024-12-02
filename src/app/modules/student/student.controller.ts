import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import JoiStudentSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
    try {







        const { student: studentData } = req.body;

        const { error } = JoiStudentSchema.validate(studentData);

        // console.log(error, value);
        const result = await StudentServices.createStudentIntoDB(studentData);

        if (error) {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.details,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student created successfully',
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong in creating user!',
            error: err,
        });
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
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getAStudent,
};
