import {useParams} from "@solidjs/router";
import ProfilePage from "@/pages/profile";

export default function Profile() {
    const params = useParams();
    const username = params.username;

    // Fetch profile data using username
    return <ProfilePage username={username}/>
}