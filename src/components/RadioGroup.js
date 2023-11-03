const RadioGroup = ({ label, children }) => {
    return (
      <div className="mt-1 ml-4">
        <legend>{label}</legend>
        {children}
      </div>
    );
  }

  export default RadioGroup;