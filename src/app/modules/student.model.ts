import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import {
    Guardian,
    LocalGuardian,
    Student,
    UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        // required: [true, 'First Name is Mandatory!'],
        // trim: true,
        // validate: function (value: string) {
        //     console.log(value);
        // }
    },
    middleName: {
        type: String,
        // trim: true 
    },
    lastName: {
        type: String,
        // required: [true, 'Last Name is Mandatory!'],
        // validate: {
        //     validator: function (value: string) {
        //         return validator.isAlpha(value);
        //     },
        //     message: '{VALUE} is not valid!.',
        // }
    },
});

const guardianSchema = new Schema<Guardian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
    name: {
        type: String,
        required: true,
        maxlength: [20, 'First Name cannot be more than 20 characters']
    },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
    id: { type: String, required: true, unique: true },
    name: {
        type: userNameSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Gender must be either male or female. {VALUE} is not valid!',
        },
        required: true
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImage: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
        default: 'active',
    },
});

export const StudentModel = model<Student>('Student', studentSchema);
