interface User {
    id: number;
    name: string;
}

interface Response<T> {
    success: boolean;
    data: T;
    message?: string;
    statusCode?: number;
    timestamp?: Date;
}

// Example usage:
const userResponse: Response<User> = {
    success: true,
    data: { id: 1, name: "Faisal" },
    message: "User retrieved successfully",
    statusCode: 200
};

const errorResponse: Response<null> = {
    success: false,
    data: null,
    message: "Not found",
    statusCode: 404
};

console.log(userResponse);
console.log(errorResponse);