import Link from "next/link";
import A from "../components/A";

const Index = () => {
    return (
        <div>
            <div>
                <A href={'/'} text='Main' />
                <A href={'/users'} text='Users list' />
            </div>
            <h1>Main page</h1>
        </div>
    );
};

export default Index;