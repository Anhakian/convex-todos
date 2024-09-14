import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import OpenAI from "openai";
import { requireUser } from "./helper";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
})
export const generateTodos = action({
    args: {
        prompt: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);
        const response = await openai.chat.completions.create({
            model: "huggingfaceh4/zephyr-7b-beta:free",
            messages: [{
                role: "user", 
                content: "Generate 3 todos based on the given prompt. Please include a title and description. Please return only the todos in the following format: {todos: [{title: string, description: string}]}. No additional text asides from the json-objects, even the title or repeating the request is not allowed.",
            }, {
                role: "user", 
                content: `Prompt: ${args.prompt}`,
            }],
        });
        console.log(response.choices[0].message.content!)
        const content = JSON.parse(response.choices[0].message.content!) as {
            todos: {title: string, description: string}[]
        };
        await ctx.runMutation(internal.functions.createManyTodos, {todos: content.todos, userId: user.tokenIdentifier});
        return content.todos;
    }
})