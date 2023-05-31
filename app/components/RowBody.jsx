import RowWrapper from './RowWrapper'
import Input from './Input'

export default function RowBody({name, isOp = false, isMe = false, id, data, disabledAll = false, className}) {

    return (
        <RowWrapper className={`bg-white border-b border-gray-300 ${className}`}>
            <div className={'p-4'}>{name}</div>
            <Input isMe={isMe} data={data} givenName={id} scoreType={'MEETING'} isDisabled={disabledAll}/>
            <Input isMe={isMe} data={data} givenName={id} scoreType={'CHATXAM'} isDisabled={disabledAll}/>
            <Input isMe={isMe} data={data} givenName={id} scoreType={'DEADLINE'} isDisabled={disabledAll}/>
            <Input isMe={isMe} data={data} givenName={id} scoreType={'CHITIEU'} isDisabled={disabledAll}/>
            <Input isMe={isMe} data={data} givenName={id} scoreType={'NANGNO'} isDisabled={disabledAll}/>
            <Input isMe={isMe} data={data} givenName={id} scoreType={'CONGBANG'} isDisabled={!isOp}/>
            <Input isMe={isMe} data={data} givenName={id} scoreType={'GUONGMAU'} isDisabled={!isOp}/>
            <Input isMe={isMe} data={data} givenName={id} scoreType={'LANGNGHE'} isDisabled={!isOp}/>
            <Input isMe={isMe} data={data} givenName={id} scoreType={'FEEDBACK'} isDisabled={!isOp}/>
        </RowWrapper>
    )
}
