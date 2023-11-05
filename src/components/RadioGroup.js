const RadioGroup = ({ label, children }) => {
    return (
      <div className="mt-1 ml-[2.7rem]">
        <legend>{label}</legend>
        {children}
      </div>
    );
  }

  export default RadioGroup;