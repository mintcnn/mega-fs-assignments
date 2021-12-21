import { Modal } from "antd"
import './style.scss'


interface ISuccessModal {
    title: string
    visible: boolean
    setVisible: (visible: boolean) => void
    onOk: () => void
}

const SuccessModal = ({
    title,
    visible,
    setVisible,
    onOk,
}: ISuccessModal) => {
    return Modal.success({
        title: title,
        visible: visible,
        centered: true,
        onOk: () => onOk()
    })
}

export default SuccessModal