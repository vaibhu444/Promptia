import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async(req)=>{
    const {prompt, userId, tag} = await req.json();
    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201
        })


    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        return new Response('Failed To Create New Prompt', {
            status: 500
        })
    }
}