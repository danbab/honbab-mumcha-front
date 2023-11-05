
const Radio = ({ children, value, name, ...restProps }) => {



    return (
      <label className="mx-[2.25rem]">
        <input
          type="radio"
          value={value}
          name={name}
          className="mr-2 mt-2"
        />
        {children}
      </label>
    );
  }

export default Radio;