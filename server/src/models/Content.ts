import mongoose, { Mongoose, Schema } from "mongoose";
import { required } from "zod/mini";

const ContentSchema = new Schema({


    title:{

        type:String,
        required:true
    },

    userId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    tag:{

        type:String,
        default:null

    },

    types:{

        type:String,
        default:"youtube"

    }

},

{timestamps:true}
);

export const ContentModel = mongoose.model("Content",ContentSchema)