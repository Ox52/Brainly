import { Response } from "express";
import { AuthRequest } from "../middleware.js";
import { LinkModel } from "../models/Link.js";
import { generateHash } from "../utils/random.js";
import { Usermodel } from "../models/User.js";
import { ContentModel } from "../models/Content.js";


export const shareBrainController = async (req:AuthRequest, res:Response) =>{


    try{

const {share} = req.body;

if(!req.userId){


    return res.status(401).json({
      message: "Unauthorized",
    });
}

if(share){

    const existingLink = await LinkModel.findOne({
        userId:req.userId,
    })

    if(existingLink){
        return res.json({

            hash:existingLink.hash,
        })
    }

    const hash = generateHash(10);

    const newLink = await LinkModel.create({

        userId:req.userId,
        hash
    });

    return res.json({

        hash :newLink.hash
    })

   

}else{

    await LinkModel.deleteOne({

        userId:req.userId
    })

    return res.json({

        message:"Link removed"
    })
    
}

    }catch(error){

        return res.status(500).json({

            message:"something went wrong"
        })


    }
};


export const sharedLinkController = async ( req: AuthRequest, res:Response) =>{


    try{
const hash = req.params.shareLink;


if(!hash){

    return  res.status(400).json({
        message:"Invalid link"
    })
}

const link = await LinkModel.findOne({hash})

if(!link){

    return res.status(404).json( {message:"link not found"})
}


const user = await Usermodel.findById(link.userId);

if(!user){

    return res.status(404).json({message:"User not found"})
}


const content = await ContentModel.find({
    userId:link.userId,
})

return res.json({
    username:user.username,
    content,

})

    }catch(error){

        return res.status(500).json({

            message:"somegthing went wrong"
        })


    }
}