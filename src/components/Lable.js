const Lable = ({ children, type = "lable", name = "", ...restProps }) => {
    let style = "block text-sm font-medium leading-6";
  
    switch (type) {
      case "register-lable":
        style += " text-gray-900 w-[5rem] text-right mt-[0.3rem]";
        break;
  
      
      default:
        break;
    }
  
    return (
      <label type={type} className={style} {...restProps}>
        {children}
      </label>
    );
  };
  
  export default Lable;