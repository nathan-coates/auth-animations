import UserIcon from "@assets/user.svg?component-solid";

const User = () => {
    return (
        <div class="flex flex-col w-fit items-center gap-1">
            <UserIcon />
            <div class="text-lg">
                User
            </div>
        </div>
    );
};

export default User;
