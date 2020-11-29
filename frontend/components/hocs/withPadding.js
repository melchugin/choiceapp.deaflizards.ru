const withPadding = (Wrapped) => ({ padding, ...props }) =>
    <div style={{ padding }}>
        <Wrapped {...props} />
    </div>

export default withPadding;