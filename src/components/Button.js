const Button = ({ children, type = "button", name = "", ...restProps }) => {
  let style = "shadow-md";

  switch (type) {
    case "register":
      style +=
        " rounded-[0.625rem] text-[0.6875rem] w-[5.25rem] h-[2.0625rem] bg-[#365347] text-[#ffffff] transition-colors duration-300 bg-green-700 hover:bg-green-600";
      break;

    case "login":
      style +=
        " rounded-[0.625rem] text-[0.6875rem] w-[5.25rem] h-[2.0625rem] bg-[#ACC830] hover:bg-[#567D46] text-[#464646] transition-colors duration-300";
      break;

    case "log-out":
      style +=
        " rounded-[0.625rem] text-[0.6875rem] w-[5.25rem] h-[2.0625rem] bg-[#ACC830] hover:bg-[#567D46] text-[#464646] transition-colors duration-300";
      break;

    case "mini-join":
      style +=
        " rounded-[0.625rem] text-[0.5rem] w-[3rem] h-[1.50rem] bg-[#54AB75] hover:bg-[#76C598] text-[#ffffff]";
      break;

    case "big-join":
      style +=
        " rounded-[0.625rem] text-[0.9rem] w-[6.3125rem] h-[2.4375rem] bg-[#54AB75] hover:bg-[#76C598] text-[#ffffff]";
      break;

    case "make-reservation":
      style +=
        " rounded-[0.625rem] text-[0.6125rem] t_m:text-[0.8125rem] w-[4.4375rem] t_m:w-[7.4375rem] h-[2.1875rem] bg-[#365347] hover:bg-[#54AB80] text-[#ffffff] transform transition duration-500 hover:scale-110";
      break;

    case "search":
      style +=
        " rounded-[0.625rem] text-[0.875rem] w-[3.75rem] h-[2.1875rem] bg-[#365347] text-[#ffffff]";
      break;

    case "register-long":
      style +=
        " rounded-[0.625rem] text-[0.875rem] w-[13.75rem] h-[2.875rem] bg-[#54AB75] text-[#ffffff] ";
      break;

    case "register-emailDoubleCheck":
      style +=
        " text-[0.625rem] text-[#54AB75] bg-transparent w-[4.5rem] h-[1.9375rem] rounded-[0.3125rem] border border-green-500 ml-1 hover:bg-[#54AB75] hover:text-[#ffffff]";
      break;

    case "register-certification":
      style +=
        " text-[0.625rem] w-[4.5rem] h-[1.9375rem] bg-transparent text-[#54AB75] border border-green-500 rounded-[0.3125rem] ml-1 hover:bg-[#54AB75] hover:text-[#ffffff]";
      break;

    case "register-addressSearch":
      style +=
        " text-[0.625rem] w-[4.5rem] h-[1.9375rem] bg-transparent text-[#54AB75] border border-green-500 rounded-[0.3125rem] ml-1 hover:bg-[#54AB75] hover:text-[#ffffff] ";
      break;

    case "chat":
      style +=
        " w-[5.25rem] h-[1.9375rem] rounded-[0.3125rem] border border-green-500 bg-[#54AB75] text-[0.625rem] text-[#ffffff] mt-2";
      break;

    case "board-mini-join":
      style +=
        " rounded-[0.625rem] text-[0.5rem] w-[3rem] h-[1.50rem] bg-[#54AB75] text-[#ffffff] absolute bottom-[1rem] left-[3rem]";
      break;

    case "category-green":
      style +=
        " rounded-[0.625rem] text-[1rem] w-[6.3125rem] h-[2.4375rem] bg-[#54AB75] hover:bg-[#76C598] text-[#ffffff]";
      break;

    case "category-white":
      style +=
        " mx-2 rounded-[0.625rem] text-[0.5rem] w-[3rem] h-[1.50rem] bg-[#FFFFFF] hover:bg-[#76C598] text-[#2b2b2b]";
      break;

    case "my-page":
      style +=
        " rounded-[0.625rem] text-[0.6875rem] w-[5.25rem] h-[2.0625rem] text-[#ffffff] transition-colors duration-300 bg-green-700 hover:bg-green-600";
      break;

    case "join-status-default":
      style +=
        " rounded-[0.625rem] text-[0.8rem] w-[4rem] h-[1.85rem] bg-[#54AB75] text-[#ffffff]  shadow-md";
      break;

    case "join-status-accepted":
      style +=
        " rounded-[0.625rem] text-[0.8rem] w-[4rem] h-[1.85rem] bg-[#ff7e00] text-[#ffffff]  shadow-md";
      break;

    case "join-status-pending":
      style +=
        " rounded-[0.625rem] text-[0.8rem] w-[4rem] h-[1.85rem] bg-[#4b89dc] text-[#ffffff]  shadow-md";
      break;

    case "join-status-rejected":
      style +=
        " rounded-[0.625rem] text-[0.8rem] w-[4rem] h-[1.85rem] bg-[#DB4455] text-[#ffffff]  shadow-md";
      break;

    case "board-modify":
      style +=
        " rounded-[0.625rem] text-[0.9rem] w-[6.3125rem] h-[2.4375rem] bg-[#48A9A6] hover:bg-[#1B4B3A] text-[#ffffff]";
      break;

    case "board-delete":
      style +=
        " rounded-[0.625rem] text-[0.9rem] w-[6.3125rem] h-[2.4375rem] bg-[#DB4437] hover:bg-[#C33C23] text-[#ffffff]";
      break;

    default:
      style += "bg-[#675D50] text-white";
      break;
  }

  return (
    <button type={type} className={style} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
