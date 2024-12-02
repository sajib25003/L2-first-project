import Joi from 'joi';

// creating a schema validation using Joi

const JoiUserNameSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .required()
        .messages({
            'string.base': 'First Name must be a string.',
            'string.empty': 'First Name is Mandatory!',
        }),
    middleName: Joi.string().trim().allow(null, ''),
    lastName: Joi.string()
        .required()
        .pattern(/^[A-Za-z]+$/)
        .messages({
            'string.pattern.base': '{#value} is not valid!',
            'string.empty': 'Last Name is Mandatory!',
        }),
});

// Guardian Validation Schema
const JoiGuardianSchema = Joi.object({
    fatherName: Joi.string().required().messages({
        'string.empty': 'Father Name is required.',
    }),
    fatherOccupation: Joi.string().required().messages({
        'string.empty': 'Father Occupation is required.',
    }),
    fatherContactNo: Joi.string().required().messages({
        'string.empty': 'Father Contact No is required.',
    }),
    motherName: Joi.string().required().messages({
        'string.empty': 'Mother Name is required.',
    }),
    motherOccupation: Joi.string().required().messages({
        'string.empty': 'Mother Occupation is required.',
    }),
    motherContactNo: Joi.string().required().messages({
        'string.empty': 'Mother Contact No is required.',
    }),
});

// LocalGuardian Validation Schema
const JoiLocalGuardianSchema = Joi.object({
    name: Joi.string()
        .required()
        .max(20)
        .messages({
            'string.empty': 'Local Guardian Name is required.',
            'string.max': 'Local Guardian Name cannot be more than 20 characters.',
        }),
    occupation: Joi.string().required().messages({
        'string.empty': 'Local Guardian Occupation is required.',
    }),
    contactNo: Joi.string().required().messages({
        'string.empty': 'Local Guardian Contact No is required.',
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Local Guardian Address is required.',
    }),
});

// Student Validation Schema
const JoiStudentSchema = Joi.object({
    id: Joi.string().required().messages({
        'string.empty': 'ID is required.',
    }),
    name: JoiUserNameSchema.required(),
    gender: Joi.string()
        .required()
        .valid('male', 'female')
        .messages({
            'any.only': 'Gender must be either male or female.',
            'string.empty': 'Gender is required.',
        }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email.',
        'string.empty': 'Email is required.',
    }),
    contactNo: Joi.string().required().messages({
        'string.empty': 'Contact No is required.',
    }),
    emergencyContactNo: Joi.string().required().messages({
        'string.empty': 'Emergency Contact No is required.',
    }),
    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
        .optional()
        .messages({
            'any.only': 'Blood Group must be a valid type.',
        }),
    presentAddress: Joi.string().required().messages({
        'string.empty': 'Present Address is required.',
    }),
    permanentAddress: Joi.string().required().messages({
        'string.empty': 'Permanent Address is required.',
    }),
    guardian: JoiGuardianSchema.required(),
    localGuardian: JoiLocalGuardianSchema.required(),
    profileImage: Joi.string().optional(),
    isActive: Joi.string()
        .valid('active', 'inactive')
        .default('active')
        .messages({
            'any.only': 'Status must be either active or inactive.',
        }),
});

export default JoiStudentSchema;