import mongoose from "mongoose"
export async function connectToTheGoose(){
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        console.log('connected')
    } catch (error) {
        console.log('error:',error)
    }
}