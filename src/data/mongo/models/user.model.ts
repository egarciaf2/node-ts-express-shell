import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
    name:           {
        type:     String,
        required: [ true, 'Name is required' ]
    },
    email:          {
        type:     String,
        required: [ true, 'Email is required' ],
        unique:   true
    },
    emailValidated: {
        type:    Boolean,
        default: false
    },
    password:       {
        type:     String,
        required: [ true, 'Password is required' ]
    },
    role:           {
        type:    String,
        enum:    [ 'ADMIN_ROLE', 'USER_ROLE' ],
        default: 'USER_ROLE'
    },
    state:          {
        type:    [ String ],
        enum:    [ 'A', 'I' ],
        default: 'A'
    },
    img:            {
        type: String
    },
    createAt:       {
        type:     Date,
        default:  Date.now,
        required: false
    }
} );

userSchema.set( 'toJSON', {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => {
        delete ret._id;
        delete ret.password;
    }
} );

export const UserModel = mongoose.model( 'User', userSchema );
