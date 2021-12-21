import { LoadingOutlined } from "@ant-design/icons"
import './loading.scss'

const Loader: React.FC = () => {
    return (
        <div className="loading-container">
            <LoadingOutlined />
            <h3>Loading . . .</h3>
        </div>
    )   
}

export default Loader