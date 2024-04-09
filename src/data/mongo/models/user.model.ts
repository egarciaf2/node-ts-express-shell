import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
    name:     {
        type:     String,
        required: [ true, 'Name is required' ]
    },
    email:    {
        type:     String,
        required: [ true, 'Email is required' ],
        unique:   true
    },
    password: {
        type:     String,
        required: [ true, 'Password is required' ]
    },
    role:     {
        type:    String,
        default: 'USER_ROLE',
        enum:    [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },
    img:      {
        type: String
    },
    state:    {
        type:    [ String ],
        enum:    [ 'A', 'I' ],
        default: [ 'A' ]
    }
} );

export const UserModel = mongoose.model( 'User', userSchema );
