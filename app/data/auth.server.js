import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { prisma } from './database.server'

const session = process.env.SESSION_SECRET

const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: false,
        secrets: [session],
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 12,
        httpOnly: true
    }
})

export async function createUserSession(userId, redirectPath = '/') {
    const session = await sessionStorage.getSession()
    session.set('userId', userId)
    await sessionStorage.commitSession(session)
    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session)
        }
    })
}

export async function getUserFromSession(request) {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'))
    return session.get('userId')
}

export async function login(password) {
    const user = await prisma.user.findFirst({
        where: {
            password: {
                equals: password
            }
        }
    })

    if (user !== null) {
        return createUserSession(user.id)
    }
}
