//API Route
import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";
import { NextResponse } from "next/server";
import Todo from "../models/Todo";

export async function GET(res) {
    await dbConnect();

    const data = await Todo.find({});

    return NextResponse.json(data)
}
export async function POST(req) {
    await dbConnect();

    const data = await req.json();

    const newTodo = new Todo({
        todo: data.todo
    });

    await newTodo.save();

    return NextResponse.json({ sucess: true })
}

export async function DELETE(req) {
    await dbConnect();

    let data = await req.json();

    if (data.item) {
        const todo = data.item.todo;
        await Todo.findOneAndDelete({ todo: todo });
    } else {
        await Todo.deleteMany({});
    }

    return NextResponse.json({ sucess: true })
}

export async function PUT(req) {
    await dbConnect();

    let data = await req.json();
    const { todo } = data;

    const todoToUpdate = await Todo.findOne({ todo });

    todoToUpdate.isDone = !todoToUpdate.isDone;
    await todoToUpdate.save();

    return NextResponse.json({ sucess: true })
}