export default function RowWrapper({children, className}) {
    return (
        <div
            className={`grid grid-cols-10 grid-rows-1  ${className}`}>
            {children}
        </div>
    )
}