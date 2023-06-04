import {useEffect, useState} from "react";

export default function Input({data, isMe, isDisabled = false, givenName, scoreType}) {

    const [score, setScore] = useState(data?.find((value) => value?.type === scoreType)?.value ?? "")

    useEffect(() => {
        if (isMe) {
            var myScore = 0

            const getAllScore = data?.filter((value) => value?.type === scoreType && value?.value !== null)
            const size = getAllScore?.length
            getAllScore.forEach(value => {
                if (value?.type === scoreType) myScore += value.value
            })
            setScore(myScore / size >= 0 ? (myScore / size).toFixed(2) : "")
        }
    }, [])


    return (
        <input
            className={`appearance-none p-2 ${isDisabled ? 'bg-gray-100' : null}`}
            name={`${givenName}[${scoreType}]`}
            type="number"
            value={score}
            onChange={e => setScore(e.target.value)}
            min={'0'}
            max={'10'}
            disabled={isDisabled}
        />
    )
}
