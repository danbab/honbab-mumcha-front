const Input = ({ children, type = "button", name = "", ...restProps }) => {
  let style = "border-2 rounded-[0.3125rem] border-gray-300";

  switch (type) {
    case "main-search-input":
      style += " w-[28rem] h-[2.38rem] ml-auto block px-3";
      break;

    case "board-search-input":
      style +=
        " w-[24rem] h-[2.1875rem] mr-[30px] border border-green-500 bg-[#FFFDFD]";
      break;

    case "register-input":
      style +=
        " w-[25.3125rem] h-[1.9375rem] rounded-[0.3125rem] border border-[#010101] bg-[#FFFBFB] placeholder:text-xs pl-[0.3rem] focus:border-[#54AB75]";
      break;

    case "main-search-location":
      style += " w-[28rem] h-[2.38rem] ml-auto block px-3 ml-auto";
      break;

    default:
      style += " w-[28rem] h-[2.38rem]";
      break;
  }

  return (
    <input type={type} className={style} {...restProps}>
      {children}
    </input>
  );
};

export default Input;
