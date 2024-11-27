import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../lib/prisma';

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();

    const todo = await prisma.todo.createMany({
        data: [
            {description: 'Piedra del alma', complete: true},
            {description: 'Piedra del sequito', complete: true},
            {description: 'Piedra del rubi'},
            {description: 'Piedra del diamante'},
        ]
    });

    console.log(todo)

    return NextResponse.json({message: 'seed executed'});
}