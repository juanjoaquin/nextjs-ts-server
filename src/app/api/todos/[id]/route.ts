import prisma from '@/src/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import * as yup from 'yup';


interface Segments {
    params: {id: string}
}


export async function GET(request: NextRequest, {params}: Segments) {

    const {id} = params

    const todo = await prisma.todo.findUnique({
        where: {
            id: id
        }
    })

    if(!todo) {
        return NextResponse.json({message: 'Cannot find Todo ID'}, {status: 404});
    }

    return NextResponse.json(todo)

}

const putSchema = yup.object({
    description: yup.string().optional().min(1).strict(),
    complete: yup.boolean().optional()
})


export async function PUT(request: NextRequest, {params}: Segments) {

    const {id} = params

    const todo = await prisma.todo.findUnique({
        where: {
            id: id
        }
    })

    if(!todo) {
        return NextResponse.json({message: 'Cannot find Todo ID'}, {status: 404});
    }

    try {
        const {complete, description} = await putSchema.validate(await request.json());

        const updateTodo = await prisma.todo.update({
            where: {id},
            data: {complete, description}
        })
    
        return NextResponse.json(updateTodo)
    }
    catch(error) {
        return NextResponse.json(error, {status: 400})
    }

}