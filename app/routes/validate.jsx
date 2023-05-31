import {Form} from '@remix-run/react'
import { login } from '../data/auth.server'
import {toast, ToastContainer} from "react-toastify";

export default function Validate() {

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
        toast.info(" Đang kiểm tra dữ liệu trong hệ thống", option)
    }

    return (
        <div className={"h-screen flex justify-center items-center bg-[#F9E0BB]"}>
            <ToastContainer/>
            <div className={"bg-white w-[300px] p-6 py-12 rounded-xl"}>
                <Form method="post">
                    <h1 className={"text-xl font-bold text-center mb-10"} >Min - Rating System</h1>
                    <div className={"flex flex-col justify-end h-full"}>
                        <input className={"bg-gray-200 p-2 rounded-md mb-10 self-center"} placeholder={"Password"} name="password" type="password" />
                        <button onClick={submit} type="submit" className={"bg-[#884A39] font-bold rounded-md text-white p-2"}>Submit</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export async function action({ request }) {
    const form = await request.formData()
    const data = Object.fromEntries(form)

    return await login(data.password)
}
