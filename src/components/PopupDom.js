import ReactDom from 'react-dom';
 
//팝업 창을 띄워주는 react-dom 생성
const PopupDom = ({ children }) => {
    const el = document.getElementById('popupDom');
    return ReactDom.createPortal(children, el);
};
 
export default PopupDom;