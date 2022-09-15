import { Navigate } from 'react-router';

export function AuthComponent({ children }) {
    const isToken = localStorage.getItem("token")

    return isToken ? (
        children
    ) : (
        <Navigate to="/login" replace />
    );

}
