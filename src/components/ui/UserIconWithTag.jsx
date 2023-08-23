import { useNavigate } from "react-router";

/* Component Imports */
import Badge from "components/ui/Badge";

/* Asset Imports */
import avatar from 'assets/images/avatar.png';

const UserIconWithTag = ({ userPhotoUrl, username, userId, userType, status }) => {

    /* useNavigate */
    const navigate = useNavigate();

    /* Functions */
    const viewProfile = (e) => {
        e.stopPropagation();
        navigate(`/profile/view/${userType}/${userId}`)
    };

    return (
        <div className="my-4 items-center">
            <div className="flex items-center text-gray-800 hover:txt-primary cursor-pointer"
                onClick={(e) => viewProfile(e)}>
                <div className="relative flex rounded-full text-sm">
                    <span className="absolute -inset-1.5" />
                    <img
                        className="h-8 w-8 rounded-full object-cover object-center"
                        src={userPhotoUrl ? userPhotoUrl : avatar}
                        alt="profile-img"
                    />
                </div>

                <p className="ml-2 hover:txt-primary line-clamp-1 text-sm">
                    {username}
                </p>
            </div>
            {/* <Badge status="success">
                Verified
            </Badge> */}
        </div>
    )
}

export default UserIconWithTag;