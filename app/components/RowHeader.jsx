import RowWrapper from "./RowWrapper";

export default function RowHeader() {
    return (
        <RowWrapper className={"text-center [&>div]:p-4 bg-[#C38154] text-white font-bold"}>
            <div>Thành viên</div>
            <div>Có mặt trong meet</div>
            <div>Đóng góp chất xám</div>
            <div>Đúng deadline</div>
            <div>Đúng chỉ tiêu</div>
            <div>Năng nổ, nhiệt tình</div>
            <div>Công bằng</div>
            <div>Gương mẫu</div>
            <div>Lắng nghe</div>
            <div>Feedback</div>
        </RowWrapper>
    )
}