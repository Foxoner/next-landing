import { useRouter } from "next/router";

export default function User({ user }) {
    const {query} = useRouter();

    return (
        <div>
            <h1>User id is {query.id}</h1>
            <div>
                Username - {user.name}
            </div>
        </div>
    );
};

export async function getServerSideProps({params}) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
    const user = await response.json()
    return {
        props: {user},
    }
}