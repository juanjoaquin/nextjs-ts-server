import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../lib/prisma'
import * as yup from 'yup';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = searchParams.get('take') ?? '10';
    const skip = searchParams.get('skip') ?? '0'

    if (isNaN(+take)) {
        return NextResponse.json({ message: 'Take has to be a number' }, { status: 400 })
    }
    if (isNaN(+skip)) {
        return NextResponse.json({ message: 'Skip has to be a number' }, { status: 400 })
    }
    const todos = await prisma.todo.findMany({
        take: +take,
        skip: +skip
    })

    return NextResponse.json(todos);


}

const postSchema = yup.object({
    description: yup.string().required().min(1),
    complete: yup.boolean().optional().default(false), 
})

export async function POST(request: Request) {
    // const body = await request.json()
    try {
        const body = await postSchema.validate(await request.json())
        const todo = await prisma.todo.create({data: body})
        return NextResponse.json(todo);
    }
    catch(error) {
        return NextResponse.json(error, {status: 400})
    }
}

export async function DELETE(request: Request) {
    // const body = await request.json()
    try {
         await prisma.todo.deleteMany({where: {complete: true}})

        return NextResponse.json('Borrados')
    }
    catch(error) {
        return NextResponse.json(error, {status: 400})
    }
}