import {Form, useActionData, useLoaderData} from '@remix-run/react'
import RowHeader from '../components/RowHeader'
import RowBody from '../components/RowBody'
import Table from '../components/Table'
import {json, redirect} from '@remix-run/node'
import {prisma} from '../data/database.server'
import QueryString from 'qs'
import {getUserFromSession} from '../data/auth.server'
import {ToastContainer, toast} from 'react-toastify'
import {useState} from "react";

export const meta = () => {
    return [{title: 'MIN - Rating System'}, {name: 'description', content: 'Only for members'}]
}

export default function Index() {
    const data = useLoaderData()
    const actionData = useActionData()
    const currentUser = data.currentData

    const option = {
        position: "top-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }

    const submit = async () => {
        try {
            toast.info('Cập nhật điểm thành công', option);
        } catch (error) {
            toast.error('Có lỗi xảy ra, hãy kiểm tra đường truyền mạng', option);
        }
    }

    return (<div
            className={'hide-scrollbar [&::-webkit-scrollbar]:hidden overflow-scroll p-4 flex flex-col h-screen bg-[#F9E0BB]'}
        >
            <ToastContainer/>
            <div className={'text-center text-[#884A39] mb-4'}>
                <h1 className={'text-2xl font-bold'}>MIN - Rating System (Max Score: 10)</h1>
                <h2>Nhớ ấn nút submit để lưu điểm nhé {currentUser.name}, điểm có thể edit bất kì lúc nào nên không phải lo đâu =))</h2>
            </div>
            <Form method="post" id="score-form">
                <Table>
                    <RowHeader/>
                    {data.allUsers
                        .map((user, index) => {
                            return <RowBody key={index} data={user.scoreReceived} name={user.name} id={user.id}
                                            isOp={user.isOp}/>
                        })}
                </Table>
                <div className={'flex justify-center mt-4'}>
                    <button
                        onClick={submit}
                        type={'submit'}
                        className={'p-4 px-8 rounded-xl bg-[#884A39] text-white font-bold hover:scale-105 transition-all duration-200'}
                    >
                        Submit Điểm
                    </button>
                </div>
            </Form>
            <hr className={'border-[#C38154] m-4'}/>
            <div>
                <h2 className={'text-center text-2xl text-[#C38154] font-bold mb-4'}>Điểm Của Bạn</h2>
                <Table>
                    <RowHeader/>
                    <RowBody
                        name={currentUser.name}
                        data={currentUser.scoreReceived}
                        isMe={true}
                        disabledAll={true}
                        className={'[&>input]:bg-white!important'}
                    />
                </Table>
            </div>
        </div>)
}

export async function action({request}) {
    const userId = await getUserFromSession(request)
    const test = await request.text()
    const data = QueryString.parse(test)
    const scoreUpdates = []
    const membersID = Object.keys(data)

    for (let memberID of membersID) {
        for (const [type, value] of Object.entries(data[memberID])) {
            scoreUpdates.push({
                from: userId, to: memberID, type: type, value: value
            })
        }
    }
    scoreUpdates.map(async (score) => {
        const existingScore = await prisma.score.findFirst({
            where: {
                from: score.from, to: score.to, type: score.type,
            },
        })

        const grade = parseInt(score.value) ? Math.min(score.value, 10) : null

        if (existingScore) {
            await prisma.score.update({
                where: {id: existingScore.id}, data: {value: grade},
            })
        } else {
            await prisma.score.create({
                data: {...score, value: grade},
            })
        }
    })


    return json({success: "true"})
}

export async function loader({request}) {
    const user = await getUserFromSession(request)
    if (user === undefined) {
        return redirect('/validate')
    }

    const data = {
        currentUser: user, allUsers: await prisma.user.findMany({
            where: {
                NOT: {
                    id: user
                }
            }, select: {
                id: true, name: true, isOp: true, scoreGiven: true, scoreReceived: {
                    where: {
                        from: user
                    }
                }
            }
        }), currentData: await prisma.user.findFirst({
            where: {
                id: user
            }, include: {
                scoreReceived: true
            }
        })
    }

    return json(data)
}
