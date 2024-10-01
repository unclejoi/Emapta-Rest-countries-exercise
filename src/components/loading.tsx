const Loading = (props: { height?: number, width?: number}) => {
    return <div className="loader" style={{
        height: props.height,
        width: props.width
    }} />
}

export default Loading;