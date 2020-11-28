import Link from 'next/link';

const withLink = (Wrapped, href) => (props) =>
    <Link href={href}>
        <a style={{ cursor: 'pointer'}}>
            <Wrapped {...props}/>
        </a>
    </Link>

export default withLink;