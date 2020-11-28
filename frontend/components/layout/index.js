import Header from '../header';
import css from './styles.less';

const Layout = (props) => 
    <>
        <Header {...props}/>
        <div className={css.widthLimiter}>
            <div className={css.pageWrapper}>
                {props.children}
            </div>
        </div>
    </>

export default Layout;