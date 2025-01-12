import { useParams } from "react-router"
import "./separate-new.scss"

export const AdminSeparateNew = () => {
    const params = useParams()
    console.log('params=', params);
    
    return (
        <div className="admin-separate-new-wrapper">
            newId={params.newId}
        </div>
    )
}