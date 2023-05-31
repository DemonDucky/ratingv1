export default function Table({children}) {
    return (
        <div className={"overflow-scroll hide-scrollbar [&::-webkit-scrollbar]:hidden rounded-xl"}>
            <div className={"w-[2000px] xl:w-full overflow-hidden"}>
                {children}
            </div>
        </div>
    )
}