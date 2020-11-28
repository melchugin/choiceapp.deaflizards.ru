import css from './styles.less';

const PrimaryButton = (props) =>
    <button className={css.iconButtonPrimary}>
        {props.children}
        <span className={css.iconButtonPrimaryText} onClick={props.onClick}>{props.text}</span>
    </button>

const SecondaryButton = (props) =>
    <button className={css.iconButtonSecondary} onClick={props.onClick}>
        <span className={css.iconButtonSecondaryText}>{props.text}</span>
    </button>

const chooseButton = ({type = 'primary', ...props}) => {
    switch (type) {
        case 'primary': return <PrimaryButton {...props} />
        case 'secondary': return <SecondaryButton {...props} />
    }
};

export default chooseButton;