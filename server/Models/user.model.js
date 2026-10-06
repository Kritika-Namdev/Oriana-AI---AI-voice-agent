import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    name : String,
    path : String,
    keywords: {
        type: [String],
        default: [],
    },
}, {_id:false}) //_id false for not creating any id

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    // I am not taking password because i am going to use the firebase google authenticatio

    assistantName:{
        type:String,
        default:"OrianaAI"
    },
    businessName:{
        type:String,
        default:""
    },// for which business is the assistant is used for

    businessType:{
        type:String,
        default:""
    },
    businessDescription:{
        type:String,
        default:""
    },//ai business desc ans according to this desc user input

    tone:{
        type:String,
        enum: [
            "friendly",
            "professional",
            "sales",
        ],
        default:"friendly"
    },

    theme:{
        type:String,
        enum:[
            "light",
            "dark",
            "neon",
            "glass"
        ],
        default:"dark"
    },

    enableVoice:{
        type:Boolean,
        default:true
    },

    pages:{
        type: [pageSchema],
        default: []
    },

    enableNavigation:{
        type:Boolean,
        default:true
    },
    geminiApiKey:{
        type:String,
        default:""
    },// for useing user api key
    //because what i give will have limited responses
    geminiStatus:{
        type:String,
        enum:[
            "active",
            "quota_exceeded",
            "invalid"
        ],
        default:"active"
    },
    // for checking geminiapi limit checking

    totalMessages:{
        type:Number,
        default:0
    },
    plan:{
        type:String,
        enum:[
            "free",
            "pro"
        ],
        default:"free"
    },
    requestLimit: {
        type:Number,
        default:200
    },
    proExpiresAt:{
        type:Date,
        default: null,
    },

    isSetupComplete:{
        type:Boolean,
        default:false
    }

},{timestamps:true}) // timestamps will give me 2 more things: created ast and updated at


const User = mongoose.model("User",userSchema) //model allow to work with data

export default User