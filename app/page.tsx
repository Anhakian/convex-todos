"use client";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { NewToDoForm } from "./components/new-todo-form";
import { ToDoList } from "./components/to-do-list";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { GenerateTodosForm } from "./components/generate-todos-form";

export default function Home() {
  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <Authenticated>
        <div className="flex imtems-center justify-between">
          <h1 className="text-xl font-bold">To-Do List</h1>
          <UserButton />
        </div>

        <ToDoList />
        <NewToDoForm />
        <GenerateTodosForm />
      </Authenticated>
      <Unauthenticated>
        <SignInButton>
          <div className="space-y-4">
            <p className="text-gray-600">Please sign in to continue</p>
            <button className="p-1 bg-blue-500 rounded text-white">
              Sign In
            </button>
          </div>
        </SignInButton>
      </Unauthenticated>
      <AuthLoading>
        <p>Loading...</p>
      </AuthLoading>
    </div>
  );
}
