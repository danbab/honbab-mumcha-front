import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import 'react-datepicker/dist/react-datepicker.css';

const Birth = () => {
    const [startDate, setStartDate] = useState(new Date());
  
      return (
              <DatePicker
                locale={ko}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="mt-1 ml-[0.75rem] border-2 rounded-[0.3125rem] pl-[0.5rem]"
              />
    );
  };

  export default Birth;