import { Modal } from "antd"
import './style.scss'

interface IErrorModal {
    title: string
    visible: boolean
    setVisible: (visible: boolean) => void
    onOk: () => void
}

const ErrorModal = ({
    title,
    visible,
    setVisible,
    onOk
}: IErrorModal) => {
    return Modal.error({
        title: title,
        visible: visible,
        centered: true,
        onOk: () => onOk()
    })
}

export default ErrorModal