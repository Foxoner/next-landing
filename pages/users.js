import { useState } from "react";
import Link from "next/dist/client/link";

const Users = ({ users }) => {
    
    return (
        <div>
            <h1>Users list</h1>
            <ul>
                {users.map(user => 
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            <p>
                                {user.name}
                            </p>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Users;

export async function getStaticProps(context) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    return {
        props: {users},
    }
}