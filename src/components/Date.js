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
                className="mt-1 ml-2"
              />
    );
  };

  export default Birth;